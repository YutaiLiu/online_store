import { Box, Pagination, Typography } from "@mui/material";
import { Metadata } from "../models/ProductResponse";

type AppPaginationProps = {
    metaData: Metadata;
    onPageChange: (page: number) => void;
}

export default function AppPagination(prop: AppPaginationProps) {
    const itemFrom = (prop.metaData.currentPage - 1) * prop.metaData.pageSize + 1;
    const itemTo = Math.min(prop.metaData.currentPage * prop.metaData.pageSize, prop.metaData.totalCount);

    return (
        <Box display="flex" justifyContent="space-between" alignItems="center" marginTop={2}>
            <Typography variant="body2">
                Display {itemFrom} - {itemTo} of {prop.metaData.totalCount} items
            </Typography>
            <Pagination
                color="secondary"
                size="large"
                count={prop.metaData.totalPages}
                page={prop.metaData.currentPage}
                onChange={(_, page) => prop.onPageChange(page)}
            />
        </Box>
    );
}