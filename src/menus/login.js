import _ from 'lodash';
import JSONFile from 'jsonfile';

const db = `./sessions/db.json`;

export default menu => {
	menu.state('login.invalidPIN', {
		run: () => {
			menu.con(`Invalid PIN provided. Try again.`);
		},
		next: {
			'*\\d{4}': 'dashboard'
		},
		defaultNext: 'login.invalidPIN'
	});

	return menu;
};
