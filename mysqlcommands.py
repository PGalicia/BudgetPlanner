import pymysql

# Get All Item Objects
def get_all_items():

    connection = pymysql.connect(
        host='localhost',
        user='root',
        password='',
        db='budget',
    )

    try:
        with connection.cursor() as cursor:
            sql = "SELECT * FROM budget.item;"
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


# Get Item Object
def get_item(id):

    connection = pymysql.connect(
        host='localhost',
        user='root',
        password='',
        db='budget',
    )

    try:
        with connection.cursor() as cursor:
            sql = "SELECT * FROM budget.item WHERE id = %s;"
            try:
                cursor.execute(sql, (id,))
                result = cursor.fetchone()

                if result is None:
                    result = ()

            # TASK: From current tests this code is unreachable, possibly just delete it
            except:
                print("Oops! Something wrong")

        connection.commit()
    finally:
        connection.close()

        # TASK: Ensure that the item is formatted correctly - This prevent inconsistency
        return result


# Add Item Object
def add_item(name, priority, price, money=0.00):

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
                return "Data was not be able to add"

        connection.commit()

    finally:
        connection.close()
        return "Data successfully added"


# Remove Item Object
def delete_item(id):

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
                return "Item was not successfully deleted"

        connection.commit()

    finally:
        connection.close()
        return "Item successfully deleted"


# Edit Item Object
def edit_item_name(id, name):
    connection = pymysql.connect(
        host='localhost',
        user='root',
        password='',
        db='budget',
    )

    try:
        with connection.cursor() as cursor:
            sql = "UPDATE item SET name = %s WHERE id = %s;"
            try:
                cursor.execute(sql, (name, id))
            except:
                return "Name was not successfully changed"

        connection.commit()

    finally:
        connection.close()
        return "Name was successfully changed"


def edit_item_priority(id, priority):
    connection = pymysql.connect(
        host='localhost',
        user='root',
        password='',
        db='budget',
    )

    try:
        with connection.cursor() as cursor:
            sql = "UPDATE item SET priority = %s WHERE id = %s;"
            try:
                cursor.execute(sql, (priority, id))
            except:
                return "Priority was not successfully updated"

        connection.commit()

    finally:
        connection.close()
        return "Priority was successfully changed"


def edit_item_price(id, price):
    connection = pymysql.connect(
        host='localhost',
        user='root',
        password='',
        db='budget',
    )

    try:
        with connection.cursor() as cursor:
            sql = "UPDATE item SET price = %s WHERE id = %s;"
            try:
                cursor.execute(sql, (price, id))
            except:
                return "Price was not successfully updated"

        connection.commit()

    finally:
        connection.close()
        return "Price was successfully changed"


def edit_item_money(id, money):
    connection = pymysql.connect(
        host='localhost',
        user='root',
        password='',
        db='budget',
    )

    try:
        with connection.cursor() as cursor:
            sql = "UPDATE item SET allocated_money = %s WHERE id = %s;"
            try:
                cursor.execute(sql, (money, id))
            except:
                return "Money was not successfully updated"

        connection.commit()

    finally:
        connection.close()
        return "Money was successfully changed"
