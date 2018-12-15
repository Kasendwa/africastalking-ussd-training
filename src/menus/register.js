import _ from 'lodash';
import JSONFile from 'jsonfile';

export default menu => {
	menu.state('register', {
		run: () => {
			const {
				val,
				args: { phoneNumber }
			} = menu;

			const db = `./sessions/db.json`;
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
			menu.con(`Enter your preferred PIN:`);
		}
	});

	return menu;
};
