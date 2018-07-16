from assets import DBCONFIG


def get_all_items() -> tuple:
    """ Access the server and return all items """
    connection = DBCONFIG.dbconfig()

    try:
        with connection.cursor() as cursor:
            sql = "SELECT * FROM item ORDER BY priority DESC, price;"
            cursor.execute(sql)
            result = cursor.fetchall()

        connection.commit()
    finally:
        connection.close()
        return result


def get_item(item_id) -> tuple:
    """ Return the item from the specified 'item_id' """
    connection = DBCONFIG.dbconfig()

    try:
        with connection.cursor() as cursor:
            sql = "SELECT * FROM budget.item WHERE id = %s;"
            cursor.execute(sql, (item_id,))
            result = cursor.fetchone()

            # Update 'result' to an empty list if the item does not exist
            if result is None:
                result = ()

        connection.commit()
    finally:
        connection.close()
        return result


def add_item(name, priority, price, money=0.00) -> bool:
    """
        Return TRUE if the item is successfully added or
        FALSE if not
    """
    connection = DBCONFIG.dbconfig()

    try:
        with connection.cursor() as cursor:
            sql = "INSERT INTO item (name, priority, price, allocated_money) VALUES (%s, %s, %s, %s)"
            try:
                cursor.execute(sql, (name, priority, price, money))

            except:
                return False

        connection.commit()

    finally:
        connection.close()
        return True


def delete_item(item_id) -> bool:
    """
        Return TRUE if the item is successfully deleted or
        FALSE if not
    """
    connection = DBCONFIG.dbconfig()

    try:
        with connection.cursor() as cursor:
            sql = "DELETE FROM budget.item WHERE id = %s"
            try:
                cursor.execute(sql, (item_id,))
            except:
                return False

        connection.commit()

    finally:
        connection.close()
        return True


def edit_item_name(item_id, name) -> bool:
    """
        Return TRUE if item name is successfully updated or
        FALSE if not
    """
    connection = DBCONFIG.dbconfig()

    try:
        with connection.cursor() as cursor:
            sql = "UPDATE item SET name = %s WHERE id = %s;"
            try:
                cursor.execute(sql, (name, item_id))
            except:
                return False

        connection.commit()

    finally:
        connection.close()
        return True


def edit_item_priority(item_id, priority) -> bool:
    """
        Return TRUE if item priority is successfully updated or
        FALSE if not
    """
    connection = DBCONFIG.dbconfig()

    try:
        with connection.cursor() as cursor:
            sql = "UPDATE item SET priority = %s WHERE id = %s;"
            try:
                cursor.execute(sql, (priority, item_id))
            except:
                return False

        connection.commit()

    finally:
        connection.close()
        return True


def edit_item_price(item_id, price) -> bool:
    """
        Return TRUE if item price is successfully updated or
        FALSE if not
    """
    connection = DBCONFIG.dbconfig()

    try:
        with connection.cursor() as cursor:
            sql = "UPDATE item SET price = %s WHERE id = %s;"
            try:
                cursor.execute(sql, (price, item_id))
            except:
                return False

        connection.commit()

    finally:
        connection.close()
        return True


def edit_item_money(item_id, money) -> bool:
    """
        Return TRUE if item money is successfully updated or
        FALSE if not
    """
    connection = DBCONFIG.dbconfig()

    try:
        with connection.cursor() as cursor:
            sql = "UPDATE item SET allocated_money = %s WHERE id = %s;"
            try:
                cursor.execute(sql, (money, item_id))
            except:
                return False

        connection.commit()

    finally:
        connection.close()
        return True


def priority_count() -> tuple:
    """ Return the list of priorities present and their quantity """
    connection = DBCONFIG.dbconfig()

    try:
        with connection.cursor() as cursor:
            sql = "SELECT priority, COUNT(*) FROM item GROUP BY priority ORDER BY priority DESC;"
            cursor.execute(sql)
            result = cursor.fetchall()

        connection.commit()
    finally:
        connection.close()
        return result