import { IBuildingData, IBuildingDataBack, PropertyType } from '@/consts';

export function parseBuildingDataFromBack(data: IBuildingDataBack) {
    const buildingData: IBuildingData = {
        id: data.id,
        customProperties: [],
    };

    Object.entries(data.customAttributes).forEach(([group, value]) => {
        Object.entries(value).forEach(([name, property]) => {
            buildingData.customProperties.push({
                name,
                group,
                type: PropertyType.TEXT,
                label: name,
                value: property.value,
            });
        });
    });

    return buildingData;
}

export function parseBuildingDataToBack(data: IBuildingData, values: Record<string, string>) {
    const buildingData: IBuildingDataBack = {
        id: data.id,
        customAttributes: {},
    };

    data.customProperties.forEach(property => {
        const value = values[property.label];
        if (property.group && property.label) {
            console.log(property.group, property.label);
            if (buildingData.customAttributes[property.group]) {
                buildingData.customAttributes[property.group][property.label] = {
                    value,
                    meta: '',
                };
            }
            else {
                buildingData.customAttributes[property.group] = {
                    [property.label]: {
                        value,
                        meta: '',
                    },
                };
            }
        }
    });

    return buildingData;
}
