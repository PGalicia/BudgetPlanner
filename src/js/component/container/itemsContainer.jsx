import React, { Component } from "react"; // React
import ItemCard from "./../presentational/itemCard.jsx"; // Component
import "./../../scss/itemContainer.scss"; // SCSS
import { determineItemOrder } from "./../../utils/determineItemOrder.js"; // Utils

class ItemsContainer extends Component {
  constructor() {
    super();

    // State
    this.state = {
      sortByChoice: "priority"
    };

    // Binding
    this.handleSortByChoice = this.handleSortByChoice.bind(this);
  }

  handleSortByChoice(e, category) {
    this.setState({ sortByChoice: category });
  }

  render() {
    return (
      <section className="items-container">
        <div className="sort-by">
          <span>Sort By: </span>
          <button
            className="sort-by-button"
            onClick={e => this.handleSortByChoice(e, "alphabetically")}
          >
            Alphabetically
          </button>
          <button
            className="sort-by-button"
            onClick={e => this.handleSortByChoice(e, "priority")}
          >
            Priority
          </button>
        </div>
        {determineItemOrder(this.props.items, this.state.sortByChoice).map(
          item => (
            <ItemCard key={item.id} item={item} />
          )
        )}
      </section>
    );
  }
}

export default ItemsContainer;
