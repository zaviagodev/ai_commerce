-- Add variant_options column to products table
ALTER TABLE products
  ADD COLUMN IF NOT EXISTS variant_options jsonb DEFAULT '[]'::jsonb;

-- Add check constraint for variant_options structure
ALTER TABLE products
  ADD CONSTRAINT valid_variant_options CHECK (
    variant_options IS NULL OR (
      jsonb_typeof(variant_options) = 'array' AND
      (
        SELECT bool_and(
          jsonb_typeof(opt) = 'object' AND
          opt ? 'id' AND
          opt ? 'name' AND
          opt ? 'values' AND
          opt ? 'position' AND
          jsonb_typeof(opt->'values') = 'array'
        )
        FROM jsonb_array_elements(variant_options) opt
      )
    )
  );

-- Add helpful comment
COMMENT ON COLUMN products.variant_options IS 'Configuration for variant options (e.g., size, color)';