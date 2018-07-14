import pymysql
import mysqlcommands

# Create a function that returns the count for each priority present in the table
def priority_count():
    connection = pymysql.connect(
        host='localhost',
        user='root',
        password='',
        db='budget',
    )

    try:
        with connection.cursor() as cursor:
            sql = "SELECT priority, COUNT(*) FROM item GROUP BY priority ORDER BY priority DESC;"
            try:
                cursor.execute(sql)
                result = cursor.fetchall()

            # TASK: From current tests this code is unreachable, possibly just delete it
            except:
                print("Oops! Something wrong")

        connection.commit()
    finally:
        connection.close()

        # TASK: Ensure that the item is formatted correctly - This prevent inconsistency
        return result


def money_allocation(item_list, budget, priority_count):

    index = 0
    current = priority_count[index][0]
    current_count = priority_count[index][1]
    money = budget
    allocated_money = money / current_count

    # Tracks if there would be a leftover due to the price being lower than the allocated money
    leftover = False

    for item in item_list:
        # If there is no more money, set the rest of the items to ZERO
        if money < 0:
            mysqlcommands.edit_item_money(item[0], 5)

        # If the priority changes, reset everything
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
        # have an else statement

        # Reset
        leftover = False

    # Leftover money
    return "%.2f" % round(money, 2)


print(mysqlcommands.get_all_items())
print("Leftover: " + str(money_allocation(mysqlcommands.get_all_items(), 2.00, priority_count())))
print(mysqlcommands.get_all_items())

'''
    Money allocation
        Users budget will be allocated to the items. The allocation will
        prioritize items with higher priority. If there are items with similar priority,
        the money would be split up for those items.

        When the first program is run, get all the items and sort them from highest to lowest
        priority. This allocation process will be redone every time an edit occurs with the items.
            - Add an item
            - Edit item's priority
            - Delete an item
            - Change the percentage (will change the budget)
            - Change the total (will change the budget)
'''