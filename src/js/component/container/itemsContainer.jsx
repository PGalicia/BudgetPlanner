import React, { Component } from "react"; // React
import { connect } from "react-redux"; // React-Redux
import ItemCard from "./../presentational/itemCard.jsx"; // Component
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
  mapStateToProps
*/
const mapStateToProps = state => {
  return {
    items: state.items
  };
};

/*
    ItemContainer
*/
class ItemsContainer extends Component {
  constructor(props) {
    super(props);

    // State
    this.state = {
      sortByChoice: "priority",
      isItemsContainerVisible: false
    };

    // Binding
    this.handleSortByChoice = this.handleSortByChoice.bind(this);
  }

  componentDidMount() {
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
          className="item"
          id="item"
          pose={this.state.isItemsContainerVisible ? "open" : "closed"}
        >
          <div className="item__sort-by">
            <span className="item__sort-label">Sort By: </span>
            <button
              className={
                this.state.sortByChoice === "alphabetically"
                  ? "item__sort-button button-active"
                  : "item__sort-button"
              }
              onClick={e => this.handleSortByChoice(e, "alphabetically")}
            >
              Alphabetically
            </button>
            <button
              className={
                this.state.sortByChoice === "priority"
                  ? "item__sort-button button-active"
                  : "item__sort-button"
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

export default connect(mapStateToProps)(ItemsContainer);
