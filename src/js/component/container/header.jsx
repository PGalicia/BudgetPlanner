import React, { Component } from "react"; // React
import { connect } from "react-redux"; // React-Redux
import "./../../scss/header.scss"; // SCSS
import CogIcon from "./../../../asset/cog-icon.svg"; // Asset

/*
  mapStateToProps
*/
const mapStateToProps = state => {
  return {
    totalMoney: state.totalMoney,
    percentage: state.percentage
  };
};

/*
    Header Component
*/
class Header extends Component {
  render() {
    return (
      <header className="header-container">
        <h1 className="web-app-name">WISELY</h1>
        <p className="spending-money">Spending Money: $</p>
        <p className="percentage-and-total-money-subnote">
          The spending money is {this.props.percentage}% of your total budget: $
          {this.props.totalMoney}
        </p>
        <button className="add-item-button">Add Item</button>
        <button className="settings-button">
          <img src={CogIcon} />
        </button>
      </header>
    );
  }
}

export default connect(mapStateToProps)(Header);
