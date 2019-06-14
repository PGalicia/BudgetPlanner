import React from "react"; // React
import CloseIcon from "./../../../asset/x-icon.svg"; // Asset

const DeleteConfirmationModal = props => {
  return (
    <section className="modal-background">
      <div className="small-modal-container delete-modal">
        <p className="delete-modal__question">
          Are you sure you want to delete <span>{props.item.name}</span> ?
        </p>
        <button className="delete-modal__button sm-button">Delete Item</button>
        <img className="close-button" src={CloseIcon} alt="Close Icon" />
      </div>
    </section>
  );
};
export default DeleteConfirmationModal;
