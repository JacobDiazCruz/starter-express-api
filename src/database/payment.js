import makeDb from "./index.js"

let db = await makeDb();

async function savePaymentQuery(payload) {
  const result = await db.collection("payments").insertOne(payload);
  return {
    success: result.acknowledged ? true : false,
    insertedId: result.insertedId,
  };
};

async function getPaymentQuery({ userId }) {
  const result = await db.collection("payments").findOne({ userId })
  return result
}

export {
  savePaymentQuery,
  getPaymentQuery
};