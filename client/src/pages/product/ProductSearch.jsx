import { Unstable_Grid2 as Grid, Typography, useMediaQuery } from '@mui/material'
import { Box, Stack } from '@mui/system'
import ProductCard from '../../components/Product/ProductCard'
import ProductFilters from '../../components/Product/ProductSearch/ProductFilters'
import CustomButton from '../../components/ui/CustomButton';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useEffect, useState } from 'react';
import MobileProductFilters from '../../components/Product/ProductSearch/MobileProductFilters';
import ProductSort from '../../components/Product/ProductSearch/ProductSort';
import { useLocation } from 'react-router-dom';
import { useMounted } from '../../hooks/use-mounted';
import { productApi } from '../../api/productApi';
import PaginationButton from '../../components/ui/PaginationButton';
import Splash from '../../components/ui/Splash';
import Heading from '../../components/ui/Heading';
import ShopFooter from '../../layouts/ShopFooter';


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
  const per_page = searchParams?.get("per_page") ?? 9

  const [loading, setLoading] = useState(true)
  const [data, setData] = useState()
  const isMounted = useMounted()


  useEffect(() => {
    const GetSearchProducts = async () => {
      const obj = {
        category: category,
        brand: brand,
        size: size,
        price: price,
        query: query,
        sort: sort,
        page: page,
      }
      try {
        const response = await productApi.GetSearchProducts(obj);
        if (isMounted()) {
          setData(response);
          setLoading(false)
        }
      } catch (error) {
        console.error(error);
        setLoading(false)
      }
    }

    GetSearchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, sort, page, price, query, brand, size]);


  return (
    < >
      <Box width="90%" margin="40px auto">
        <Grid container spacing={1}>

          <Grid xs={12}
            md={3}>
            {isMobileScreen ? (
              <MobileProductFilters onClose={handleCloseFilterDrawer} open={isFilterDrawerOpen} sizes={data?.sizes} brands={data?.brands} />
            ) : (
              <ProductFilters sizes={data?.sizes} brands={data?.brands} />
            )}
          </Grid>
          <Grid xs={12}
            md={9}>
            <Grid container justifyContent={isMobileScreen ? "space-around" : "space-between"} alignItems="center">
              <Grid item>

                {isMobileScreen && (
                  <>
                    <CustomButton
                      onClick={handleOpenFilterDrawer}
                    >
                      <FilterListIcon sx={{ marginRight: 1, height: '1rem', width: '1rem' }} /> Filters
                    </CustomButton>

                  </>

                )}
              </Grid>
              <Grid item>
                <ProductSort sort={sort} />
              </Grid>
            </Grid>
            <Grid item marginTop='1rem'>
              {loading && !data ? (
                <Splash />
              ) : data?.products?.length === 0 ? (
                <Typography>Sorry, No results</Typography>
              ) : (
                <Stack spacing={2}>
                  <Heading title={` Product ( ${data?.products?.length})`} titleStyle='h3' description="" />
                  <Box
                    margin="0 auto"
                    display="grid"
                    gridTemplateColumns="repeat(auto-fill, 300px)"
                    justifyContent="space-around"
                    rowGap="20px"
                    columnGap="1.33%"
                  >
                    {data?.products?.map((item) => (
                      <ProductCard product={item} key={`${item.name}-${item._id}`} />
                    ))}
                  </Box>
                </Stack>
              )}

            </Grid>
            {data?.products?.length ?
              <PaginationButton
                pageCount={data?.pages}
                page={page}
                per_page={per_page}
                sort={sort}
                isPending={loading}
                searchParams={searchParams}
                isMobileScreen={isMobileScreen}
              />
              :
              null
            }
          </Grid>
        </Grid>
      </Box>
      <ShopFooter />
    </>
  )
}

export default ProductSearch