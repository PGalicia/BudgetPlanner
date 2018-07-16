from assets.utilities import mysqlcommands


def money_allocation(item_list, budget, priority_count) -> str:
    """
        For each item in 'item_list', allocate the available 'budget',
        ensuring that the items that have higher priority would have
        the money allocated to them first. 'priority_count' is a list
        holds how many items have similar priorities (ie 3 counts of
        items with #2 priority)

        Returns a string that displays leftover money after allocation

        NOTE: When dividing up the budget between odd amount of items,
        it will sometimes produce a slight inaccuracy. In other words, some
        items will have an extra cent allocated to those said items
    """

    index = 0   # Keeps track of the iteration for the 'priority_count' list
    current = priority_count[index][0]  # The current priority
    current_count = priority_count[index][1]    # The current priority's count
    money = budget  # The budget
    allocated_money = money / current_count # The amount of money that should be allocated to each item

    # Tracks if there would be a leftover due to the price being lower than the allocated money
    leftover = False

    for item in item_list:
        # If there is no more money, set the rest of the items to ZERO
        if money < 0:
            mysqlcommands.edit_item_money(item[0], 5)

        # If the priority changes, iterate to new priority in 'priority_count' and reset everything
        if item[2] != current:
            index += 1
            current = priority_count[index][0]
            current_count = priority_count[index][1]
            allocated_money = money / current_count

        # If the price of item is LESS THAN the budget,
        if item[3] < allocated_money:
            # Match the item's price
            allocated_money = item[3]

            # Reduce the current_count - this is to redistribute the remaining money from above
            current_count = 1 if (current_count-1) == 0 else current_count-1

            # Mark that there is still leftover due to the price being lower than the allocated money
            leftover = True

        # Edit the money of the current item
        mysqlcommands.edit_item_money(item[0], round(allocated_money, 2))

        # Deduct the money from the budget
        money -= allocated_money

        # Adjust priority_price(if necessary)
        if leftover:
            allocated_money = money / current_count

        # Reset
        leftover = False

    # Leftover money
    return "%.2f" % round(money, 2)