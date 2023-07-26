import { Unstable_Grid2 as Grid, useMediaQuery } from '@mui/material'
import { Box } from '@mui/system'
import ProductCard from '../../components/Product/ProductCard'
import ProductFilters from '../../components/Product/ProductSearch/ProductFilters'
import CustomButton from '../../components/ui/CustomButton';
import FilterListIcon from '@mui/icons-material/FilterList';
import {useEffect, useState } from 'react';
import MobileProductFilters from '../../components/Product/ProductSearch/MobileProductFilters';
import ProductSort from '../../components/Product/ProductSearch/ProductSort';
import { useLocation } from 'react-router-dom';
import { useMounted } from '../../hooks/use-mounted';
import { productApi } from '../../api/productApi';


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
  const brand = searchParams?.get('brand') ?? 'all';
  const size = searchParams?.get('size') ?? 'all';
  const query = searchParams?.get('query') ?? 'all';
  const price = searchParams?.get('price_range') ?? 'all';
  const sort = searchParams?.get("sort") ?? "createdAt.desc"
  const page = searchParams?.get('page') ?? 1;

  const [products, setProducts] = useState([])
  const isMounted = useMounted()

  const GetSearchProducts = async () => {
    const data = {
      category: category,
      brand: brand,
      size: size,
      price: price,
      query: query,
      sort: sort,
      page: page,
    }
     try {
      const response = await productApi.GetSearchProducts(data);
      if (isMounted()) {
        setProducts(response);
      }
    } catch (error) {
      console.error(error);
    }
  }


  useEffect(() => {
    GetSearchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, sort, page, price, query, brand, size]);


  return (
    <Box width="90%" margin="40px auto">
      <Grid container spacing={1}>

        <Grid item md={3}>
          {isMobileScreen && isFilterDrawerOpen && (
            <MobileProductFilters onClose={handleCloseFilterDrawer} open={isFilterDrawerOpen} />
          )}
          {!isMobileScreen && (
            <ProductFilters />

          )}
        </Grid>
        <Grid item md={9}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              {isMobileScreen && (
                <CustomButton
                  onClick={handleOpenFilterDrawer}
                >
                  <FilterListIcon sx={{ marginRight: 1, height: '1rem', width: '1rem' }} /> Filters
                </CustomButton>
              )}
            </Grid>
            <Grid item>
              <ProductSort sort={sort} />
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