-- Drop existing tables if they exist
DROP TABLE IF EXISTS campaign_product_rules;
DROP TABLE IF EXISTS campaign_conditions;

-- Add JSONB columns to campaigns table
ALTER TABLE campaigns
  ADD COLUMN IF NOT EXISTS product_rules JSONB DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS conditions JSONB DEFAULT '[]'::jsonb;

-- Add check constraints for JSON structure
ALTER TABLE campaigns
  ADD CONSTRAINT valid_product_rules CHECK (
    product_rules IS NULL OR (
      jsonb_typeof(product_rules) = 'array' AND
      (
        SELECT bool_and(
          (value->>'type' IN ('group', 'group_operator')) AND
          (
            (value->>'type' = 'group' AND
             value ? 'match' AND
             value ? 'conditions' AND
             jsonb_typeof(value->'conditions') = 'array'
            ) OR
            (value->>'type' = 'group_operator' AND
             value ? 'operator' AND
             value->>'operator' IN ('AND', 'OR')
            )
          )
        )
        FROM jsonb_array_elements(product_rules)
      )
    )
  ),
  ADD CONSTRAINT valid_conditions CHECK (
    conditions IS NULL OR (
      jsonb_typeof(conditions) = 'array' AND
      (
        SELECT bool_and(
          (value->>'type' IN ('group', 'group_operator')) AND
          (
            (value->>'type' = 'group' AND
             value ? 'match' AND
             value ? 'conditions' AND
             jsonb_typeof(value->'conditions') = 'array'
            ) OR
            (value->>'type' = 'group_operator' AND
             value ? 'operator' AND
             value->>'operator' IN ('AND', 'OR')
            )
          )
        )
        FROM jsonb_array_elements(conditions)
      )
    )
  );

-- Add helpful comments
COMMENT ON COLUMN campaigns.product_rules IS 'Array of product rule groups and operators';
COMMENT ON COLUMN campaigns.conditions IS 'Array of condition groups and operators';