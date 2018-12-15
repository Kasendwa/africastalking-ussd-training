import UssdMenu from 'ussd-menu-builder';
import _ from 'lodash';
import JSONFile from 'jsonfile';

let menu = new UssdMenu();

export default () => {
	menu.startState({
		run: () => {
			const { phoneNumber } = menu.args;
			const db = `./sessions/db.json`;
			const { users } = JSONFile.readFileSync(db);

			JSONFile.writeFileSync(db, {
				users: users || [],
				[`${phoneNumber}`]: {}
			});

			const registerInstructions = `Welcome to mSACCO
            \nEnter your first name to register:`;

			if (typeof users !== 'undefined') {
				const user = _.find(
					users,
					({ phone }) => phone === phoneNumber
				);

				if (typeof user !== 'undefined') {
					menu.con(`Welcome back, ${user.first_name}!
                        \nEnter your PIN to continue:`);
				} else {
					menu.con(registerInstructions);
				}
			} else {
				menu.con(registerInstructions);
			}
		},
		next: {}
	});

	return menu;
};
