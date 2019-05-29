import React from "react"; // React
import "./../../scss/settingsModal.scss"; // SCSS
import CloseIcon from "./../../../asset/x-icon.svg"; // Asset

const SettingsModal = props => {
  return (
    <section className="small-modal-background">
      <div className="modal-container settings-confirmation-modal">
        <p className="edit-information-info-heading">Edit Money Information</p>
        <div className="total-budget-container">
          <label htmlFor="total-budget-input">Total Budget:</label>
          <input
            type="text"
            className="total-budget-input"
            value={props.totalMoney}
          />
          <span className="input-icon">$</span>
        </div>
        <div className="percentage-container">
          <label htmlFor="percentage-input">Percentage:</label>
          <input
            type="text"
            className="percentage-input"
            value={props.percentage}
          />
          <span className="input-icon">%</span>
        </div>
        <button className="apply-changes-button sm-button">
          Apply Changes
        </button>
        <img className="close-button" src={CloseIcon} alt="Close Icon" />
      </div>
    </section>
  );
};
export default SettingsModal;
