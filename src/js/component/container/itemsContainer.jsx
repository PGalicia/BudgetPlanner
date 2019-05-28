import React, { Component } from "react"; // React
import { connect } from "react-redux"; // React-Redux
import ItemCard from "./../presentational/itemCard.jsx"; // Component
import "./../../scss/itemContainer.scss"; // SCSS
import { determineItemOrder } from "./../../utils/determineItemOrder.js"; // Utils
import posed from "react-pose"; // Library

// ItemContainer - Posed
const ItemContainer = posed.section({
  open: {
    x: "0%",
    staggerChildren: 50
  },
  closed: {
    delay: 300
  }
});

/*
    ItemContainer
*/
class ItemsContainer extends Component {
  constructor() {
    super();

    // State
    this.state = {
      sortByChoice: "priority",
      isItemsContainerVisible: false
    };

    // Binding
    this.handleSortByChoice = this.handleSortByChoice.bind(this);
  }

  componentWillMount() {
    // Set Timeout used for progress bar animation
    setTimeout(() => {
      this.setState({
        isItemsContainerVisible: !this.state.isItemsContainerVisible
      });
    }, 10);
  }

  handleSortByChoice(e, category) {
    // After a couple of ms, items will then again animate out
    setTimeout(() => {
      this.setState({
        isItemsContainerVisible: !this.state.isItemsContainerVisible,
        sortByChoice: category
      });
    }, 300);
    this.setState({
      isItemsContainerVisible: !this.state.isItemsContainerVisible
    });
  }

  render() {
    return (
      <>
        <ItemContainer
          className="items-container"
          pose={this.state.isItemsContainerVisible ? "open" : "closed"}
        >
          <div className="sort-by">
            <span>Sort By: </span>
            <button
              className={
                this.state.sortByChoice === "alphabetically"
                  ? "sort-by-button active"
                  : "sort-by-button"
              }
              onClick={e => this.handleSortByChoice(e, "alphabetically")}
            >
              Alphabetically
            </button>
            <button
              className={
                this.state.sortByChoice === "priority"
                  ? "sort-by-button active"
                  : "sort-by-button"
              }
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
        </ItemContainer>
      </>
    );
  }
}

export default ItemsContainer;
