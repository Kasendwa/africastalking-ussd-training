import { Router } from 'express';
import bodyParser from 'body-parser';

import menu from '../menus';

const routes = app => {
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));

	const router = Router();

	app.post('/', (req, res) => {
		menu(req).run(req.body, ussdResult => {
			res.send(ussdResult);
		});
	});

	return router;
};

export default routes;
