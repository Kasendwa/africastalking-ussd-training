import _ from 'lodash';
import JSONFile from 'jsonfile';

const db = `./sessions/db.json`;

export default menu => {
	menu.state('login', {
		run: () => {
			const {
				val,
				args: { phoneNumber }
			} = menu;

			const { users } = JSONFile.readFileSync(db);

			const user = _.find(
				users,
				({ phone, pin }) => phone === phoneNumber && `${pin}` === `${val}`
			);

			if (user) {
				menu.go('dashboard');
			} else {
				menu.go('login.invalidPIN');
			}
		}
	});

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
