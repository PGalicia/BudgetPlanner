/*
    Used solely for itemCard Component.
    Description: Figure out which color to use for the
    item progress bar
*/
export const determineProgressBarColor = percentage => {
    const progressBarColors = [
        { status: "low", color: "#FF686A" },
        { status: "med", color: "#F2C233" },
        { status: "high", color: "#1FBF84" }
      ];

    let status = null;

    if(0 <= percentage && percentage <= 25) {
        status="low"
    } else if (26 <= percentage && percentage <= 75) {
        status="med"
    } else {
        status="high"
    }

    return progressBarColors.find(color => color.status == status).color;
}