// import libs
import express from 'express';
import multer from 'multer';

// Auth controllers
import {
	registerController,
	checkTokenController,
	logoutController,
	loginGoogleController,
	refreshTokenController,
	loginGithubController,
	updateUserController,
} from '../controllers/users/index.js';

import { 
  updateAuditLog
} from '../controllers/audit-log/index.js';

// express callback
import makeExpressCallback from '../express-callback/index.js';
import path from 'path';

const router = express.Router();
const app = express();

// multer configuration
// @upload -> ./assets
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'assets');
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname + path.extname(file.originalname));
	},
});
const upload = multer({ storage: storage });

// for API checking purposes
router.get('/check-version', (req, res) => {
	// yy.mm.dd.x time the dev pushed
	res.send('You are accessing OneGuru API Version 22.12.01.0');
});

// USERS routes
router.post('/users/v1/register', makeExpressCallback(registerController));
router.post(
	'/users/v1/google/login',
	makeExpressCallback(loginGoogleController)
);
router.post(
	'/users/v1/github/login',
	makeExpressCallback(loginGithubController)
);
router.post('/users/v1/logout', makeExpressCallback(logoutController));
router.get('/users/v1/check-token', makeExpressCallback(checkTokenController));
router.post('/users/v1/refresh-token', refreshTokenController);
router.put('/users/v1/update-user/:id', makeExpressCallback(updateUserController));

// AUDIT LOG routes
router.patch('/v1/audit-log', makeExpressCallback(updateAuditLog));

export { router };