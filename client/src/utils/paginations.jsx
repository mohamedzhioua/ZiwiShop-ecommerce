 export const  pagination = (data, page, limit) => {
    const startIndex = page * limit;
    const endIndex = startIndex + limit;
    return data.slice(startIndex, endIndex);
  };