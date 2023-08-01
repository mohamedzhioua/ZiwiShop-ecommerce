import { Button, Card, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import { Scrollbar } from "../ui/Scrollbar";
import { Fragment, useState } from "react";
import { pagination } from "../../utils/paginations";
import { useNavigate } from "react-router-dom";
import { currencyFormatter } from "../../utils/currencyFormatter";
import { formatDate } from '../../utils/dateFormatter';
 

const OrderHistoryTable = (props) => {
    const { data   } = props
    const navigate = useNavigate();

    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(5);


    const onPageChange = (event, newPage) => {
        setPage(newPage);
    };
    const onRowsPerPageChange = (event) => {
        setLimit(parseInt(event.target.value, 10));
    };
    const paginatedData = pagination(data, page, limit);

    return (
        < >
            <Card>
                <Scrollbar>
                    <Table sx={{ minWidth: 700 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Order ID  </TableCell>
                                <TableCell>Order date</TableCell>
                                <TableCell>Paid</TableCell>
                                <TableCell>delivered</TableCell>
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
                                                    <Typography color="text.primary">{item._id}</Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography color="text.primary">{formatDate(item.createdAt)}</Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography color="text.primary">{currencyFormatter.format(item.totalPrice)}</Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography color="text.primary">{item.isPaid
                                                        ? item.paidAt.substring(0, 10)
                                                        : 'No'}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography color="text.primary"> {item.isDelivered
                                                        ? item.deliveredAt.substring(0, 10)
                                                        : 'No'}</Typography>
                                                </TableCell>
                                                <TableCell align="right">
                                                         <Button type="button">Details</Button>
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
                    count={data.length}
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

export default OrderHistoryTable