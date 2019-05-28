import React, { Component } from "react"; // React
import ItemsContainer from "./itemsContainer.jsx"; // Component
import Header from "./header.jsx"; // Component
import "./../../scss/app.scss"; // SCSS
import { connect } from "react-redux"; // React-Redux
import DeleteConfirmationModal from "./../presentational/deleteCofirmationModal.jsx"; // Component

/*
  mapStateToProps,
  mapDispatchToProps
*/
const mapStateToProps = state => {
  return {
    items: state.items,
    targetedItemId: state.targetedItemId
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
      </>
    );
  }
}

export default connect(mapStateToProps)(App);
