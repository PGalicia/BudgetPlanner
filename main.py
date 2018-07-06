from flask import Flask, render_template, request, jsonify
import mysqlcommands
import pymysql

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html", list=mysqlcommands.get_items())


# Add an item to the database
@app.route("/add", methods=["POST"])
def add():

    name = request.form['name']
    priority = request.form['priority']
    price = request.form['price']
    money = request.form['money']

    # Check if any of the data is valid
    # priority - check if it's an int and the length is just one
    # price - check that it's a float (maybe just use the way you enter money for the bank)
    # allocated_money - check that it's a float (maybe just use the way you enter money for the bank)

    connection = pymysql.connect(
        host='localhost',
        user='root',
        password='',
        db='budget',
    )

    try:
        with connection.cursor() as cursor:
            sql = "INSERT INTO item (name, priority, price, allocated_money) VALUES (%s, %s, %s, %s)"
            try:
                cursor.execute(sql, (name, priority, price, money))

            except:
                return jsonify({"message": "Data was not be able to add"})

        connection.commit()
        allItems = mysqlcommands.get_items()

    finally:
        connection.close()
        return jsonify({
            "message" : "Data successfully added",
            "allItems" : allItems
        })


# Remove an item from the database
@app.route("/delete", methods=['POST'])
def delete():

    id = request.form['id']

    # Check if the ID exists

    connection = pymysql.connect(
        host='localhost',
        user='root',
        password='',
        db='budget',
    )

    try:
        with connection.cursor() as cursor:
            sql = "DELETE FROM budget.item WHERE id = %s"
            try:
                cursor.execute(sql, (id,))
            except:
                return jsonify({"message": "Item was not successfully deleted"})

        connection.commit()
        allItems = mysqlcommands.get_items()
    finally:
        connection.close()
        return jsonify({
            "message": "Item successfully deleted",
            "allItems": allItems
        })


if __name__ == "__main__":
    app.run(debug=True)