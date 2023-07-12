export const flattenCategories = (categories) => {
    let flattenedCategories = [];
  
    const flatten = (category, parentCategory) => {
      if (Array.isArray(category.childCategories) && category.childCategories.length === 0) {
        flattenedCategories = flattenedCategories.concat({ category: parentCategory, childCategories: { name: category.name, id: category._id } });
      } else {
        for (let childCategory of category.childCategories) {
          flatten(childCategory, parentCategory ? `${parentCategory} > ${category.name}` : category.name);
        }
      }
    };
  
    for (let category of categories) {
      flatten(category, null);
    }
  
    return flattenedCategories;
  };