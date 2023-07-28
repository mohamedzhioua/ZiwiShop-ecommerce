import PropTypes from 'prop-types';
import { Drawer, Stack, Typography } from '@mui/material';
import { Scrollbar } from '../../components/ui/Scrollbar';
import { SideNavSection } from './SideNavSection';
import useTheme from '../../hooks/useTheme';
import SideNavItem from './SideNavItem';
import SideNavNestedItems from './SideNavNestedItems';
import Logo from '../../components/ui/Logo';
import useAuth from '../../hooks/useAuth';

const navigationLinks = [
    {
        name: "Dashboard",
        childCategories: [
            { name: "Overview", href: "/dashboard/overview" },
            { name: "Sizes", href: "/dashboard/sizes" },
            { name: "Categories", href: "/dashboard/categories" },
            { name: "Brands", href: "/dashboard/brands" },
            { name: "Products", href: "/dashboard/products" },
        ]
    },
];

export const SideNav = (props) => {
    const { onClose, open, categories, brands } = props
    const { theme } = useTheme();
    const { IsLoggedIn, user } = useAuth();

    return (
        <Drawer
            anchor="left"
            onClose={onClose}
            open={open}
            PaperProps={{
                sx: {
                    width: "max(280px, 30%)",
                    backdropFilter: 'blur(6px)',
                    backgroundColor: theme.palette.background.paper,
                }
            }}
        >

            <Scrollbar>
                <Stack sx={{ height: '100%' }} >
                    <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                        sx={{ p: 3 }}
                    >
                        <Logo />

                    </Stack>
                    <Stack
                        component="nav"
                        spacing={1}
                        sx={{
                            flexGrow: 1,
                            px: 2
                        }}
                    >
                        <SideNavItem item={{ name: "Home", href: "/" }} onClose={onClose} />

                        {IsLoggedIn && user?.role === 'ADMIN' ?
                            (<SideNavSection
                                navigationLinks={navigationLinks}
                                onClose={onClose} />
                            ) : (
                                null
                            )}
                        <SideNavSection
                            navigationLinks={[{
                                name: 'categories',
                                childCategories: categories,
                            }]}
                            onClose={onClose} />
                        <SideNavNestedItems
                            item={{
                                name: 'brands',
                                childCategories: brands,
                            }}
                            onClose={onClose} />
                    </Stack>
                    <Stack sx={{ p: 3 }} spacing={1}>
                        <Typography variant="subtitle1">
                            Need help?
                        </Typography>
                        <Typography
                            variant="body2"
                        >
                            Please feel free to contact Us.
                        </Typography>

                    </Stack>
                </Stack>
            </Scrollbar>
        </Drawer>
    );
};

SideNav.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired,
    brands: PropTypes.array.isRequired,
};