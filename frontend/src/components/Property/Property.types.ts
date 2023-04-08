import { PropertyType } from '@/consts';

export interface PropertyProps {
    label: string,
    name: string,
    type: PropertyType,
    options?: string[],
    group?: string,
}
