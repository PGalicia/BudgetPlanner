import pymysql

DB_LOCALHOST = 'localhost'
DB_USER = 'root'
DB_PASSWORD = ''
DB_NAME = 'budget'


def dbconfig():
    return pymysql.connect(
        host=DB_LOCALHOST,
        user=DB_USER,
        password=DB_PASSWORD,
        db=DB_NAME,
    )