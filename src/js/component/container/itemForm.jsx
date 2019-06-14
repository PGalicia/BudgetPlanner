import React, { Component } from "react"; // React
import CloseIcon from "./../../../asset/x-icon.svg"; // Asset

class AddItemForm extends Component {
  render() {
    let item = this.props.item
      ? this.props.item
      : {
          id: -1,
          name: "",
          description: "",
          currentPrice: 0,
          goalPrice: 0,
          priority: 3,
          link: ""
        };

    const {
      id,
      name,
      description,
      currentPrice,
      goalPrice,
      priority,
      link
    } = item;

    return (
      <div className="modal-background">
        <div className="large-modal-container item-modal">
          <p className="item-modal__title heading">
            {this.props.item ? "Edit" : "Add"} Item
          </p>
          {this.props.item && (
            <p className="item-modal__subheading">{this.props.item.name}</p>
          )}
          <form className="item-modal__form">
            <div className="item-modal__input" id="name">
              <label htmlFor="name-input">
                Name:<span className="side-note">max character 21</span>
              </label>
              <input type="text" id="name-input" value={name} />
            </div>
            <div className="item-modal__input" id="cost">
              <label htmlFor="item-cost-input">Item Cost:</label>
              <input type="text" id="item-cost-input" value={goalPrice} />
            </div>
            <div className="item-modal__input" id="description">
              <label htmlFor="description-input">
                Description:<span className="side-note">max character 123</span>
              </label>
              <input type="text" id="description-input" value={description} />
            </div>
            <div className="item-modal__input" id="link">
              <label htmlFor="link-input">Link:</label>
              <input type="text" id="link-input" value={link} />
            </div>
            <div className="item-modal__priority">
              <span>Priority:</span>
              <button className="item-modal__priority-button" id="high">
                High Priority
              </button>
              <button className="item-modal__priority-button" id="med">
                Medium Priority
              </button>
              <button className="item-modal__priority-button" id="low">
                Low Priority
              </button>
            </div>
            <button className="sm-button">Apply Changes</button>
          </form>
          <img className="close-button" src={CloseIcon} alt="Close Icon" />
        </div>
      </div>
    );
  }
}

export default AddItemForm;
