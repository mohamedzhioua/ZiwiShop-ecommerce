import { Unstable_Grid2 as Grid, useMediaQuery } from '@mui/material'
import { Box } from '@mui/system'
import ProductCard from '../../components/Product/ProductCard'
import ProductFilters from '../../components/Product/ProductSearch/ProductFilters'
import CustomButton from '../../components/ui/CustomButton';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useCallback, useState } from 'react';
import MobileProductFilters from '../../components/Product/ProductSearch/MobileProductFilters';
import ProductSort from '../../components/Product/ProductSearch/ProductSort';
import { useLocation } from 'react-router-dom';


const products = [{
  _id: "64b6569edeb45d7e11053f47",
  name: "Polo - kaki",
  price: 129.9,
  countInStock: 25,
  isFeatured: true,
  createdAt: "2023-07-18T09:08:46.355Z",
  images: [
    {
      _id: "64b6569ddeb45d7e11053f42",
      url: "http://res.cloudinary.com/dhftl3t6g/image/upload/v1689671324/ZiwiShop/products/l8dlj68naoxu5g2hjokt.webp"
    },
    {
      _id: "64b6569ddeb45d7e11053f3f",
      url: "http://res.cloudinary.com/dhftl3t6g/image/upload/v1689671324/ZiwiShop/products/klvauzcs00m7utpoopus.webp"
    },
    {
      _id: "64b6569ddeb45d7e11053f40",
      url: "http://res.cloudinary.com/dhftl3t6g/image/upload/v1689671324/ZiwiShop/products/nau8ilc4c0f6uywmbvll.webp"
    },
    {
      _id: "64b6569ddeb45d7e11053f41",
      url: "http://res.cloudinary.com/dhftl3t6g/image/upload/v1689671324/ZiwiShop/products/pe0twn31p0qzbhgogzne.webp"
    }
  ],
  "category": [
    {
      _id: "64ac5051f60e86f8160f4369",
      name: " Polos",
      "parentCategory": "Shirts"
    }
  ],
  "sizes": [
    {
      _id: "64a463c7391f376bcaa2bd12",
      name: "extra small"
    },
    {
      _id: "64a46449391f376bcaa2bd24",
      name: "triple extra large"
    },
    {
      _id: "64a46434391f376bcaa2bd1f",
      name: "double extra large"
    },
    {
      _id: "64a43ccda385e2aecb90b1df",
      name: "Extra Large "
    },
    {
      _id: "64a4641f391f376bcaa2bd1a",
      name: "small"
    },
    {
      _id: "64a4611e391f376bcaa2bd07",
      name: "Meduim"
    }
  ]
},
{
  _id: "64b18de804a0a8b28a1aab38",
  name: "Ceinture 100% cuir",
  price: 119.9,
  isFeatured: true,
  createdAt: "2023-07-14T18:03:20.535Z",
  countInStock: 77,
  images: [
    {
      _id: "64b18e6d04a0a8b28a1aab4b",
      url: "http://res.cloudinary.com/dhftl3t6g/image/upload/v1689357931/ZiwiShop/products/c0zqylvv2owqnafifqhj.webp"
    }
  ],
  "category": [
    {
      _id: "64ac4a64f60e86f8160f428c",
      name: " Cravates et ceintures",
      "parentCategory": "COSTUMES"
    }
  ],
  "sizes": [
    {
      _id: "64a4611e391f376bcaa2bd07",
      name: "Meduim"
    }
  ]
},
{
  _id: "64b18af8e11e68a41a7bb7b3",
  name: "Cravate 100% soie - marine",
  price: 89.9,
  isFeatured: true,
  createdAt: "2023-07-14T17:50:48.490Z",
  countInStock: 72,
  images: [
    {
      _id: "64b1a5e0bc9739b6ee2d7394",
      url: "http://res.cloudinary.com/dhftl3t6g/image/upload/v1689363935/ZiwiShop/products/w1ssytojqlziydy2myoi.webp"
    }
  ],
  "category": [
    {
      _id: "64ac4a64f60e86f8160f428c",
      name: " Cravates et ceintures",
      "parentCategory": "COSTUMES"
    }
  ],
  "sizes": [
    {
      _id: "64a4641f391f376bcaa2bd1a",
      name: "small"
    },
    {
      _id: "64a463c7391f376bcaa2bd12",
      name: "extra small"
    }
  ]
},
{
  _id: "64ac8d5b1430c449fcf875ff",
  name: "Pantalon de costume AMAURY lavable slim",
  price: 169.9,
  isFeatured: true,
  createdAt: "2023-07-10T22:59:39.307Z",
  countInStock: 100,
  images: [
    {
      _id: "64b154534ca480915158ca75",
      url: "http://res.cloudinary.com/dhftl3t6g/image/upload/v1689343058/ZiwiShop/products/ovr5oaivqmn6xw1fuod3.webp"
    },
    {
      _id: "64b154534ca480915158ca74",
      url: "http://res.cloudinary.com/dhftl3t6g/image/upload/v1689343058/ZiwiShop/products/b6cwxkkj1seftoj2f5rh.webp"
    },
    {
      _id: "64b154534ca480915158ca76",
      url: "http://res.cloudinary.com/dhftl3t6g/image/upload/v1689343058/ZiwiShop/products/srmczuuii2f6pisvq9qc.webp"
    }
  ],
  "category": [
    {
      _id: "64ac4ae1f60e86f8160f42ab",
      name: "Pantalons",
      "parentCategory": "PANTALONS ET BERMUDAS"
    }
  ],
  "sizes": [
    {
      _id: "64a4641f391f376bcaa2bd1a",
      name: "small"
    },
    {
      _id: "64a4611e391f376bcaa2bd07",
      name: "Meduim"
    },
    {
      _id: "64a463c7391f376bcaa2bd12",
      name: "extra small"
    },
    {
      _id: "64a46434391f376bcaa2bd1f",
      name: "double extra large"
    }
  ]
}]



