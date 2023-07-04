import ActionsColumn from '../ActionsColumn ';
//  import PropTypes from 'prop-types';
import { Card, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { Fragment, useCallback, useEffect, useState } from 'react';
import { Scrollbar } from '../Scrollbar';
import TableSearchBar from '../TableSearchBar';
import TablePagination from '@mui/material/TablePagination'
import { sizeApi } from '../../api/sizeApi';
 import { toast } from 'react-hot-toast';


const applyPagination = (data, page, limit) => data.slice(page * limit, page * limit + limit);

const SizeListTable = () => {
 
    const [sizes, setSizes] = useState([])
     const [query, setQuery] = useState('');
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(5);

    const getSizes = useCallback(async () => {
        try {
            const response = sizeApi.GetSizes();
            toast.promise(
                response,
                {
                    loading: 'Fetching data ...',
                    error: 'Error while fetching data'
                },
            );
            response
                .then((sizes) => {
                    setSizes(sizes);
                })
                .catch((error) => {
                    console.error(error);
                });
        } catch (err) {
            console.error(err);
        }
    }, []);
    
    useEffect(() => {
        getSizes();
    }, []);
    

    const handleQueryChange = (event) => {
        setQuery(event.target.value);
    };
    const onPageChange = (event, newPage) => {
        setPage(newPage);
    };

    const onRowsPerPageChange = (event) => {
        setLimit(parseInt(event.target.value, 10));

    };


    const handleUpdate = (item) => {
        console.log("Update:", item.id);
    };

    const handleDelete = (item) => {
        console.log("Delete:", item.id);
    };

    const paginatedData = applyPagination(sizes, page, limit);



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
                            <TableCell >Name</TableCell>
                            <TableCell >Value</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedData.map((item) => {
                            return (
                                <Fragment key={item.id}>
                                    <TableRow
                                        hover>
                                        <TableCell>
                                            <Typography
                                                color="text.primary"
                                            >
                                                {item.name}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography
                                                color="text.primary"
                                            >
                                                {item.value}
                                            </Typography>
                                        </TableCell>
                                        <TableCell
                                            align="right"
                                        >
                                            <ActionsColumn
                                                onUpdate={handleUpdate}
                                                onDelete={handleDelete}
                                            />
                                        </TableCell>
                                    </TableRow>
                                </Fragment>
                            )
                        })}
                    </TableBody>
                </Table>
            </Scrollbar>
            <TablePagination
                component="div"
                count={sizes.length}
                onPageChange={onPageChange}
                onRowsPerPageChange={onRowsPerPageChange}
                page={page}
                rowsPerPage={limit}
                rowsPerPageOptions={[5, 10, 25]}

            />

        </Card >
    )
}

export default SizeListTable