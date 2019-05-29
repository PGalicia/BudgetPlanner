import React, { Component } from "react"; // React
import ItemsContainer from "./itemsContainer.jsx"; // Component
import Header from "./header.jsx"; // Component
import "./../../scss/app.scss"; // SCSS
import { connect } from "react-redux"; // React-Redux
import DeleteConfirmationModal from "./../presentational/deleteCofirmationModal.jsx"; // Component
import SettingsModal from "./../presentational/settingsModal.jsx"; // Component

/*
  mapStateToProps,
  mapDispatchToProps
*/
const mapStateToProps = state => {
  return {
    items: state.items,
    totalMoney: state.totalMoney,
    percentage: state.percentage,
    targetedItemId: state.targetedItemId,
    isSettingsModalOpen: state.isSettingsModalOpen
  };
};

class App extends Component {
  render() {
    return (
      <>
        <Header />
        <ItemsContainer items={this.props.items} />
        {this.props.targetedItemId !== -1 && (
          <DeleteConfirmationModal id={this.props.targetedItemId} />
        )}
        {this.props.isSettingsModalOpen && (
          <SettingsModal
            totalMoney={this.props.totalMoney}
            percentage={this.props.percentage}
          />
        )}
      </>
    );
  }
}

export default connect(mapStateToProps)(App);
