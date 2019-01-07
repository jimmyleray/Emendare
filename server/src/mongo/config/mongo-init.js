/**
 * This script is used to initialized the database during the setup of the project
 */
const conn = new Mongo()
const db = conn.getDB('emendare')
