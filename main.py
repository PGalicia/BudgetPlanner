from flask import Flask, render_template, request, jsonify
from assets.utilities import jsoncommands, mysqlcommands, utilities
from assets.other import constants

app = Flask(__name__)


@app.route("/")
def index():
    """
        Return an HTML template that contains the list of items and the available money
    """
    # Get the contents from the JSON file
    my_obj = jsoncommands.get_json(constants.JSON_FILE_PATH)

    # Get all the items in the server
    items = mysqlcommands.get_all_items()

    # Format the floats
    total = "%.2f" % round(my_obj['Total'], 2)
    percentage = "%d" % round(my_obj['Percentage'] * 100, 2)
    available = "%.2f" % round(my_obj['Total'] * my_obj['Percentage'], 2)

    # Only call this function if there is more than one item in the item list
    if len(items) > 1:
        utilities.money_allocation(items, my_obj['Total'] * my_obj['Percentage'], mysqlcommands.priority_count())

    return render_template("index.html", list=mysqlcommands.get_all_items(), total=total, percentage=percentage,
                           available=available)


@app.route("/add", methods=["POST"])
def add() -> jsonify:
    """
        Adds a new item in the server and returns the updated list to the front-end
    """
    # Passed Items from Front-End
    name = request.form['name']
    priority = request.form['priority']
    price = request.form['price'].replace(",", "")  # To prevent string to float conversion
    money = request.form['money']

    # Adds item to the server and check the status of the addition
    is_right = mysqlcommands.add_item(name, priority, price, money)

    # Pass the status of the addition to this variable
    message = constants.ADD_ITEM_SUCCESS_MESSAGE if is_right else constants.ADD_ITEM_FAILURE_MESSAGE

    # Get the content from the JSON file
    my_obj = jsoncommands.get_json(constants.JSON_FILE_PATH)

    # Re-allocate the budget with the new added item
    utilities.money_allocation(mysqlcommands.get_all_items(), my_obj['Total'] * my_obj['Percentage'],
                               mysqlcommands.priority_count())

    return jsonify({
        "color": is_right,
        "message": message,
        "allItems": mysqlcommands.get_all_items()
    })


@app.route("/delete", methods=['POST'])
def delete() -> jsonify:
    """
        Delete the specified item in the server and return the updated list to the front-end
    """
    # Passed Items from Front-End
    item_id = request.form['id']

    # Get the contents from the JSON file
    my_obj = jsoncommands.get_json(constants.JSON_FILE_PATH)

    # Get all the items in the server
    items = mysqlcommands.get_all_items()

    # Only call this function if there is more than one item in the item list
    if len(items) > 1:
        # Re-allocate the budget
        utilities.money_allocation(items, my_obj['Total'] * my_obj['Percentage'],
                                   mysqlcommands.priority_count())

    # Delete the item in the server and check the status of the deletion
    is_right = mysqlcommands.delete_item(item_id)

    # Pass the status of the deletion to this variable
    message = constants.DELETE_ITEM_SUCCESS_MESSAGE if is_right else constants.DELETE_ITEM_FAILURE_MESSAGE

    return jsonify({
        "color": is_right,
        "message": message,
        "allItems": mysqlcommands.get_all_items()
    })


@app.route("/modal/<id>", methods=['POST'])
def modal(item_id):
    """
        Return the information of the specified 'item_id'.
        This is so that users can open the correct modal item through AJAX
    """
    return jsonify({
        "id": item_id,
        "name": mysqlcommands.get_item(item_id)[1]
    })


@app.route("/edit/<category>", methods=['POST'])
def edit(category):
    """
        Update the specified item 'category' and return the status and updated items to the front-end
    """
    # Passed Items from Front-End
    item_id = request.form['id']
    new_value = request.form['value']

    # Get the contents from the JSON file
    my_obj = jsoncommands.get_json(constants.JSON_FILE_PATH)

    # Re-allocate the budget
    utilities.money_allocation(mysqlcommands.get_all_items(), my_obj['Total'] * my_obj['Percentage'],
                               mysqlcommands.priority_count())

    if category == "name":
        # Edit the item name in the server and check the status of the update
        is_right = mysqlcommands.edit_item_name(item_id, new_value)

        # Pass the status of the edit to this variable
        message = constants.UPDATE_ITEM_NAME_SUCCESS_MESSAGE if is_right \
            else constants.UPDATE_ITEM_NAME_FAILURE_MESSAGE

        return jsonify({
            "color": is_right,
            "message": message,
            "allItems": mysqlcommands.get_all_items()
        })
    elif category == "priority":
        # Edit the item priority in the server and check the status of the update
        is_right = mysqlcommands.edit_item_priority(item_id, new_value)

        # Pass the status of the edit to this variable
        message = constants.UPDATE_ITEM_PRIORITY_SUCCESS_MESSAGE if is_right \
            else constants.UPDATE_ITEM_PRIORITY_FAILURE_MESSAGE

        return jsonify({
            "color": is_right,
            "message": message,
            "allItems": mysqlcommands.get_all_items()
        })
    # category == "price"
    else:
        # Edit the item price in the server and check the status of the update
        is_right = mysqlcommands.edit_item_price(item_id, new_value)

        # Pass the status of the edit to this variable
        message = constants.UPDATE_ITEM_PRICE_SUCCESS_MESSAGE if is_right \
            else constants.UPDATE_ITEM_PRICE_FAILURE_MESSAGE

        return jsonify({
            "color": is_right,
            "message": message,
            "allItems": mysqlcommands.get_all_items()
        })


# Update the money information
@app.route("/update_money/<category>", methods=['POST'])
def update_money(category):
    """
        Update the specified information 'category' and return the status and updated items to the front-end
    """
    if category == "total":
        # The new value of the 'total' value
        new_value = request.form['value'].replace(",", "")  # To prevent string to float conversion

        # Edit the information price in the server and check the status of the update
        is_right = jsoncommands.set_json_total(constants.JSON_FILE_PATH, float(new_value))

        # Pass the status of the edit to this variable
        message = constants.UPDATE_PRICE_TOTAL_SUCCESS_MESSAGE if is_right \
            else constants.UPDATE_PRICE_TOTAL_FAILURE_MESSAGE
    else:
        # The new value of the 'percentage' value
        new_value = request.form['value']

        # Edit the information percentage in the server and check the status of the update
        is_right = jsoncommands.set_json_percentage(constants.JSON_FILE_PATH, float(new_value.replace(",", "")) / 100)

        # Pass the status of the edit to this variable
        message = constants.UPDATE_PRICE_PERCENTAGE_SUCCESS_MESSAGE if is_right \
            else constants.UPDATE_PRICE_PERCENTAGE_FAILURE_MESSAGE

    # Get the contents from the JSON file
    my_obj = jsoncommands.get_json(constants.JSON_FILE_PATH)

    # Get all the items in the server
    items = mysqlcommands.get_all_items()

    # Format the floats
    total = "%.2f" % round(my_obj['Total'], 2)
    percentage = "%d" % round(my_obj['Percentage'] * 100, 2)
    available = "%.2f" % round(my_obj['Total'] * my_obj['Percentage'], 2)

    if len(items) > 1:
        utilities.money_allocation(items, my_obj['Total'] * my_obj['Percentage'],
                                   mysqlcommands.priority_count())

    return jsonify({
        "color": is_right,
        "message": message,
        "budget": available,
        "percentage": percentage,
        "total": total,
        "allItems": mysqlcommands.get_all_items()

    })


if __name__ == "__main__":
    app.run(debug=True)
