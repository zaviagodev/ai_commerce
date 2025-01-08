/*
  # Fix Customer RLS Policies

  1. Changes
    - Drop existing restrictive policies
    - Add new policies for authenticated users
    - Add policies for public access during checkout
    - Fix policy for customer addresses

  2. Security
    - Ensure store owners can manage their customers
    - Allow public creation during checkout
    - Maintain data isolation between stores
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can insert customers to their store" ON customers;
DROP POLICY IF EXISTS "Public users can create customers" ON customers;
DROP POLICY IF EXISTS "Users can view their store's customers" ON customers;
DROP POLICY IF EXISTS "Users can update their store's customers" ON customers;
DROP POLICY IF EXISTS "Users can delete their store's customers" ON customers;

-- Create new policies for customers table
CREATE POLICY "Enable full access for authenticated users"
  ON customers
  USING (
    auth.role() = 'authenticated' AND
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.store_name = customers.store_name
      AND profiles.id = auth.uid()
    )
  )
  WITH CHECK (
    auth.role() = 'authenticated' AND
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.store_name = customers.store_name
      AND profiles.id = auth.uid()
    )
  );

CREATE POLICY "Enable insert for public users during checkout"
  ON customers
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.store_name = customers.store_name
    )
  );

-- Fix customer addresses policies
DROP POLICY IF EXISTS "Users can insert addresses to their store's customers" ON customer_addresses;
DROP POLICY IF EXISTS "Public users can create customer addresses" ON customer_addresses;

CREATE POLICY "Enable full access for authenticated users"
  ON customer_addresses
  USING (
    auth.role() = 'authenticated' AND
    EXISTS (
      SELECT 1 FROM customers
      WHERE customers.id = customer_addresses.customer_id
      AND customers.store_name = customer_addresses.store_name
      AND EXISTS (
        SELECT 1 FROM profiles
        WHERE profiles.store_name = customers.store_name
        AND profiles.id = auth.uid()
      )
    )
  )
  WITH CHECK (
    auth.role() = 'authenticated' AND
    EXISTS (
      SELECT 1 FROM customers
      WHERE customers.id = customer_addresses.customer_id
      AND customers.store_name = customer_addresses.store_name
      AND EXISTS (
        SELECT 1 FROM profiles
        WHERE profiles.store_name = customers.store_name
        AND profiles.id = auth.uid()
      )
    )
  );

CREATE POLICY "Enable insert for public users during checkout"
  ON customer_addresses
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM customers
      WHERE customers.id = customer_addresses.customer_id
      AND customers.store_name = customer_addresses.store_name
    )
  );

-- Add helpful comments
COMMENT ON POLICY "Enable full access for authenticated users" ON customers IS 
  'Allows authenticated users to manage customers for their store';
COMMENT ON POLICY "Enable insert for public users during checkout" ON customers IS
  'Allows public users to create customers during checkout';