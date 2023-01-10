import makeDb from "./index.js"

let db = await makeDb();

async function saveAuditLogQuery(payload) {
  const result = await db.collection("audit_log").insertOne(payload);
  return {
    success: result.acknowledged ? true : false,
    insertedId: result.insertedId,
  };
};

async function updateAuditLogQuery({ userId, payload }) {
  const result = await db.collection("audit_log").updateOne({
    userId: db.makeId(userId)
  }, { [payload.field === "feedback_msg" ? "$push" : "$inc"]: {
    [payload.field]: payload.field === "feedback_msg" ? payload.message : 1
  }});
  return result;
};

export {
  saveAuditLogQuery,
  updateAuditLogQuery
};