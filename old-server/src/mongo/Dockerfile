# Pull the mongoDB image
FROM mongo:4.1.7
# Setup the env variable
ENV MONGO_INITDB_DATABSE emendare
# Copy the init.js script to create a default database named emendare
COPY ./mongo-init.js /docker-entrypoint-initdb.d/

