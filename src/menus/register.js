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

			const { first_name } = data[`${phoneNumber}`];

			menu.con(`Hi ${first_name}! \nEnter your preferred PIN:`);
		}
	});

	return menu;
};
