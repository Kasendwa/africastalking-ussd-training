import _ from 'lodash';
import JSONFile from 'jsonfile';

import deposit from './deposit';

const db = `./sessions/db.json`;

const dashboardInstructions = `Choose a service to proceed: \n1. Deposit money \n2. Check savings \n3. View statement`;

export default menu => {
	menu.state('dashboard', {
		run: () => {
			const {
				val,
				args: { phoneNumber }
			} = menu;

			const data = JSONFile.readFileSync(db);
			let user = data[`${phoneNumber}`];

			if (_.isEqual(user, {})) {
				user = _.find(data.users, ({ phone }) => phone === phoneNumber);

				const { authenticated } = user;

				if (typeof authenticated !== 'undefined') {
					menu.con(dashboardInstructions);
				} else if (`${user.pin}` === `${val}`) {
					JSONFile.writeFileSync(db, {
						...data,
						users: _.map(data.users, user => {
							const { phone } = user;

							if (phone === phoneNumber) {
								return { ...user, authenticated: true };
							}

							return user;
						})
					});

					menu.con(dashboardInstructions);
				} else {
					menu.go('login.invalidPIN');
				}
			} else {
				if (`${user.pin}` === `${val}`) {
					JSONFile.writeFileSync(db, {
						...data,
						users: _.concat(data.users, [{ ...user, phone: phoneNumber }]),
						[`${phoneNumber}`]: {}
					});

					menu.con(dashboardInstructions);
				} else {
					menu.end(`PINs don't match`);
				}
			}
		},
		next: {
			'1': 'dashboard.deposit'
		}
	});

	_.over([deposit])(menu);

	return menu;
};
