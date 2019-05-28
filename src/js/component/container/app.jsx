import React, { Component } from "react"; // React
import ItemsContainer from "./itemsContainer.jsx"; // Component
import Header from "./header.jsx"; // Component
import "./../../scss/app.scss"; // SCSS
import { connect } from "react-redux"; // React-Redux
import { toggleDeleteConfirmationModal } from "./../../constant/actionTypes.js"; // Action Types

/*
  mapStateToProps,
  mapDispatchToProps
*/
const mapStateToProps = state => {
  return {
    items: state.items,
    isDeleteConfirmationModalOpen: state.isDeleteConfirmationModalOpen
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

class App extends Component {
  render() {
    return (
      <>
        <Header />
        <ItemsContainer items={this.props.items} />
        {/* {isDeleteConfirmationModalOpen && <DeleteConfirmatioModal item={0} />} */}
      </>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
