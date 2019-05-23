import React from "react"; // React
import "./../../scss/itemCard.scss"; // SCSS
import { determineProgressBarColor } from "./../../utils/determineProgressBarColor.js"; // Utils
import { determineItemPriorityColorAndText } from "./../../utils/determineItemPriorityColorAndText.js"; // Utils
import ArrowIcon from "./../../../asset/arrow-icon.svg"; // Asset

const itemCard = props => {
  const {
    name,
    description,
    goalPrice,
    currentPrice,
    priority,
    link
  } = props.item;

  // Determine the item percentage
  const progressBarPercentage = Math.floor((currentPrice / goalPrice) * 100);

  // Determine which color to use for progress bar
  const progressBarColor = determineProgressBarColor(progressBarPercentage);

  // Determine the width of progress bar
  const progressBarWidth = (progressBarPercentage / 100) * 412;

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
  return (
    <div className="item-card">
      <h2 className="item-name">{name}</h2>
      <p className="item-description">{description}</p>
      <h4 className="progress-label">
        Progress
        <span className="price">{`$${currentPrice}/$${goalPrice}`}</span>
      </h4>
      <div className="progress-bar-container">
        <h4 className="percentage">{`${progressBarPercentage}%`}</h4>
        <div className="goal-bar" />
        <div className="current-bar" style={progressBarStyle} />
      </div>
      <div className="priority" style={priorityContainerStyle}>
        <span>{`${text} Priority`}</span>
      </div>

      <a href={link} target="_blank" className="item-link">
        <img src={ArrowIcon} className="arrow-icon" />
        <p className="link-label">Click to go to item’s page</p>
      </a>
    </div>
  );
};

export default itemCard;
