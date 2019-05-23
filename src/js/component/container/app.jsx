import React, { Component } from "react"; // React
import ItemsContainer from "./itemsContainer.jsx"; // Component
import "./../../scss/app.scss"; // SCSS
import { connect } from "react-redux"; // React-Redux

/*
  mapStateToProps,
  mapDispatchToProps
*/
const mapStateToProps = state => {
  return {
    items: state.items
  };
};

class App extends Component {
  render() {
    return (
      <>
        <ItemsContainer items={this.props.items} />
      </>
    );
  }
}

export default connect(mapStateToProps)(App);
