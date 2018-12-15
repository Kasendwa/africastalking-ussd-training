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

			const data = JSONFile.readFileSync(db);

			JSONFile.writeFileSync(db, {
				...data,
				[`${phoneNumber}`]: {
					...data[`${phoneNumber}`],
					last_name: val
				}
			});

			const { first_name } = data[`${phoneNumber}`];

			menu.con(`Hi ${first_name}! \nEnter your preferred PIN:`);
		},
		next: {
			'*\\d{4}': 'dashboard'
		},
		defaultNext: 'login.invalidPIN'
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
