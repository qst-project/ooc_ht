import { ICustomPropertySchema } from '@/modules/CustomProperties/customPropertiesSchema';

export interface CreatePropertyModalProps {
    isOpen: boolean,
    onOk: (schema: ICustomPropertySchema) => void,
    onCancel: () => void,
}
