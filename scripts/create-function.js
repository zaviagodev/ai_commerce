import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

// Get function name from command line args
const functionName = process.argv[2];
if (!functionName) {
  console.error('Please provide a function name');
  process.exit(1);
}

// Create functions directory if it doesn't exist
const functionsDir = join(process.cwd(), 'src/lib/database/functions');
if (!existsSync(functionsDir)) {
  mkdirSync(functionsDir, { recursive: true });
}

// Create function file
const filename = `${functionName}.sql`;
const filepath = join(functionsDir, filename);

const template = `-- Function: ${functionName}
create or replace function ${functionName}(
  -- Add parameters here
) returns void  -- Change return type as needed
language plpgsql
security definer
as $$
begin
  -- Add function logic here
end;
$$;
`;

writeFileSync(filepath, template);
console.log(`Created function file: ${filename}`);