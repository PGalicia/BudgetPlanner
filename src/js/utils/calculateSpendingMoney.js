/*
    Calculate spending money based on the percentage and total money
*/

export const calculateSpendingMoney = (percentage, totalMoney) => {
    return ((percentage / 100) * totalMoney).toFixed(2);
}