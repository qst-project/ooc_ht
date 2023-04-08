import { PropertyType } from '@/consts';

export interface ICustomPropertySchema {
    name: string,
    label: string,
    type: PropertyType,
    options?: string[],
    group?: string,
    value?: string,
}

const customPropertiesSchema: ICustomPropertySchema[] = [
    {
        name: 'gosuslugiBlock',
        label: 'Блокировка госуслуг',
        type: PropertyType.SELECT,
        options: ['Да', 'Нет'],
    },
    {
        name: 'identified',
        label: 'Выявлен',
        type: PropertyType.SELECT,
        options: ['ГИН', 'ОИВ'],
    },
    {
        name: 'EDOLetterNumber',
        label: 'Номер письма в ЭДО',
        type: PropertyType.TEXT,
    },
];

export default customPropertiesSchema;
