import { Item } from "../../models/ShoppingCart";
import { Box } from "@mui/system";
import { Grid2, IconButton, Paper, Typography } from "@mui/material";
import { Add, Close, Remove } from "@mui/icons-material";
import { useAddItemToCartMutation, useRemoveItemFromCartMutation } from "../../api/ShoppingCartApi";

type Props = {
    item: Item
}

export default function ShoppingCartItem(props: Props) {
    const [addItemToCart] = useAddItemToCartMutation();
    const [removeItemFromCart] = useRemoveItemFromCartMutation();

    // rem is the unit of measurement that is relative to the font-size of the root element
    // 1rem is equal to the font-size of the root element
    // by default, 1 rem = 16px
    return (
        <Paper 
            sx={{
                height: 'auto',
                borderRadius: '10px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 1,
                mb: 2,
            }}
        >
            <Box display={'flex'} alignItems={'center'}>
                <Box
                    component={'img'}
                    src={props.item.pictureURL}
                    sx={{
                        height: 100,
                        width: 100,
                        objectFit: 'cover',
                        borderRadius: '4px',
                        mr: 2,
                        ml: 2
                    }}
                />
                <Box 
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2
                        }}
                >
                    <Typography variant='h6'>{props.item.name}</Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 3
                        }}
                    >
                        <Typography sx={{ fontSize: '1rem' }}>
                            ${(props.item.price / 100).toFixed(2)} x {props.item.quantity}
                        </Typography>
                        <Typography sx={{ fontSize: '1rem' }} color="primary">
                            ${(props.item.price * props.item.quantity / 100).toFixed(2)}
                        </Typography>
                    </Box>
                    <Grid2 container spacing={3} alignItems={'center'}>
                        <IconButton 
                            onClick={() => removeItemFromCart({productId: props.item.productId, quantity: 1})}
                            size='small'
                            color='error'
                            sx={{ 
                                border: 2,
                                borderRadius: '4px',
                                minWidth: 0,
                            }}
                        >
                            <Remove />
                        </IconButton>
                        <Typography>{props.item.quantity}</Typography>
                        <IconButton 
                            onClick={() => addItemToCart({productId: props.item.productId, quantity: 1})}
                            size='small'
                            color='success'
                            sx={{ 
                                border: 2,
                                borderRadius: '4px',
                                minWidth: 0,
                            }}
                        >
                            <Add />
                        </IconButton>
                    </Grid2>
                </Box>
            </Box>
            <IconButton 
                onClick={() => removeItemFromCart({productId: props.item.productId, quantity: props.item.quantity})}
                size='small'
                color='error'
                sx={{ 
                    border: 2,
                    borderRadius: '4px',
                    minWidth: 0,
                    alignSelf: 'start',
                    mr: 1,
                    mt: 1
                }}
            >
                <Close />
            </IconButton>
        </Paper>
    );
}