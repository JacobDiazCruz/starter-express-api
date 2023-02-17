// import libs
import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import http from 'http';
import cors from 'cors';
import { router } from './src/routes/index.js';
import * as cloudinary from 'cloudinary';
// import cookieParser from 'cookie-parser';
// import cron from "node-cron";
// import axios from 'axios';

const app = express();
dotenv.config();

// Security headers
app.use(
	helmet({
		referrerPolicy: { policy: 'no-referrer' },
	})
);
app.use(cors({ origin: true, credentials: true }));
app.use(function (req, res, next) {
	// res.header('Access-Control-Allow-Origin', 'https://oneguru.io');
	res.header('Access-Control-Allow-Credentials', true);
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	next();
});


// cron job
// call every 5 mins to avoid wake up glitch server
// cron.schedule('*/4 * * * *', () => {
//   axios.get("/https://alive-bedecked-sedum.glitch.me/check-version");
// });


// middlewares
app.use((req, res, next) => {
	express.json()(req, res, next);
});
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/', router);

// cloudinary config
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.API_KEY,
	api_secret: process.env.API_SECRET,
});

const server = http.createServer(app);

// config port 4000
const port = process.env.PORT || 4000;

// run server port
server.listen(port, () => {
	console.log(`start at port ${port}`);
});

export default app;