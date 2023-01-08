import mongodb from 'mongodb'
import dotenv from 'dotenv'

dotenv.config()
const MongoClient = mongodb.MongoClient
const url = 'mongodb+srv://jacob_cruz_mainPlatform:MentogroundApp@mernstack-nwob6.gcp.mongodb.net/test?retryWrites=true&w=majority'
const dbName = 'test'
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true })

export default async function database() {
  console.log('db is connected.')
  // if (!client.isConnected()) {
  await client.connect()
  // }
  const db = client.db(dbName)
  db.makeId = makeIdFromString
  return db
}

function makeIdFromString(id) {
  return new mongodb.ObjectID(id)
}