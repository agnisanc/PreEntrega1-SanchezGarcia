import cartIcon from "./assets/carticon.png"
import classes from "./Cart.module.css"

const CartWidget = () => {
    return (
        <div className={classes.cartContainer}>
        <img className={classes.img} src={cartIcon} alt="Cart icon" />
        0
        </div>
    )
}

export default CartWidget