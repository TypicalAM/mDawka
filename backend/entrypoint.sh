#!/bin/bash

echo "Waiting for mongo... at $DB_HOST:$DB_PORT"
while ! nc -z $DB_HOST $DB_PORT; do
	sleep 0.1
done
echo "MongoDB started"

exec "$@"