function ProductSearch() {
  const isMobileScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  const handleOpenFilterDrawer = () => {
    setIsFilterDrawerOpen(true);
  };

  const handleCloseFilterDrawer = () => {
    setIsFilterDrawerOpen(false);
  };
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const category = searchParams?.get('category') ?? 'all';
  const query = searchParams?.get('query') ?? 'all';
  const price = searchParams?.get('price') ?? 'all';
  const sort = searchParams?.get("sort") ?? "createdAt.desc"
  const page = searchParams?.get('page') ?? 1;

 

  return (
    <Box width="90%" margin="40px auto">
      <Grid container spacing={1}>

        <Grid item md={3}>
          {isMobileScreen && isFilterDrawerOpen && (
            <MobileProductFilters onClose={handleCloseFilterDrawer} open={isFilterDrawerOpen}  />
          )}
          {isMobileScreen ? (
            <CustomButton
              onClick={handleOpenFilterDrawer}
            >
              <FilterListIcon sx={{ marginRight: 1, height: '1rem', width: '1rem' }} /> Filters
            </CustomButton>
          ) : (
            <ProductFilters  />

          )}
        </Grid>
        <Grid item md={9}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
            </Grid>
            <Grid item>
              <ProductSort   sort={sort} />
            </Grid>
            </Grid>
            <Grid item marginTop='1rem'  >
              {products.length === 0 ? "" : (
                <Box
                  margin="0 auto"
                  display="grid"
                  gridTemplateColumns="repeat(auto-fill, 300px)"
                  justifyContent="space-around"
                  rowGap="20px"
                  columnGap="1.33%"
                >
                  {products.map((item) => (

                    <ProductCard product={item} key={`${item.name}-${item._id}`} />

                  ))}
                </Box>
              )}
            </Grid>
          </Grid>
       </Grid>
    </Box>
  )
}

export default ProductSearch