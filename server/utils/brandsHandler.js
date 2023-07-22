function addHrefFieldToBrands(brands) {
  for (const brand of brands) {
    brand.href = `/search?brand=${brand._id}`;
  }
  return brands;
}
module.exports = addHrefFieldToBrands;
