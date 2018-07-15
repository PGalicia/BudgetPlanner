from flask import Flask, render_template, request, jsonify
import mysqlcommands
import jsoncommands
import utilities
import constants

app = Flask(__name__)


@app.route("/")
def index():
    myObj = jsoncommands.getJSON("./money.json")

    total = "%.2f" % round(myObj['Total'], 2)
    percentage = "%d" % round(myObj['Percentage'] * 100, 2)
    available = "%.2f" % round(myObj['Total'] * myObj['Percentage'], 2)

    utilities.money_allocation(mysqlcommands.get_all_items(), myObj['Total'] * myObj['Percentage'], utilities.priority_count())

    return render_template("index.html", list=mysqlcommands.get_all_items(), total=total, percentage=percentage, available=available)
    # return render_template("test.html", list=mysqlcommands.get_all_items(), total=total, percentage=percentage, available=available)


# Add an item to the database
@app.route("/add", methods=["POST"])
def add():

    name = request.form['name']
    priority = request.form['priority']
    price = request.form['price'].replace(",", "")
    money = request.form['money']

    isRight = mysqlcommands.add_item(name, priority, price, money)
    message = constants.ADD_ITEM_SUCCESS_MESSAGE if isRight else constants.ADD_ITEM_FAILURE_MESSAGE

    myObj = jsoncommands.getJSON("./money.json")

    utilities.money_allocation(mysqlcommands.get_all_items(), myObj['Total'] * myObj['Percentage'],
                               utilities.priority_count())

    return jsonify({
        "color" : isRight,
        "message" : message,
        "allItems" : mysqlcommands.get_all_items()
    })


# Remove an item from the database
@app.route("/delete", methods=['POST'])
def delete():

    id = request.form['id']

    isRight = mysqlcommands.delete_item(id)
    message = constants.DELETE_ITEM_SUCCESS_MESSAGE if isRight else constants.DELETE_ITEM_FAILURE_MESSAGE

    myObj = jsoncommands.getJSON("./money.json")

    utilities.money_allocation(mysqlcommands.get_all_items(), myObj['Total'] * myObj['Percentage'],
                               utilities.priority_count())

    return jsonify({
        "color" : isRight,
        "message" : message,
        "allItems" : mysqlcommands.get_all_items()
    })


# Get the item from the database -- OBSOLETE?
@app.route("/item", methods=['POST'])
def get():
    id = request.form['id']

    item = mysqlcommands.get_item(id)

    if len(item) == 0:
        return jsonify({
            "message" : "ID does not exist"
        })

    return jsonify({
        "item" : item,
    })


# Display the right item modal
@app.route("/modal/<id>", methods=['POST'])
def modal(id):
    return jsonify({
        "id" : id,
        "name" : mysqlcommands.get_item(id)[1]
    })


# Update the item
@app.route("/edit/<category>" , methods=['POST'])
def edit(category):

    id = request.form['id']
    newValue = request.form['value']

    myObj = jsoncommands.getJSON("./money.json")

    utilities.money_allocation(mysqlcommands.get_all_items(), myObj['Total'] * myObj['Percentage'],
                               utilities.priority_count())

    if category == "name":
        isRight = mysqlcommands.edit_item_name(id, newValue)
        message = constants.UPDATE_ITEM_NAME_SUCCESS_MESSAGE if isRight else constants.UPDATE_ITEM_NAME_FAILURE_MESSAGE
        return jsonify({
            "color" : isRight,
            "message" : message,
            "allItems": mysqlcommands.get_all_items()
        })
    elif category == "priority":
        isRight = mysqlcommands.edit_item_priority(id, newValue)
        message = constants.UPDATE_ITEM_PRIORITY_SUCCESS_MESSAGE if isRight else constants.UPDATE_ITEM_PRIORITY_FAILURE_MESSAGE
        return jsonify({
            "color" : isRight,
            "message" : message,
            "allItems": mysqlcommands.get_all_items()
        })
    elif category == "price":
        isRight = mysqlcommands.edit_item_price(id, newValue)
        message = constants.UPDATE_ITEM_PRICE_SUCCESS_MESSAGE if isRight else constants.UPDATE_ITEM_PRICE_FAILURE_MESSAGE
        return jsonify({
            "color" : isRight,
            "message" : message,
            "allItems": mysqlcommands.get_all_items()
        })
    # OBSOLETE?
    elif category == "money":
        return jsonify({
            "message" : mysqlcommands.edit_item_money(id, newValue),
            "allItems": mysqlcommands.get_all_items()
        })

    # Error Case (Need Fixing) -- OBSOLETE?
    return jsonify({
        "message" : "FAIL",
        "allItems": mysqlcommands.get_all_items()
    })


# Update the money information
@app.route("/update_money/<category>", methods=['POST'])
def update_money(category):

    newValue = request.form['value']

    if category == "total":
        isRight = jsoncommands.setJSON_total("./money.json", float(newValue))
        message = constants.UPDATE_PRICE_TOTAL_SUCCESS_MESSAGE if isRight else constants.UPDATE_PRICE_TOTAL_FAILURE_MESSAGE
    else:
        isRight = jsoncommands.setJSON_percentage("./money.json", float(newValue.replace(",", ""))/100)
        message = constants.UPDATE_PRICE_PERCENTAGE_SUCCESS_MESSAGE if isRight else constants.UPDATE_PRICE_PERCENTAGE_FAILURE_MESSAGE

    myObj = jsoncommands.getJSON("./money.json")
    total = "%.2f" % round(myObj['Total'], 2)
    percentage = "%d" % round(myObj['Percentage'] * 100, 2)
    available = "%.2f" % round(myObj['Total'] * myObj['Percentage'], 2)

    utilities.money_allocation(mysqlcommands.get_all_items(), myObj['Total'] * myObj['Percentage'],
                               utilities.priority_count())

    return jsonify({
        "color" : isRight,
        "message" : message,
        "budget" : available,
        "percentage" : percentage,
        "total" : total,
        "allItems": mysqlcommands.get_all_items()

    })


# REMOVE THIS WHEN PROJECT IS ALMOST DONE
@app.route("/test", methods=['POST'])
def test():
    return jsonify({
        "items" : mysqlcommands.get_all_items()
    })

if __name__ == "__main__":
    app.run(debug=True)