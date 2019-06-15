import React, { Component } from "react"; // React
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

class SettingsModal extends Component {
  constructor() {
    super();

    this.state = {
      totalMoney: 0,
      percentage: 0
    };

    this.handlePercentageInputChange = this.handlePercentageInputChange.bind(
      this
    );
    this.handleTotalMoneyInputChange = this.handleTotalMoneyInputChange.bind(
      this
    );
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({
      totalMoney: this.props.totalMoney,
      percentage: this.props.percentage
    });
  }

  handlePercentageInputChange(e) {
    // @todo Ensure that the value in this input is just a number between 0 and 100
    this.setState({ percentage: e.target.value });
  }

  handleTotalMoneyInputChange(e) {
    // @todo Ensure that the value in this input is just a number (ie valid money number)
  }
  handleSubmit(e) {}

  render() {
    return (
      <section className="modal-background">
        <form
          className="small-modal-container settings-modal"
          onSubmit={this.handleSubmit}
        >
          <p className="settings-modal__label">Edit Money Information</p>
          <div className="settings-modal__total-budget">
            <label htmlFor="total-budget-input">Total Budget:</label>
            <input
              type="text"
              className="settings-modal__total-budget-input"
              id="total-budget-input"
              value={this.state.totalMoney}
              onChange={this.handleTotalMoneyInputChange}
            />
            <span className="settings-modal__input-icon">$</span>
          </div>
          <div className="settings-modal__percentage">
            <label htmlFor="percentage-input">Percentage:</label>
            <input
              type="number"
              className="settings-modal__percentage-input"
              id="percentage-input"
              value={this.state.percentage}
              onChange={this.handlePercentageInputChange}
              min="0"
              max="100"
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
            onClick={() => this.props.toggleSettingsModal(false)}
          />
        </form>
      </section>
    );
  }
}
export default connect(
  null,
  mapDispatchToProps
)(SettingsModal);
