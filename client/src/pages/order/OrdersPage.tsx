import { Container, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { useFetchOrdersQuery } from "../../api/orderApi";
import { useNavigate } from "react-router";
import { format } from "date-fns";
import { currencyFormat } from "../../lib/util";

export function OrderPage() {
    const {data: orders, isLoading} = useFetchOrdersQuery();
    const navigate = useNavigate();

    if (isLoading) return <Typography variant="h5">Loading your orders...</Typography>

    if (!orders) return <Typography variant="h5">No order found</Typography>

    return (
        <Container maxWidth='md'>
            <Typography variant="h5" align="center" gutterBottom>
                Order History
            </Typography>
            <Paper sx={{borderRadius: 3, paddingLeft: 2, paddingRight: 2, paddingBottom: 2}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Order</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Total</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map(order => (
                            <TableRow
                                key={order.id}
                                hover
                                onClick={() => navigate(`/orders/${order.id}`)}
                                style={{cursor: 'pointer'}}
                            >
                                <TableCell align="center">{order.id}</TableCell>
                                <TableCell>{format(order.orderDate, 'MMM dd yyyy')}</TableCell>
                                <TableCell>{currencyFormat(order.total)}</TableCell>
                                <TableCell>{order.orderStatus}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </Container>
    )
}