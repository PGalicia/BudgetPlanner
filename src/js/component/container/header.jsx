import React, { Component } from "react"; // React
import { connect } from "react-redux"; // React-Redux
import CogIcon from "./../../../asset/cog-icon.svg"; // Asset
import { calculateSpendingMoney } from "./../../utils/calculateSpendingMoney.js"; // Utils
import { allocateSpendingMoneyToItems } from "./../../utils/allocateSpendingMoneyToItems.js"; // Utils

/*
  mapStateToProps
*/
const mapStateToProps = state => {
  return {
    items: state.items,
    totalMoney: state.totalMoney,
    percentage: state.percentage
  };
};

/*
    Header Component
*/
class Header extends Component {
  render() {
    // @todo: need to format numbers
    const spendingMoney = calculateSpendingMoney(
      this.props.percentage,
      this.props.totalMoney
    );

    // Allocate Spending Money
    allocateSpendingMoneyToItems(spendingMoney, this.props.items);

    return (
      <header className="header" id="header">
        <h1 className="header__app-name">WISELY</h1>
        <p className="header__spending-money">
          Spending Money:{" "}
          <strong>
            ${" "}
            {spendingMoney.toLocaleString("en-US", {
              style: "currency",
              currency: "USD"
            })}
          </strong>
        </p>
        <p className="header__percentage-and-total-money-subnote">
          The spending money is {this.props.percentage}% of your total budget: $
          {this.props.totalMoney.toLocaleString("en-US", {
            style: "currency",
            currency: "USD"
          })}
        </p>
        <button className="header__add-item-button">Add Item</button>
        <button className="header__settings-button">
          <img src={CogIcon} alt="Settings Icon" />
        </button>
      </header>
    );
  }
}

export default connect(mapStateToProps)(Header);
