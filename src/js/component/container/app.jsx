import React, { Component } from "react"; // React
import ItemsContainer from "./itemsContainer.jsx"; // Component
import Header from "./header.jsx"; // Component
import "./../../scss/app.scss"; // SCSS
import { connect } from "react-redux"; // React-Redux
import DeleteConfirmationModal from "./../presentational/deleteCofirmationModal.jsx"; // Component
import SettingsModal from "./../presentational/settingsModal.jsx"; // Component
import ItemForm from "./itemForm.jsx"; // Component

/*
  mapStateToProps,
  mapDispatchToProps
*/
const mapStateToProps = state => {
  return {
    items: state.items,
    totalMoney: state.totalMoney,
    percentage: state.percentage,
    targetedItem: state.targetedItem,
    isSettingsModalOpen: state.isSettingsModalOpen,
    isDeleteConfirmationModalOpen: state.isDeleteConfirmationModalOpen,
    isItemFormPopUpOpen: state.isItemFormPopUpOpen
  };
};

class App extends Component {
  render() {
    return (
      <>
        <Header />
        <ItemsContainer items={this.props.items} />
        {this.props.isDeleteConfirmationModalOpen && (
          <DeleteConfirmationModal item={this.props.targetedItem} />
        )}
        {this.props.isSettingsModalOpen && (
          <SettingsModal
            totalMoney={this.props.totalMoney}
            percentage={this.props.percentage}
          />
        )}
        {this.props.isItemFormPopUpOpen && (
          <ItemForm item={this.props.targetedItem} />
          // <ItemForm />
        )}
      </>
    );
  }
}

export default connect(mapStateToProps)(App);
