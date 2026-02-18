import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid2,
  Typography,
} from "@mui/material";
import {
  CreditCard,
  Person,
  ReceiptLong,
  ShoppingCart,
  Store,
} from "@mui/icons-material";
import { Link } from "react-router";

const features = [
  {
    title: "Browse catalog",
    description: "Explore our product catalog with filters and search. View details and add items to your cart.",
    icon: <Store sx={{ fontSize: 40 }} />,
    path: "/catalog",
    cta: "Shop now",
  },
  {
    title: "Shopping cart",
    description: "Your cart is saved securely. Add or remove items and adjust quantities before checkout.",
    icon: <ShoppingCart sx={{ fontSize: 40 }} />,
    path: "/shopping-cart",
    cta: "View cart",
  },
  {
    title: "Secure checkout",
    description: "Check out safely with Stripe. We never store your card details — PCI compliant.",
    icon: <CreditCard sx={{ fontSize: 40 }} />,
    path: "/checkout",
    cta: "Checkout",
  },
  {
    title: "Order history",
    description: "Track your orders and view past purchases. Access invoices and delivery details.",
    icon: <ReceiptLong sx={{ fontSize: 40 }} />,
    path: "/orders",
    cta: "My orders",
  },
  {
    title: "Your account",
    description: "Sign in or create an account to save your cart, manage addresses, and speed up checkout.",
    icon: <Person sx={{ fontSize: 40 }} />,
    path: "/login",
    cta: "Login / Register",
  },
];

export default function HomePage() {
  return (
    <Box component="main">
      {/* Hero */}
      <Box
        sx={{
          py: { xs: 4, md: 6 },
          textAlign: "center",
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 700,
            "& .MuiTypography-root": { color: "text.primary" },
          }}
        >
          Welcome to Online Store
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ maxWidth: 560, mx: "auto", mb: 3 }}
        >
          Shop products, manage your cart, and checkout securely with Stripe.
          Create an account to save your cart and track orders.
        </Typography>
        <Button
          component={Link}
          to="/catalog"
          variant="contained"
          size="large"
          sx={{
            "&:hover": { backgroundColor: "secondary.dark" },
          }}
        >
          Browse catalog
        </Button>
      </Box>

      {/* Features */}
      <Container maxWidth="lg" sx={{ py: 2 }}>
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          sx={{ fontWeight: 600, mb: 3 }}
        >
          What you can do
        </Typography>
        <Grid2 container spacing={3}>
          {features.map((feat) => (
            <Grid2 key={feat.title} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card
                elevation={2}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: "1rem",
                  "&:hover": {
                    boxShadow: 6,
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box
                    sx={{
                      color: "secondary.main",
                      mb: 1.5,
                    }}
                  >
                    {feat.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom fontWeight={600}>
                    {feat.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {feat.description}
                  </Typography>
                  <Button
                    component={Link}
                    to={feat.path}
                    variant="outlined"
                    size="small"
                    color="secondary"
                    sx={{ "&:hover": { borderColor: "secondary.dark" } }}
                  >
                    {feat.cta}
                  </Button>
                </CardContent>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      </Container>
    </Box>
  );
}
