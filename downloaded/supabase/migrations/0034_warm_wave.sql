/*
  # Add has_variants column to products table

  1. Schema Changes
    - Add has_variants column to products table
    - Add variant_options column to store variant configuration
  
  2. Changes
    - Add has_variants boolean column with default false
    - Add variant_options JSONB column for storing option configurations
    - Add validation check for variant_options structure
*/

-- Add has_variants and variant_options columns
ALTER TABLE products
  ADD COLUMN IF NOT EXISTS has_variants boolean DEFAULT false,
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

-- Add index for variant queries
CREATE INDEX IF NOT EXISTS products_has_variants_idx ON products(has_variants) WHERE has_variants = true;

-- Add helpful comment
COMMENT ON COLUMN products.has_variants IS 'Indicates if the product has multiple variants';
COMMENT ON COLUMN products.variant_options IS 'Configuration for variant options (e.g., size, color)';