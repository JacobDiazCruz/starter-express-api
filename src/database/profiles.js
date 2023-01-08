import makeDb from "./index.js"

/**
 * @author Jacob
 * @description Find list from profiles collection
 * @status done
 */
let db = await makeDb()

export default
  async function listProfileQuery() {
  // const db = await database
  const query = {}
  const result = await db.collection("profiles").find(query).toArray()
  return result
}

/**
 * @author Jacob
 * @description Delete profile by id
 * @status done
 */
async function removeProfileQuery({ profileId }) {
  // const db = await database
  const result = await db.collection("profiles").deleteOne({ _id: new db.makeId(profileId) })
  return result
}

/**
 * @author Jacob
 * @status done
 */
async function getProfileQuery({ profileId }) {
  // const db = await database
  const result = await db.collection("profiles").findOne({ _id: db.makeId(profileId) })
  return result
}

async function getProfileByUserQuery(userId) {
  // const db = await database
  const result = await db.collection("profiles").findOne({ userId: db.makeId(userId) })
  return result
}

/**
 * @author Jacob
 * @status done
 */
async function saveProfile({ profileId, ...profile }) {
  // const db = await database
  if (profileId) {
    profile._id = db.makeId(profileId)
  }
  const result = await db.collection("profiles").insertOne(profile)

  return {
    success: result.acknowledged ? true : false,
    insertedId: result.insertedId,
  }
}

/**
* @author Jacob
* @status done
*/
async function updateProfileImageQuery({ profileId, file }) {
  // const db = await database
  const result = await db
    .collection('profiles')
    .updateOne(
      { _id: db.makeId(profileId) },
      { $set: { "profileImage": file } }
    )
  return result
}

/**
 * @author Jacob
 * @status done
 */
async function updateProfileQuery(profileId, profile) {
  // const db = await database
  const result = await db.collection("profiles").updateOne({
    _id: db.makeId(profileId)
  }, { $set: profile }
  )
  return result
}

export {
  saveProfile,
  updateProfileQuery,
  listProfileQuery,
  getProfileQuery,
  getProfileByUserQuery,
  updateProfileImageQuery,
  removeProfileQuery,
}
