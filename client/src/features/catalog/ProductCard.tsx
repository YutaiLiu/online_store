import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { Product } from "../../app/models/Product";

export default function ProductCard(props: Product) {
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
                    ${(props.price / 100).toFixed(2)}
                </Typography>
            </CardContent>
            <CardActions
                sx={{ justifyContent: 'space-between' }}
            >
                <Button>Add to cart</Button>
                <Button>View</Button>
            </CardActions>
        </Card>
    );
}