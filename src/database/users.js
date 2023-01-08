import makeDb from './index.js';
const database = makeDb();
/**
 * @author Jacob
 * @description Find data from auth collection
 * @status done
 */
async function getUsersList() {
	const db = await database;
	const query = {};
	const result = await db.collection('auth').find(query).toArray();
	return result;
}

/**
 * @author Jacob
 * @status done
 */
async function getUserQuery({ userId }) {
	const db = await database;
	return await db.collection('auth').findOne({ _id: db.makeId(userId) });
}

/**
 * @author Jacob
 * @description find auth entity by emailAddress
 * @param - email
 * @returns - auth entity if found
 */
async function getUserByEmailQuery(email) {
	const db = await database;
	return await db.collection('auth').findOne({
		email: email,
	});
}

/**
 * @author Jacob
 * @description insert auth entity, if not existing
 * @description update auth entity, if existing
 * @param - email, hashedPassword, auditLog
 * @returns - auth entity
 */
async function saveUser(auth) {
	const db = await database;
	const role = await db.collection('role').findOne({ name: 'user' });
	let userExist;
	if (auth._id) {
		userExist = await db
			.collection('auth')
			.findOne({ _id: db.makeId(auth._id) });
	}

	let result;
	if (!userExist) {
		result = await db
			.collection('auth')
			.insertOne({ role: role.name, ...auth });
	} else {
		result = {
			acknowledged: true,
			insertedId: userExist._id,
		};
	}
	return {
		success: result.acknowledged ? true : false,
		insertedId: result.insertedId,
	};
}

/**
 * @author Jacob
 * @description insert profile_id to user
 */
async function insertUserProfile({ ...requestData }) {
	const db = await database;
	const result = await db
		.collection('auth')
		.updateOne(
			{ _id: new db.makeId(requestData.userId) },
			{ $set: { profileId: requestData.profileId } }
		);
	return result;
}

/**
 * @author Jacob
 * @status done
 */
async function storeTokenQuery({ ...data }) {
	const db = await database;
	const result = await db.collection('access_tokens').insertOne({
		userId: db.makeId(data.userId),
		...data,
	});

	return {
		success: result.acknowledged ? true : false,
		insertedId: result.insertedId,
	};
}

/**
 * @author Jacob
 * @status done
 */
async function removeTokenQuery({ ...data }) {
	const db = await database;
	const result = await db.collection('access_tokens').deleteOne({
		userId: db.makeId(data.userId),
	});
	return result;
}

/**
 * @author Jacob
 * @status done
 */
async function getTokenQuery({ ...data }) {
	const db = await database;
	const result = await db.collection('access_tokens').findOne({
		userId: db.makeId(data.userId),
	});
	return result;
}

/**
 * @author Robb
 * @status done
 */
async function updateUserQuery(id, data) {
	const db = await database;
	return await db
		.collection('auth')
		.updateOne({ _id: db.makeId(id) }, { $set: data });
}

export {
	getUsersList,
	getUserQuery,
	getUserByEmailQuery,
	saveUser,
	getTokenQuery,
	removeTokenQuery,
	storeTokenQuery,
	insertUserProfile,
	updateUserQuery,
};
