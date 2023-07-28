const createCategories = (categories, parentCategory = null) => {
  const categoryList = [];
  let category;
  if (parentCategory === null) {
    category = categories.filter((cat) => cat.parentCategory === null);
  } else {
    category = categories.filter((cat) =>
      parentCategory.equals(cat.parentCategory)
    );
  }

  for (let cate of category) {
    categoryList.push({
      _id: cate._id,
      name: cate.name,
      parentCategory: cate.parentCategory,
      childCategories: createCategories(categories, cate._id),
      href : `ZiwiShop/search?category=${cate._id}`
    });
  }

  return categoryList;
};
module.exports = createCategories;
