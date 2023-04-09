import { ICustomPropertySchema } from '@/modules/CustomProperties/customPropertiesSchema';

export interface IBuildingData {
    id: number,
    customProperties: ICustomPropertySchema[],
    about?: string,
    address?: string,
    area?: string,
    condition?: string,
    county?: string,
    district?: string,
    fact_owner?: string,
    name?: string,
    owner?: string,
    type?: string,
    status?: string,
    description?: string,
}

export interface IBuildingDataBack {
    id: number,
    customAttributes: Record<string, Record<string, {
        value: string,
        meta?: string,
    }>>
    about?: string,
    address?: string,
    area?: string,
    condition?: string,
    county?: string,
    district?: string,
    fact_owner?: string,
    name?: string,
    owner?: string,
    type?: string,
    status?: string,
}

export interface ICommentsData {
    author: string,
    text: string,
    id: number,
    replies: ICommentsData[],
}

export interface ITaskItemData {
    id: number;
    about?: string;
    title: string;
    deadline?: string;
    assignee?: string;
    buildingId: number;
}

export type IParleyTasks = Record<string, ITaskItemData[]>;
