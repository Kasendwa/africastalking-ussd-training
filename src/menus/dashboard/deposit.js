import _ from 'lodash';
import JSONFile from 'jsonfile';

const db = `./sessions/db.json`;

export default menu => {
	menu.state('dashboard.deposit', {
		run: () => {
			const {
				val,
				args: { phoneNumber }
			} = menu;

			menu.con('Make some deposits');
		}
	});

	return menu;
};
