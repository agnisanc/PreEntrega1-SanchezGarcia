import classes from "./ItemListContainer.module.css"

const ItemList = ({greeting}) => {
    return (
    <div className={classes.greeting}>
        <h2>{greeting}</h2>
    </div>
    )
}

export default ItemList