import YAML from 'yamljs';
import path from 'path';

export const swaggerDocument = YAML.load(path.join(__dirname, 'swagger.yaml'));
