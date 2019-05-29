import React from "react"; // React
import "./../../scss/deleteCofirmationModal.scss"; // SCSS
import CloseIcon from "./../../../asset/x-icon.svg"; // Asset

const DeleteConfirmationModal = props => {
  return (
    <section className="modal-background">
      <div className="small-modal-container delete-confirmation-modal">
        <p className="delete-confirmation-question heading">
          Are you sure you want to delete <span>{props.item.name}</span> ?
        </p>
        <button className="delete-item-button sm-button">Delete Item</button>
        <img className="close-button" src={CloseIcon} alt="Close Icon" />
      </div>
    </section>
  );
};
export default DeleteConfirmationModal;
