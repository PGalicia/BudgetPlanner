import React, { Component } from "react"; // React
import { determineProgressBarColor } from "./../../utils/determineProgressBarColor.js"; // Utils
import { determineItemPriorityColorAndText } from "./../../utils/determineItemPriorityColorAndText.js"; // Utils
import ArrowIcon from "./../../../asset/arrow-icon.svg"; // Asset
import MoreIcon from "./../../../asset/more-icon.svg"; // Asset
import posed from "react-pose"; // Library

// ItemCard - Posed
const Item = posed.div({
  open: { y: 0, opacity: 1 },
  closed: { y: 20, opacity: 0 }
});

class ItemCard extends Component {
  constructor() {
    super();

    // DOM Access
    this.moreIcon = React.createRef();

    // State
    this.state = {
      isMoreMenuOnDisplay: false,
      progressBarPercentage: 0,
      progressBarWidth: 0
    };

    // Constant
    this.progressBarInterval = null;

    // Bindings
    this.toggleMoreIconButtonPress = this.toggleMoreIconButtonPress.bind(this);
    this.handleUserClickWhenMoreMenuIsDisplayed = this.handleUserClickWhenMoreMenuIsDisplayed.bind(
      this
    );
  }

  componentWillMount() {
    // Set Interval used for progress bar animation
    this.progressBarInterval = setInterval(() => {
      this.setState({
        progressBarWidth: Math.ceil(
          (this.state.progressBarPercentage / 100) * 422
        ),
        progressBarPercentage: this.state.progressBarPercentage + 1
      });
    }, 10);

    document.addEventListener(
      "mousedown",
      this.handleUserClickWhenMoreMenuIsDisplayed,
      false
    );
  }

  componentWillUnmount() {
    document.addEventListener(
      "mousedown",
      this.handleUserClickWhenMoreMenuIsDisplayed,
      false
    );
  }

  toggleMoreIconButtonPress(e) {
    this.setState({ isMoreMenuOnDisplay: !this.state.isMoreMenuOnDisplay });
  }

  handleUserClickWhenMoreMenuIsDisplayed(e) {
    // If pressed outside, close down more icon choices
    if (
      this.state.isMoreMenuOnDisplay &&
      !this.moreIcon.current.contains(e.target)
    ) {
      this.setState({ isMoreMenuOnDisplay: false });
      return;
    }
  }

  render() {
    const {
      name,
      description,
      goalPrice,
      currentPrice,
      priority,
      link
    } = this.props.item;

    // Determine the item percentage
    const progressBarPercentage = Math.floor((currentPrice / goalPrice) * 100);

    // When the progressBarPercentage and progressBarWidth is the same as progress bar
    // declared in the states, then clear interval
    if (progressBarPercentage <= this.state.progressBarPercentage) {
      clearInterval(this.progressBarInterval);
    }

    // Determine which color to use for progress bar
    const progressBarColor = determineProgressBarColor(progressBarPercentage);

    // Progress bar style
    const progressBarStyle = {
      backgroundColor: progressBarColor,
      width: `${this.state.progressBarWidth}px`
    };

    // Determine the color and text of priority
    const { color, text } = determineItemPriorityColorAndText(priority);
    const priorityContainerStyle = {
      backgroundColor: color
    };

    return (
      <Item className="item__card">
        <h2 className="item__name">{name}</h2>
        <p className="item__description">{description}</p>
        <img
          src={MoreIcon}
          className="item__more-icon"
          onClick={this.toggleMoreIconButtonPress}
        />
        <h4 className="item__progress-label">
          Progress
          <span className="item__price">{`$${currentPrice}/$${goalPrice}`}</span>
        </h4>
        <div className="item__progress-bar-container">
          <h4 className="item__percentage">{`${
            this.state.progressBarPercentage
          }%`}</h4>
          <div className="item__goal-bar" />
          <div className="item__current-bar" style={progressBarStyle} />
        </div>
        <div className="item__priority" style={priorityContainerStyle}>
          <span>{`${text} Priority`}</span>
        </div>

        <a href={link} target="_blank" className="item__link">
          <img src={ArrowIcon} className="item__arrow-icon" />
          <p className="item__link-label">Click to go to item’s page</p>
        </a>

        {/* Pop up links */}
        {this.state.isMoreMenuOnDisplay && (
          <div className="item__extra-menu" ref={this.moreIcon}>
            <button className="item__extra-menu-link">Edit</button>
            <button
              className="item__extra-menu-link"
              onClick={this.props.handleDeleteButtonPress}
            >
              Delete
            </button>
          </div>
        )}
      </Item>
    );
  }
}

export default ItemCard;
