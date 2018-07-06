import pymysql

# Get All Item Objects
def get_items():

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

            except:
                print("Oops! Something wrong")

        connection.commit()
    finally:
        connection.close()

        # Ensure that the item is formatted correctly - This prevent inconsistency
        return result
#
# # Get Item Object
# # Add Item Object
# # Edit Item Object