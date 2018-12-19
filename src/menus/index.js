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
				users:
					_.map(data.users, user => {
						const { phone } = user;

						if (phone === phoneNumber) {
							return {
								..._.pick(
									user,
									_.remove(_.keys(user), key => key !== 'authenticated')
								),
								page: 0
							};
						}

						return user;
					}) || [],
				[`${phoneNumber}`]: {}
			});

			const registerInstructions = `Welcome to mSACCO \nEnter your first name to register:`;

			if (typeof data.users !== 'undefined') {
				const user = _.find(data.users, ({ phone }) => phone === phoneNumber);

				if (typeof user !== 'undefined') {
					menu.con(
						`Welcome back, ${user.first_name}! \nEnter your 4-digit PIN to continue:`
					);
				} else {
					menu.con(registerInstructions);
				}
			} else {
				menu.con(registerInstructions);
			}
		},
		next: {
			'*\\d{4}': 'dashboard',
			'*\\w+': 'register'
		}
	});

	menu.state('invalidOption', {
		run: () => {
			menu.end(`Invalid option`);
		}
	});

	_.over([login, register, dashboard])(menu);

	return menu;
};
