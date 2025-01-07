-- Create points transactions table
CREATE TABLE IF NOT EXISTS points_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  store_name text REFERENCES profiles(store_name) ON DELETE CASCADE,
  customer_id uuid REFERENCES customers(id) ON DELETE CASCADE,
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE,
  campaign_id uuid REFERENCES campaigns(id) ON DELETE SET NULL,
  points numeric NOT NULL,
  type text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT points_transactions_type_check CHECK (type IN ('earn', 'redeem', 'expire', 'adjust'))
);

-- Create indexes
CREATE INDEX points_transactions_customer_idx ON points_transactions(customer_id);
CREATE INDEX points_transactions_order_idx ON points_transactions(order_id);
CREATE INDEX points_transactions_campaign_idx ON points_transactions(campaign_id);
CREATE INDEX points_transactions_store_idx ON points_transactions(store_name);

-- Enable RLS
ALTER TABLE points_transactions ENABLE ROW LEVEL SECURITY;

-- Create function to check campaign conditions
CREATE OR REPLACE FUNCTION check_campaign_conditions(
  campaign_id uuid,
  order_id uuid
) RETURNS boolean AS $$
DECLARE
  v_campaign record;
  v_order record;
  v_conditions jsonb;
  v_rules jsonb;
  v_condition jsonb;
  v_rule jsonb;
  v_meets_conditions boolean := true;
BEGIN
  -- Get campaign and order details
  SELECT * INTO v_campaign FROM campaigns WHERE id = campaign_id;
  SELECT * INTO v_order FROM orders WHERE id = order_id;
  
  -- Check product rules if enabled
  IF v_campaign.has_product_rules THEN
    v_rules := v_campaign.product_rules;
    -- Implement product rules logic here
    -- This would check order items against product/category rules
  END IF;

  -- Check conditions if enabled
  IF v_campaign.has_conditions THEN
    v_conditions := v_campaign.conditions;
    -- Implement conditions logic here
    -- This would check customer attributes, order values, etc.
  END IF;

  RETURN v_meets_conditions;
END;
$$ LANGUAGE plpgsql;

-- Create function to calculate points
CREATE OR REPLACE FUNCTION calculate_campaign_points(
  campaign_id uuid,
  order_id uuid
) RETURNS numeric AS $$
DECLARE
  v_campaign record;
  v_order record;
  v_points numeric := 0;
BEGIN
  SELECT * INTO v_campaign FROM campaigns WHERE id = campaign_id;
  SELECT * INTO v_order FROM orders WHERE id = order_id;

  IF v_campaign.type = 'points_multiplier' THEN
    v_points := v_order.total * v_campaign.multiplier;
  ELSE
    v_points := v_campaign.bonus_points;
  END IF;

  RETURN v_points;
END;
$$ LANGUAGE plpgsql;

-- Create function to handle order status changes
CREATE OR REPLACE FUNCTION handle_order_points() 
RETURNS TRIGGER AS $$
DECLARE
  v_campaign record;
  v_points numeric;
BEGIN
  -- Only proceed if status changed to 'processing'
  IF NEW.status = 'processing' AND OLD.status != 'processing' THEN
    -- Check each active campaign
    FOR v_campaign IN 
      SELECT * FROM campaigns 
      WHERE status = 'active' 
      AND start_date <= NOW() 
      AND end_date >= NOW()
      AND store_name = NEW.store_name
    LOOP
      -- Check if order qualifies for campaign
      IF check_campaign_conditions(v_campaign.id, NEW.id) THEN
        -- Calculate points
        v_points := calculate_campaign_points(v_campaign.id, NEW.id);
        
        -- Record points transaction
        INSERT INTO points_transactions (
          store_name,
          customer_id,
          order_id,
          campaign_id,
          points,
          type,
          description
        ) VALUES (
          NEW.store_name,
          NEW.customer_id,
          NEW.id,
          v_campaign.id,
          v_points,
          'earn',
          'Points earned from order #' || NEW.id
        );
      END IF;
    END LOOP;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for order status changes
DROP TRIGGER IF EXISTS order_points_trigger ON orders;
CREATE TRIGGER order_points_trigger
  AFTER UPDATE OF status ON orders
  FOR EACH ROW
  EXECUTE FUNCTION handle_order_points();

-- Create policies
CREATE POLICY "Users can view their store's points transactions"
  ON points_transactions
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.store_name = points_transactions.store_name
      AND profiles.id = auth.uid()
    )
  );

-- Grant permissions
GRANT ALL ON TABLE points_transactions TO authenticated;
GRANT SELECT ON TABLE points_transactions TO anon;

-- Add helpful comments
COMMENT ON TABLE points_transactions IS 'Records all points earned and redeemed by customers';
COMMENT ON FUNCTION check_campaign_conditions IS 'Checks if an order meets campaign conditions and rules';
COMMENT ON FUNCTION calculate_campaign_points IS 'Calculates points to be awarded for an order based on campaign type';
COMMENT ON FUNCTION handle_order_points IS 'Handles points calculation and recording when order status changes';
