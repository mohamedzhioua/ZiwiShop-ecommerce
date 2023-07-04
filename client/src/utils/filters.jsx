export const simpleFilter = (data, query) => {
    if (!query) {
        return data;
    }

    const lowercaseQuery = query.toLowerCase();

    const filteredData = data.filter((item) => {
        for (const key in item) {
            if (typeof item[key] === 'string' && item[key].toLowerCase().includes(lowercaseQuery)) {
                return true;
            }
        }
        return false;
    });

    return filteredData;
};
