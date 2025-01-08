import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing required environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function deployFunctions() {
  try {
    // Get all function files
    const functionsDir = join(process.cwd(), 'src/lib/database/functions');
    const functionFiles = readdirSync(functionsDir)
      .filter(file => file.endsWith('.sql'))
      .sort();

    // Deploy each function
    for (const file of functionFiles) {
      console.log(`Deploying function: ${file}`);
      const sql = readFileSync(join(functionsDir, file), 'utf8');

      const { error } = await supabase.rpc('deploy_function', { 
        function_sql: sql,
        function_name: file.replace('.sql', '')
      });

      if (error) {
        console.error(`Error deploying ${file}:`, error);
        throw error;
      }

      console.log(`Function ${file} deployed successfully`);
    }

    console.log('All functions deployed successfully');
  } catch (error) {
    console.error('Function deployment failed:', error);
    process.exit(1);
  }
}

deployFunctions();