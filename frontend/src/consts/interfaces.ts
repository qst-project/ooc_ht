import { ICustomPropertySchema } from '@/modules/CustomProperties/customPropertiesSchema';

export interface IBuildingData {
    id: number,
    customProperties: ICustomPropertySchema[],
}

export interface IBuildingDataBack {
    id: number,
    customAttributes: Record<string, Record<string, {
        value: string,
        meta: string,
    }>>
}

export interface ICommentsData {
    author: string,
    text: string,
    id: number,
    replies: ICommentsData[],
}
