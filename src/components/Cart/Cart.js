import React from 'react';
import { Container, Typography, Button, Grid } from '@material-ui/core';
import useStyles from './styles';

import CartItem from './CartItem/CartItem';


const Cart = ({ cart }) => {

    const classes = useStyles();

    // == Composant <EmptyCard /> qui s'affichera si panier est vide
    const EmptyCart = () => (
        <Typography variant="subtitle1">You have no items in your shopping cart, start adding some !</Typography> 
    );

    // == Composant FilledCart qui s'affichera si panier pas vide
    const FilledCart = () => (
        <>
            <Grid container spacing={3}>
                {cart.line_items.map((item) => (
                    <Grid item xs={12} sm={4} key={item.id}>
                        <CartItem item={item} />
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cardDetails}>
                <Typography variant="h4">subTotal: {cart.subtotal.formatted_with_symbol}</Typography>
                <div>
                    <Button className={classes.emptyButton} sie="large" type="button" variant="contained" color="secondary">Empty Cart</Button>
                    <Button className={classes.checkoutButton} sie="large" type="button" variant="contained" color="primary">Checkout</Button>
                </div>
            </div>
        </>
    )

    if(!cart.line_items) return 'Loading ...';

    return (
       <Container>
            <div className={classes.toolbar} />   
            <Typography className={classes.title} variant="h3" gutterBottom >Your Shopping Cart</Typography> 
            { 
                // == Si le panier n'est pas égal à 0
                !cart.line_items.length ? <EmptyCart/> : <FilledCart />
            }
       </Container>
    );
};

export default Cart;