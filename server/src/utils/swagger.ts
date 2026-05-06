import YAML from 'yamljs';
import path from 'path';

const swaggerPath = path.resolve(__dirname, './swagger.yaml');

export const swaggerDocument = YAML.load(swaggerPath);