from flask import Flask, render_template, request, jsonify
import mysqlcommands
import jsoncommands

app = Flask(__name__)


@app.route("/")
def index():
    myObj = jsoncommands.getJSON("./money.json")

    total = "%.2f" % round(myObj['Total'], 2)
    percentage = "%d" % round(myObj['Percentage'] * 100, 2)
    available = "%.2f" % round(myObj['Total'] * myObj['Percentage'], 2)

    return render_template("index.html", list=mysqlcommands.get_all_items(), total=total, percentage=percentage, available=available)
    # return render_template("test.html", list=mysqlcommands.get_all_items(), total=total, percentage=percentage, available=available)


# Add an item to the database
@app.route("/add", methods=["POST"])
def add():

    name = request.form['name']
    priority = request.form['priority']
    price = request.form['price']
    money = request.form['money'] # TASK: make sure that if it's empty then add a zero

    # Check if any of the data is valid
    # priority - check if it's an int and the length is just one
    # price - check that it's a float (maybe just use the way you enter money for the bank)
    # allocated_money - check that it's a float (maybe just use the way you enter money for the bank)

    return jsonify({
        "message" : mysqlcommands.add_item(name, priority, price, money),
        "allItems" : mysqlcommands.get_all_items()
    })


# Remove an item from the database
@app.route("/delete", methods=['POST'])
def delete():

    id = request.form['id']

    return jsonify({
        "message" : mysqlcommands.delete_item(id),
        "allItems" : mysqlcommands.get_all_items()
    })


# Get the item from the database
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

    # Check that the ID exists
    # Check if the newValue is valid

    if category == "name":
        return jsonify({
            "message" : mysqlcommands.edit_item_name(id, newValue),
            "allItems": mysqlcommands.get_all_items()
        })
    elif category == "priority":
        return jsonify({
            "message" : mysqlcommands.edit_item_priority(id, newValue),
            "allItems": mysqlcommands.get_all_items()
        })
    elif category == "price":
        return jsonify({
            "message" : mysqlcommands.edit_item_price(id, newValue),
            "allItems": mysqlcommands.get_all_items()
        })
    elif category == "money":
        return jsonify({
            "message" : mysqlcommands.edit_item_money(id, newValue),
            "allItems": mysqlcommands.get_all_items()
        })

    # Error Case (Need Fixing)
    return jsonify({
        "message" : "FAIL",
        "allItems": mysqlcommands.get_all_items()
    })


@app.route("/update_money/<category>", methods=['POST'])
def update_money(category):

    newValue = request.form['value']

    if category == "total":

        jsoncommands.setJSON_total("./money.json", float(newValue))
    else:
        jsoncommands.setJSON_percentage("./money.json", float(newValue)/100)

    myObj = jsoncommands.getJSON("./money.json")
    total = "%.2f" % round(myObj['Total'], 2)
    percentage = "%d" % round(myObj['Percentage'] * 100, 2)
    available = "%.2f" % round(myObj['Total'] * myObj['Percentage'], 2)

    return jsonify({
        "budget" : available,
        "percentage" : percentage,
        "total" : total

    })


@app.route("/test", methods=['POST'])
def test():
    return jsonify({
        "items" : mysqlcommands.get_all_items()
    })

if __name__ == "__main__":
    app.run(debug=True)