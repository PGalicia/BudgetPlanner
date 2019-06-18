import React, { Component } from "react"; // React
import { determineProgressBarColor } from "./../../utils/determineProgressBarColor.js"; // Utils
import { determineItemPriorityColorAndText } from "./../../utils/determineItemPriorityColorAndText.js"; // Utils
import ArrowIcon from "./../../../asset/arrow-icon.svg"; // Asset
import MoreIcon from "./../../../asset/more-icon.svg"; // Asset
import StopIcon from "./../../../asset/stop-icon.svg"; // Asset
import posed from "react-pose"; // Library

// ItemCard - Posed
const Item = posed.div({
  open: { y: 0, opacity: 1 },
  closed: { y: 20, opacity: 0 }
});

class ItemCard extends Component {
  constructor(props) {
    super(props);

    // DOM Access
    this.moreIcon = React.createRef();

    // State
    this.state = {
      item: this.props.item,
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
    this.handleDeleteButtonPress = this.handleDeleteButtonPress.bind(this);
  }

  componentDidMount() {
    document.addEventListener(
      "mousedown",
      this.handleUserClickWhenMoreMenuIsDisplayed
    );
  }

  componentWillUnmount() {
    document.addEventListener(
      "mousedown",
      this.handleUserClickWhenMoreMenuIsDisplayed
    );
  }

  toggleMoreIconButtonPress() {
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

  handleDeleteButtonPress() {
    // Open Delete Confirmation Modal and pass in the item to that component
    this.props.handleDeleteButtonPress(this.state.item);
    this.props.toggleDeleteModal(true);
  }

  render() {
    const {
      id,
      name,
      description,
      goalPrice,
      currentPrice,
      percentage,
      priority,
      link
    } = this.state.item;

    // Update  progress bar width
    const progressBarWidth = Math.ceil(
      (this.props.item.percentage / 100) * 422
    );

    // Determine which color to use for progress bar
    const progressBarColor = determineProgressBarColor(percentage);

    // Progress bar style
    const progressBarStyle = {
      backgroundColor: progressBarColor,
      width: `${progressBarWidth}px`
    };

    // Determine the color and text of priority
    const { color, text } = determineItemPriorityColorAndText(priority);
    const priorityContainerStyle = {
      backgroundColor: color
    };

    const linkView =
      link === "" ? (
        <div className="item__invalid-link">
          <img src={StopIcon} className="item__stop-icon" />
          <p className="item__link-label">There's no provided link</p>
        </div>
      ) : (
        <a href={link} target="_blank" className="item__link">
          <img src={ArrowIcon} className="item__arrow-icon" />
          <p className="item__link-label">Click to go to item’s page</p>
        </a>
      );

    return (
      <Item className="item__card">
        <h2 className="item__name">{name}</h2>
        <p className="item__description">
          {description === "" ? "No description available" : description}
        </p>
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
          <h4 className="item__percentage">{`${percentage}%`}</h4>
          <div className="item__goal-bar" />
          <div className="item__current-bar" style={progressBarStyle} />
        </div>
        <div className="item__priority" style={priorityContainerStyle}>
          <span>{`${text} Priority`}</span>
        </div>

        {/* Link View */}
        {linkView}

        {/* Pop up links */}
        {this.state.isMoreMenuOnDisplay && (
          <div className="item__extra-menu" ref={this.moreIcon}>
            <button className="item__extra-menu-link">Edit</button>
            <button
              className="item__extra-menu-link"
              onClick={this.handleDeleteButtonPress}
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
