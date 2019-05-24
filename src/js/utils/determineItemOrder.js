/*
    Description: Determine the order of the items based
    on the selected choice under sort by.
*/

export const determineItemOrder = (itemList, category) => {
    switch (category.toLowerCase()) {
        case "alphabetically":
            return itemList.sort((a, b) => {
                if(a.name < b.name) { return -1; }
                if(a.name > b.name) { return 1; }
                return 0;
            });
        case "priority":
            return itemList.sort((a,b) => {
                return a.priority - b.priority
            });
        default:
            return itemList;
    }
}
