import makeDb from "./index.js"

let db = await makeDb();

async function savePathsQuery(data) {
  const result = await db.collection("paths").insertOne(data);
  return {
    success: result.acknowledged ? true : false,
    insertedId: result.insertedId,
  };
};

async function listPathsQuery({ userId }) {
  const result = await db.collection("paths").findOne({ userId: db.makeId(userId) })
  return result
};

async function updatePathContentQuery({ userId, pathId, totalResult, contents }) {
  const result = await db
    .collection('paths')
    .findOneAndUpdate(
      { userId: db.makeId(userId), "paths.id": pathId },
      { 
        $set: {
          "paths.$.totalResult": totalResult,
          "paths.$.dateFinished": Date.now(),
          "paths.$.contents": contents
        }
      }
    )
  return result;
};

export {
  savePathsQuery,
  listPathsQuery,
  updatePathContentQuery
  // updateAuditLogQuery
};