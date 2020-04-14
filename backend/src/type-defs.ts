import { readFileSync } from 'fs';
import { join } from 'path';

export const SCHEMA_FILE = 'schema.graphql';

export default readFileSync(join(__dirname, SCHEMA_FILE), { encoding: 'utf8' });
