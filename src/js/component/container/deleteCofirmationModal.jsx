import React, { Component } from "react"; // React
import { connect } from "react-redux"; // React-Redux
import { deleteItem } from "./../../action/index.js"; // Action Types
import CloseIcon from "./../../../asset/x-icon.svg"; // Asset

/*
  mapDispatchToProps
*/
const mapDispatchToProps = dispatch => {
  return {
    deleteItem: item => dispatch(deleteItem(item))
  };
};

class DeleteConfirmationModal extends Component {
  render() {
    return (
      <section className="modal-background">
        <div className="small-modal-container delete-modal">
          <p className="delete-modal__question">
            Are you sure you want to delete <span>{this.props.item.name}</span>{" "}
            ?
          </p>
          <button
            className="delete-modal__button sm-button"
            onClick={() => this.props.deleteItem(this.props.item)}
          >
            Delete Item
          </button>
          <img
            className="close-button"
            src={CloseIcon}
            onClick={() => this.props.toggleDeleteModal(false)}
            alt="Close Icon"
          />
        </div>
      </section>
    );
  }
}
export default connect(
  null,
  mapDispatchToProps
)(DeleteConfirmationModal);
