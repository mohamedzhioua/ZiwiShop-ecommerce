import PropTypes from 'prop-types';
import ActionsColumn from '../ActionsColumn ';
import { Card, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { Fragment, useState } from 'react';
import { Scrollbar } from '../Scrollbar';
import TableSearchBar from '../TableSearchBar';
import TablePagination from '@mui/material/TablePagination'
import { simpleFilter } from '../../utils/filters';
import { pagination } from '../../utils/paginations';
import { useNavigate } from 'react-router-dom';



const SizeListTable = (props) => {
    const { sizes } = props
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(5);

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

    const handleDelete = (item) => {
        console.log("Delete:", item.id);
    };

    const filteredProducts = simpleFilter(sizes, query);
    const paginatedData = pagination(filteredProducts, page, limit);



    return (

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
                                                <ActionsColumn onUpdate={() => handleUpdate(item.id)} onDelete={handleDelete} />
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
                count={filteredProducts.length}
                onPageChange={onPageChange}
                onRowsPerPageChange={onRowsPerPageChange}
                page={page}
                rowsPerPage={limit}
                rowsPerPageOptions={[5, 10, 25]}
            />
        </Card>

    )
}
SizeListTable.propTypes = {
    sizes: PropTypes.array.isRequired,
};
export default SizeListTable