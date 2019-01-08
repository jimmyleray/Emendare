# Pull the mongoDB image
FROM mongo:4.0.5
# Setup the env variable
ENV MONGO_INITDB_DATABSE emendare
# Copy the init.js script to create a default database named emendare
COPY ./config/mongo-init.js /docker-entrypoint-initdb.d/

