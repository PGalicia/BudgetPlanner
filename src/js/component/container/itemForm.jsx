import React, { Component } from "react"; // React
import { connect } from "react-redux"; // React-Redux
import {
  toggleItemFormModal,
  updateItemInformation
} from "./../../action/index.js"; // Action Types
import CloseIcon from "./../../../asset/x-icon.svg"; // Asset

/*
  mapStateToProps,
  mapDispatchToProps
*/
const mapDispatchToProps = dispatch => {
  return {
    toggleItemFormModal: bool => dispatch(toggleItemFormModal(bool)),
    updateItemInformation: item => dispatch(updateItemInformation(item))
  };
};

class ItemForm extends Component {
  constructor() {
    super();

    this.state = {
      item: {
        id: -1,
        name: "",
        description: "",
        currentPrice: 0,
        goalPrice: 0,
        priority: 3,
        link: ""
      }
    };

    // Bindings
    this.handlePriorityChoice = this.handlePriorityChoice.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleItemCostInputChange = this.handleItemCostInputChange.bind(this);
    this.handleTextInputChange = this.handleTextInputChange.bind(this);
  }

  componentDidMount() {
    if (this.props.item) {
      this.setState({ item: this.props.item });
    }
  }

  handlePriorityChoice(e, priority) {
    let item = this.state.item;
    item.priority = priority;
    this.setState({ item });
  }

  handleItemCostInputChange(e) {
    const item = this.state.item;

    // Remove all periods
    let itemCost =
      e.target.value === "" ? "0" : e.target.value.replace(".", "");

    // Limit the number to 7 character (including the period)
    if (itemCost.length > 7) {
      return;
    }
    if (itemCost.length > 2) {
      // Place the period to mimick money format
      itemCost = itemCost
        .substring(0, itemCost.length - 2)
        .concat(".", itemCost.slice(-2));
    }

    item.goalPrice = itemCost;

    this.setState({ item });
  }

  handleTextInputChange(e, category) {
    const item = this.state.item;

    // Change the value to reflect the user input
    item[`${category}`] = e.target.value;

    this.setState({ item });
  }

  handleFormSubmit(e) {
    e.preventDefault();

    // Update Item Information
    this.props.updateItemInformation(this.state.item);
  }

  render() {
    const {
      id,
      name,
      description,
      currentPrice,
      goalPrice,
      priority,
      link
    } = this.state.item;

    let highPriority = priority === 1 ? "active" : "";
    let mediumPriority = priority === 2 ? "active" : "";
    let lowPriority = priority === 3 ? "active" : "";

    return (
      <div className="modal-background">
        <div className="large-modal-container item-modal">
          <p className="item-modal__title heading">
            {this.props.item ? "Edit" : "Add"} Item
          </p>
          {this.props.item && (
            <p className="item-modal__subheading">{this.props.item.name}</p>
          )}
          <form className="item-modal__form" onSubmit={this.handleFormSubmit}>
            <div className="item-modal__input" id="name">
              <label htmlFor="name-input">
                Name <span className="item-modal__asterisk">*</span>
                <span className="side-note">max character 21</span>
              </label>
              <input
                type="text"
                id="name-input"
                value={name}
                onChange={e => this.handleTextInputChange(e, "name")}
                maxLength="21"
              />
            </div>
            <div className="item-modal__input" id="cost">
              <label htmlFor="item-cost-input">
                Item Cost <span className="item-modal__asterisk">*</span>
              </label>
              <input
                type="number"
                id="item-cost-input"
                value={goalPrice}
                onChange={this.handleItemCostInputChange}
                min="0"
              />
            </div>
            <div className="item-modal__input" id="description">
              <label htmlFor="description-input">
                Description<span className="side-note">max character 123</span>
              </label>
              <input
                type="text"
                id="description-input"
                value={description}
                onChange={e => this.handleTextInputChange(e, "description")}
                maxLength="123"
              />
            </div>
            <div className="item-modal__input" id="link">
              <label htmlFor="link-input">Link</label>
              <input
                type="text"
                id="link-input"
                value={link}
                onChange={e => this.handleTextInputChange(e, "link")}
              />
            </div>
            <div className="item-modal__priority">
              <span>Priority </span>
              <button
                type="button"
                className={`item-modal__priority-button ${highPriority}`}
                id="high"
                onClick={e => this.handlePriorityChoice(e, 1)}
              >
                High Priority
              </button>
              <button
                type="button"
                className={`item-modal__priority-button ${mediumPriority}`}
                id="med"
                onClick={e => this.handlePriorityChoice(e, 2)}
              >
                Medium Priority
              </button>
              <button
                type="button"
                className={`item-modal__priority-button ${lowPriority}`}
                id="low"
                onClick={e => this.handlePriorityChoice(e, 3)}
              >
                Low Priority
              </button>
            </div>
            <button type="submit" className="sm-button">
              Apply Changes
            </button>
          </form>
          <img
            className="close-button"
            src={CloseIcon}
            alt="Close Icon"
            onClick={() => this.props.toggleItemFormModal(false)}
          />
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(ItemForm);
