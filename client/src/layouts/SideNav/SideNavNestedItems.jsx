import { Typography, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import { Box, ButtonBase, Collapse, SvgIcon } from '@mui/material';
import { toTitleCase } from '../../utils/toTitleCase';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import { useState, useCallback } from 'react';
import useTheme from '../../hooks/useTheme';

export const SideNavNestedItems = (links, onClose) => {
    const [open, setOpen] = useState(false);
    const { theme } = useTheme();

    const handleToggle = useCallback(() => {
        setOpen((prevOpen) => !prevOpen);
    }, []);

    return (
        <>
            {links.map((item, index) => {
                if (item.children) {
                    return (
                        <>
                            <ButtonBase
                                key={index}
                                onClick={handleToggle}
                                sx={{
                                    alignItems: 'center',
                                    borderRadius: 1,
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    pr: '16px',
                                    py: '6px',
                                    textAlign: 'left',
                                    width: '100%',

                                }}
                            >
                                <Box
                                    component="span"
                                    sx={{
                                        color: theme.palette.primary.main,
                                        flexGrow: 1,
                                        lineHeight: '24px',
                                        whiteSpace: 'nowrap',
                                        fontWeight: "600",
                                    }}
                                >
                                    {item.name}
                                </Box>
                                <SvgIcon
                                    sx={{
                                        fontSize: 16,
                                        ml: 2,
                                    }}
                                >
                                    {open ? <ExpandMoreOutlinedIcon /> : <ChevronRightOutlinedIcon />}
                                </SvgIcon>
                            </ButtonBase>
                            <Collapse in={open} sx={{ mt: 0.5 }}>
                                {SideNavNestedItems(item.children, onClose)}
                            </Collapse>
                        </>
                    );
                } else {
                    return (
                        <MenuItem key={item.name} onClick={onClose} component={Link}
                            to={item.href}
                            sx={{
                                width: 150, borderRadius: 3, px: 1,
                                py: 0.5, justifyContent: 'center', color: theme.palette.primary.main,
                            }}
                        >
                            <Typography
                                variant="h6"
                                sx={{
                                    textDecoration: 'none',
                                    fontWeight: "bold"
                                }}
                            >
                                {toTitleCase(item.name)}
                            </Typography>
                        </MenuItem>
                    );

                }
            })}
        </>
    );
};
