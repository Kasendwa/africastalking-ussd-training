import _ from 'lodash';
import JSONFile from 'jsonfile';

const db = `./sessions/db.json`;

const dashboardInstructions = `Choose a service to proceed: \n1. Deposit money. \n2. Check savings. \n3. View statement`;

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

				if (`${user.pin}` === `${val}`) {
					menu.con(dashboardInstructions);
				} else {
					menu.end('Incorrect PIN.');
				}
			} else {
				if (`${user.pin}` === `${val}`) {
					JSONFile.writeFileSync(db, {
						...data,
						users: _.concat(data.users, [
							{ ...user, phone: phoneNumber }
						]),
						[`${phoneNumber}`]: {}
					});

					menu.con(dashboardInstructions);
				} else {
					menu.end(`PINs don't match`);
				}
			}
		}
	});

	return menu;
};
