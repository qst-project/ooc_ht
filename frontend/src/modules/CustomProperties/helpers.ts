import { ICustomPropertySchema } from './customPropertiesSchema';

export function getSchemasByGroup(schemas: ICustomPropertySchema[], group: string) {
    return schemas.filter(schema => schema.group === group);
}
