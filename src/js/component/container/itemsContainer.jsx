import React, { Component } from "react"; // React
import ItemCard from "./../presentational/itemCard.jsx"; // Component
import "./../../scss/itemContainer.scss"; // SCSS

class ItemsContainer extends Component {
  render() {
    return (
      <>
        {this.props.items.map(item => (
          <ItemCard key={item.id} item={item} />
        ))}
      </>
    );
  }
}

export default ItemsContainer;
