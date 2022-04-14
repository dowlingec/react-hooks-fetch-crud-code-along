import React from "react";

const Item = ({ item, onUpdateItem, onDeleteItem }) => {
  
  const handleAddToCartClick = async () => {
    console.log("clicked item", item)
      let req = await fetch(`http://localhost:4000/items/${item.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isInCart: !item.isInCart,
        }),
      })
      let res = await req.json()
      onUpdateItem(res)
    // fetch(`http://localhost:4000/items/${item.id}`, {
    //   method: "PATCH",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     isInCart: !item.isInCart,
    //   }),
    // })
    // .then ((r) => r.json())
    // .then((updatedItem) => onUpdateItem(updatedItem))
  }

  function handleDeleteClick() {
    console.log("DELETE:",item)
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "DELETE",
    })
    .then((r) => r.json())
    .then(() => onDeleteItem(item))
  }

  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button className={item.isInCart ? "remove" : "add"} onClick={handleAddToCartClick}>
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button className="remove" onClick={handleDeleteClick}>Delete</button>
    </li>
  );
}

export default Item;
