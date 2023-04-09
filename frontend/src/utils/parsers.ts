import { IBuildingData, IBuildingDataBack, PropertyType } from '@/consts';

export function parseBuildingDataFromBack(data: IBuildingDataBack) {
    const buildingData: IBuildingData = {
        id: data.id,
        customProperties: [],
        owner: data.owner,
        about: data.about,
        address: data.address,
        area: data.area,
        county: data.county,
        condition: data.condition,
        district: data.district,
        fact_owner: data.fact_owner,
        type: data.type,
        name: data.name,
    };

    Object.entries(data.customAttributes).forEach(([group, value]) => {
        Object.entries(value).forEach(([name, property]) => {
            const meta = property.meta ? JSON.parse(property.meta) : {
                type: PropertyType.TEXT,
            };
            buildingData.customProperties.push({
                name,
                group,
                type: meta.type,
                label: name,
                value: property.value,
                options: meta.options,
            });
        });
    });

    return buildingData;
}

export function parseBuildingDataToBack(data: IBuildingData, values: Record<string, string>) {
    const buildingData: IBuildingDataBack = {
        id: data.id,
        customAttributes: {},
        type: values.type,
        address: values.address,
        area: values.area,
        county: values.county,
        condition: values.condition,
        fact_owner: values.fact_owner,
        owner: values.owner,
        district: values.district,
        name: values.name,
    };

    data.customProperties.forEach(property => {
        const value = values[property.label];
        if (property.group && property.label) {
            const metaObject = {
                type: property.type,
                options: property.options || null,
            };
            if (buildingData.customAttributes[property.group]) {
                buildingData.customAttributes[property.group][property.label] = {
                    value,
                    meta: JSON.stringify(metaObject),
                };
            }
            else {
                buildingData.customAttributes[property.group] = {
                    [property.label]: {
                        value,
                        meta: JSON.stringify(metaObject),
                    },
                };
            }
        }
    });

    return buildingData;
}
