require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/logs';
const client = new MongoClient(uri);
let _db = null;

async function connect() {
  if (_db) return _db;
  await client.connect();
  _db = client.db(); // jeśli URI zawiera nazwę bazy - użyje jej, inaczej domyślna
  return _db;
}

module.exports = { connect, client };
