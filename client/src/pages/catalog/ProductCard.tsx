import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { Product } from "../../models/Product";
import { Link } from "react-router";
import { useAddItemToCartMutation } from "../../api/shoppingCartApi";
import { currencyFormat } from "../../lib/util";

export default function ProductCard(props: Product) {
    const [addItemToCart, {isLoading}] = useAddItemToCartMutation();

    return (
        <Card
            elevation={3}
            sx={{ 
                width: 300,
                borderRadius: '1rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
            }}
        >
            <CardMedia
                sx={{ height: 240, backgroundSize: 'cover' }}
                image={props.pictureURL}
                title={props.name}
            />
            <CardContent>
                <Typography
                    gutterBottom
                    sx={{ textTransform: 'uppercase' }}
                    variant='subtitle2'
                >
                    {props.name}
                </Typography>
                <Typography
                    variant='h6'
                    sx={{ color: 'secondary.main' }}
                >
                    {currencyFormat(props.price)}
                </Typography>
            </CardContent>
            <CardActions
                sx={{ justifyContent: 'space-between' }}
            >
                <Button 
                    loading={isLoading}
                    onClick={() => addItemToCart({productId: props.id, quantity: 1})}
                >
                    Add to cart
                </Button>
                <Button component={Link} to={`/catalog/${props.id}`}>View</Button>
            </CardActions>
        </Card>
    );
}