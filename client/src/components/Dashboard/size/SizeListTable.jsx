import PropTypes from 'prop-types';
import { Card, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import { Scrollbar } from '../../ui/Scrollbar';
import TableSearchBar from '../../TableSearchBar';
import TablePagination from '@mui/material/TablePagination'
import { simpleFilter } from '../../../utils/filters';
import { pagination } from '../../../utils/paginations';
import { useNavigate } from 'react-router-dom';
import AlertModal from '../../ui/modals/AlertModal';
import { sizeApi } from '../../../api/sizeApi';
import { toast } from 'react-hot-toast';
import IconButton from '@mui/material/IconButton';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';


const SizeListTable = (props) => {
    const { sizes: initialSizes } = props;
    const [sizes, setSizes] = useState([]);
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(5);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [sizeId, setSizeId] = useState('');

    useEffect(() => {
        setSizes(initialSizes);
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
        navigate(`/dashboard/sizes/edit/${id}`);
    };

    const handleDelete = (id) => {
        setSizeId(id);
        setOpen(true);
    };
    const onDelete = async () => {
        try {
            setLoading(true);
            await sizeApi.DeleteSize(sizeId);
            toast.success('Size deleted.');
            setSizes(sizes.filter((item) => item.id !== sizeId));
        } catch (error) {
            toast.error('Something went wrong.');
        } finally {
            setLoading(false);
            setOpen(false);
            setSizeId(null)
        }
    };
    const filteredSizes = simpleFilter(sizes, query);
    const paginatedData = pagination(filteredSizes, page, limit);



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
                                <TableCell>Value</TableCell>
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
                                        <Fragment key={item.id}>
                                            <TableRow key={item.id} hover>
                                                <TableCell>
                                                    <Typography color="text.primary">{item.name}</Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography color="text.primary">{item.value}</Typography>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <IconButton onClick={() => handleUpdate(item.id)}>
                                                        <EditOutlinedIcon fontSize="small" />
                                                    </IconButton>
                                                    <IconButton onClick={() => handleDelete(item.id)} >
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
                    count={filteredSizes.length}
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
SizeListTable.propTypes = {
    sizes: PropTypes.array.isRequired,
};
export default SizeListTable