import _ from 'lodash';
import JSONFile from 'jsonfile';

const db = `./sessions/db.json`;

export default menu => {
	menu.state('register', {
		run: () => {
			const {
				val,
				args: { phoneNumber }
			} = menu;

			const data = JSONFile.readFileSync(db);

			JSONFile.writeFileSync(db, {
				...data,
				[`${phoneNumber}`]: {
					first_name: val
				}
			});

			menu.con(`Enter your last name:`);
		},
		next: {
			'*\\w+': 'register.pin'
		}
	});

	menu.state('register.pin', {
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

			menu.con(`Hi ${first_name}! \nEnter your preferred 4-digit PIN:`);
		},
		next: {
			'*\\d{4}': 'register.pin.confirm'
		},
		defaultNext: 'register.pin.invalidPIN'
	});

	menu.state('register.pin.invalidPIN', {
		run: () => {
			menu.con(`Invalid PIN provided. Try again.`);
		},
		next: {
			'*\\d{4}': 'register.pin.confirm'
		},
		defaultNext: 'register.pin.invalidPIN'
	});

	menu.state('register.pin.confirm', {
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
					pin: val
				}
			});

			const { first_name } = data[`${phoneNumber}`];

			menu.con(`Hi ${first_name}! \nEnter your preferred 4-digit PIN again:`);
		},
		next: {
			'*\\d{4}': 'dashboard'
		},
		defaultNext: 'register.pin.invalidPIN'
	});

	return menu;
};
