import React, { Component } from "react"; // React
import CloseIcon from "./../../../asset/x-icon.svg"; // Asset

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

    this.handlePriorityChoice = this.handlePriorityChoice.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
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

  // @todo: finish creating form submit
  handleFormSubmit(e) {
    e.preventDefualt();
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
              {/* @todo Apply Max Character Rule */}
              <input type="text" id="name-input" value={name} />
            </div>
            <div className="item-modal__input" id="cost">
              <label htmlFor="item-cost-input">
                Item Cost <span className="item-modal__asterisk">*</span>
              </label>
              {/* @todo Format number input */}
              <input type="text" id="item-cost-input" value={goalPrice} />
            </div>
            <div className="item-modal__input" id="description">
              <label htmlFor="description-input">
                Description<span className="side-note">max character 123</span>
              </label>
              {/* @todo Apply Max Character Rule */}
              <input type="text" id="description-input" value={description} />
            </div>
            <div className="item-modal__input" id="link">
              <label htmlFor="link-input">Link</label>
              <input type="text" id="link-input" value={link} />
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
          <img className="close-button" src={CloseIcon} alt="Close Icon" />
        </div>
      </div>
    );
  }
}

export default ItemForm;
