import UssdMenu from 'ussd-menu-builder';
import _ from 'lodash';
import JSONFile from 'jsonfile';

import login from './login';
import register from './register';
import dashboard from './dashboard';

let menu = new UssdMenu();

const db = `./sessions/db.json`;

export default () => {
	menu.startState({
		run: () => {
			const { phoneNumber } = menu.args;

			const data = JSONFile.readFileSync(db);

			JSONFile.writeFileSync(db, {
				...data,
				users: data.users || [],
				[`${phoneNumber}`]: {}
			});

			const registerInstructions = `Welcome to mSACCO \nEnter your first name to register:`;

			if (typeof users !== 'undefined') {
				const user = _.find(
					users,
					({ phone }) => phone === phoneNumber
				);

				if (typeof user !== 'undefined') {
					menu.con(
						`Welcome back, ${
							user.first_name
						}! \nEnter your PIN to continue:`
					);
				} else {
					menu.con(registerInstructions);
				}
			} else {
				menu.con(registerInstructions);
			}
		},
		next: {
			'*\\d{4}': 'login',
			'*\\w+': 'register'
		}
	});

	_.over([login, register, dashboard])(menu);

	return menu;
};
