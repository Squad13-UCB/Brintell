from psycopg2 import connect
from os import getenv

def get_db_connection():
	conn = connect(
		host = getenv('POSTGRES_HOST'),
		database = getenv('POSTGRES_DB'),
		user = getenv('POSTGRES_USER'),
		password = getenv('POSTGRES_PASSWORD'),
		port = getenv('POSTGRES_PORT'),
	)
	return conn
