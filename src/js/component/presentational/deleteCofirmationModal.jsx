import React from "react"; // React
import "./../../scss/deleteCofirmationModal.scss"; // SCSS
import CloseIcon from "./../../../asset/x-icon.svg"; // Asset

const DeleteConfirmationModal = props => {
  return (
    <section className="small-modal-background">
      <div className="modal-container delete-confirmation-modal">
        <p className="delete-confirmation-question">
          Are you sure you want to delete <span>NIKE Benassi Slides</span> ?
        </p>
        <button className="delete-item-button">Delete Item</button>
        <img className="close-button" src={CloseIcon} alt="Close Icon" />
      </div>
    </section>
  );
};
export default DeleteConfirmationModal;
