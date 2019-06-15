import React from "react"; // React
import { connect } from "react-redux"; // React-Redux
import CloseIcon from "./../../../asset/x-icon.svg"; // Asset
import { toggleSettingsModal } from "./../../action/index.js"; // Action Types

/*
  mapDispatchToProps
*/
const mapDispatchToProps = dispatch => {
  return {
    toggleSettingsModal: bool => dispatch(toggleSettingsModal(bool))
  };
};

const SettingsModal = props => {
  return (
    <section className="modal-background">
      <div className="small-modal-container settings-modal">
        <p className="settings-modal__label">Edit Money Information</p>
        <div className="settings-modal__total-budget">
          <label htmlFor="total-budget-input">Total Budget:</label>
          <input
            type="text"
            className="settings-modal__total-budget-input"
            id="total-budget-input"
            value={props.totalMoney}
          />
          <span className="settings-modal__input-icon">$</span>
        </div>
        <div className="settings-modal__percentage">
          <label htmlFor="percentage-input">Percentage:</label>
          <input
            type="text"
            className="settings-modal__percentage-input"
            id="percentage-input"
            value={props.percentage}
          />
          <span className="settings-modal__input-icon">%</span>
        </div>
        <button className="settings-modal__apply-button sm-button">
          Apply Changes
        </button>
        <img
          className="close-button"
          src={CloseIcon}
          alt="Close Icon"
          onClick={() => props.toggleSettingsModal(false)}
        />
      </div>
    </section>
  );
};
export default connect(
  null,
  mapDispatchToProps
)(SettingsModal);
