import PropTypes from 'prop-types';
import { Card, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import { Scrollbar } from '../Scrollbar';
import TableSearchBar from '../TableSearchBar';
import TablePagination from '@mui/material/TablePagination'
import { simpleFilter } from '../../utils/filters';
import { pagination } from '../../utils/paginations';
import { useNavigate } from 'react-router-dom';
import AlertModal from '../modals/AlertModal';
import { toast } from 'react-hot-toast';
import IconButton from '@mui/material/IconButton';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { categoryApi } from '../../api/categoryApi';


const CategoryListTable = (props) => {
    const { categories: initialSizes } = props;
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(5);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [categoryId, setCategoryId] = useState('');

    useEffect(() => {
        setCategories(initialSizes);
    }, [initialSizes]);

    const handleQueryChange = (event) => {
        setQuery(event.target.value);
    };
    const onPageChange = (event, newPage) => {
        setPage(newPage);
    };
    const onRowsPerPageChange = (event) => {
        setLimit(parseInt(event.target.value, 10));
    };

    const handleUpdate = (id) => {
        navigate(`/dashboard/categories/edit/${id}`);
    };

    const handleDelete = (id) => {
        setCategoryId(id);
        setOpen(true);
    };
    const onDelete = async () => {
        try {
            setLoading(true);
            await categoryApi.DeleteCategory(categoryId);
            toast.success('Size deleted.');
            setCategories(categories.filter((item) => item._id !== categoryId));
        } catch (error) {
            toast.error('Something went wrong.');
        } finally {
            setLoading(false);
            setOpen(false);
            setCategoryId(null)
        }
    };
    const filteredCategories = simpleFilter(categories, query);
    const paginatedData = pagination(filteredCategories, page, limit);



    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            />
            <Card>
                <TableSearchBar
                    handleQueryChange={handleQueryChange}
                    query={query}
                />
                <Scrollbar>
                    <Table sx={{ minWidth: 700 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                 <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        {paginatedData.length === 0 ? (
                            <TableBody>
                                <TableRow>
                                    <TableCell colSpan={3} align="center">
                                        <Typography color="text.primary">   No result </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        ) : (
                            <TableBody>
                                {paginatedData.map((item) => {
                                    return (
                                        <Fragment key={item._id}>
                                            <TableRow key={item._id} hover>
                                                <TableCell>
                                                    <Typography color="text.primary">{item.name}</Typography>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <IconButton onClick={() => handleUpdate(item._id)}>
                                                        <EditOutlinedIcon fontSize="small" />
                                                    </IconButton>
                                                    <IconButton onClick={() => handleDelete(item._id)} >
                                                        <DeleteOutlineOutlinedIcon fontSize="small" />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        </Fragment>
                                    );
                                })}
                            </TableBody>
                        )}
                    </Table>
                </Scrollbar>
                <TablePagination
                    component="div"
                    count={filteredCategories.length}
                    onPageChange={onPageChange}
                    onRowsPerPageChange={onRowsPerPageChange}
                    page={page}
                    rowsPerPage={limit}
                    rowsPerPageOptions={[5, 10, 25]}
                />
            </Card>
        </>

    )
}
CategoryListTable.propTypes = {
    categories: PropTypes.array.isRequired,
};
export default CategoryListTable