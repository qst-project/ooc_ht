import { IBuildingData, IBuildingDataBack, PropertyType } from '@/consts';

export function parseBuildingData(data: IBuildingDataBack) {
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
