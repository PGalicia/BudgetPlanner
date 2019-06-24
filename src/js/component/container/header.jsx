import React, { Component } from "react"; // React
import { connect } from "react-redux"; // React-Redux
import CogIcon from "./../../../asset/cog-icon.svg"; // Asset
import { calculateSpendingMoney } from "./../../utils/calculateSpendingMoney.js"; // Utils
import {
  toggleSettingsModal,
  updateCurrentPricesForItems
} from "./../../action/index.js"; // Action Types

/*
  mapStateToProps,
  mapDispatchToProps
*/
const mapStateToProps = state => {
  return {
    items: state.items,
    totalMoney: state.totalMoney,
    percentage: state.percentage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleSettingsModal: bool => dispatch(toggleSettingsModal(bool)),
    updateCurrentPricesForItems: () => dispatch(updateCurrentPricesForItems())
  };
};

/*
    Header Component
*/
class Header extends Component {
  constructor(props) {
    super(props);

    // State
    this.state = {
      items: this.props.items,
      spendingMoney: 0.0
    };

    // Bindings
    this.updateSpendingMoneyAndCurrentPriceItems = this.updateSpendingMoneyAndCurrentPriceItems.bind(
      this
    );
  }

  componentDidMount() {
    // Update current prices for each items
    this.updateSpendingMoneyAndCurrentPriceItems();
  }

  componentDidUpdate(prevProps, prevState) {
    // Update 'spendingMoney', 'totalMoney', and the current prices for each items
    if (
      prevProps.percentage !== this.props.percentage ||
      prevProps.totalMoney !== this.props.totalMoney
    ) {
      this.updateSpendingMoneyAndCurrentPriceItems();
    }
  }

  updateSpendingMoneyAndCurrentPriceItems() {
    // @todo: need to format numbers
    const spendingMoney = calculateSpendingMoney(
      this.props.percentage,
      this.props.totalMoney
    );

    this.setState({ spendingMoney });

    // Update the allocation of money
    this.props.updateCurrentPricesForItems();
  }

  render() {
    return (
      <header className="header" id="header">
        <h1 className="header__app-name">WISELY</h1>
        <p className="header__spending-money">
          Spending Money:{" "}
          <strong>
            ${" "}
            {this.state.spendingMoney.toLocaleString("en-US", {
              style: "currency",
              currency: "USD"
            })}
          </strong>
        </p>
        <p className="header__percentage-and-total-money-subnote">
          The spending money is {this.props.percentage}% of your total budget:{" "}
          {this.props.totalMoney.toLocaleString("en-US", {
            style: "currency",
            currency: "USD"
          })}
        </p>
        <button className="header__add-item-button">Add Item</button>
        <button
          className="header__settings-button"
          onClick={() => this.props.toggleSettingsModal(true)}
        >
          <img src={CogIcon} alt="Settings Icon" />
        </button>
      </header>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
