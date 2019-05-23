/*
    Used solely for itemCard Component.
    Description: Figure out which color to use for priority
    and the text used for that priority
*/

export const determineItemPriorityColorAndText = priority => {
    const priorityColorAndText = [
        { priority: 1, color: "#FF686A", text: "High" },
        { priority: 2, color: "#F2C233", text: "Medium" },
        { priority: 3, color: "#BDBDBD", text: "Low" },
    ]

    return priorityColorAndText.find(index => index.priority === priority);
}