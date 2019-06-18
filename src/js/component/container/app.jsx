import React, { Component } from "react"; // React
import ItemsContainer from "./itemsContainer.jsx"; // Component
import Header from "./header.jsx"; // Component
import "./../../scss/index.scss"; // SCSS
import { connect } from "react-redux"; // React-Redux
import DeleteConfirmationModal from "./deleteCofirmationModal.jsx"; // Component
import SettingsModal from "./settingsModal.jsx"; // Component
import ItemForm from "./itemForm.jsx"; // Component

/*
  mapStateToProps,
  mapDispatchToProps
*/
const mapStateToProps = state => {
  return {
    items: state.items,
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
        <ItemsContainer />
        {this.props.isDeleteConfirmationModalOpen && (
          <DeleteConfirmationModal item={this.props.targetedItem} />
        )}
        {this.props.isSettingsModalOpen && <SettingsModal />}
        {this.props.isItemFormPopUpOpen && (
          <ItemForm item={this.props.targetedItem} />
        )}
      </>
    );
  }
}

export default connect(mapStateToProps)(App);
