import { PropertyType } from '@/consts';

export interface PropertyProps {
    label: string,
    name: string,
    value?: string,
    type: PropertyType,
    options?: string[],
    group?: string,
    onRemove?: (name: string) => void,
}
