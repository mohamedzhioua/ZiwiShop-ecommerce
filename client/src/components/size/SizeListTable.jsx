import ActionsColumn from '../ActionsColumn ';
//  import PropTypes from 'prop-types';
import { Card, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Scrollbar } from '../Scrollbar';
import TableSearchBar from '../TableSearchBar';
import TablePagination from '@mui/material/TablePagination'
const data = [
    { name: "meduim", value: "m", id: "1" },
    { name: "large", value: "L", id: "2" },
    { name: "large", value: "L", id: "3" },
    { name: "large", value: "L", id: "4" },
    { name: "large", value: "L", id: "5" },
    { name: "large", value: "L", id: "6" },
    { name: "large", value: "L", id: "7" },
    { name: "large", value: "L", id: "9" },
    { name: "large", value: "L", id: "9" },
    { name: "large", value: "L", id: "10" },
    { name: "large", value: "L", id: "11" },
    { name: "large", value: "L", id: "12" }]

    const applyPagination = (data, page, limit) => data.slice(page * limit, page * limit + limit);

const SizeListTable = () => {
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


    const handleUpdate = (item) => {
        console.log("Update:", item.id);
    };

    const handleDelete = (item) => {
        console.log("Delete:", item.id);
    };

    const paginatedData = applyPagination(data, page, limit);



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
                                <React.Fragment key={item.id}>
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
                                                handleUpdate={handleUpdate}
                                                handleDelete={handleDelete}
                                            />
                                        </TableCell>
                                    </TableRow>
                                </React.Fragment>
                            )
                        })}
                    </TableBody>
                </Table>
            </Scrollbar>
            <TablePagination
                component="div"
                count={data.length}
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