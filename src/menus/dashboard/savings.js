import _ from 'lodash';
import JSONFile from 'jsonfile';

const db = `./sessions/db.json`;

export default menu => {
	menu.state('dashboard.savings', {
		run: () => {
			const {
				val,
				args: { phoneNumber }
			} = menu;
			const data = JSONFile.readFileSync(db);

			JSONFile.writeFileSync(db, {
				...data,
				users: _.map(data.users, user => {
					const { phone } = user;

					if (phone === phoneNumber) {
						return { ...user, lastState: 'dashboard.savings' };
					}

					return user;
				})
			});

			const user = _.find(data.users, ({ phone }) => phone === phoneNumber);
			const { deposits } = user;

			let totalSavings = 0;

			_.forEach(deposits || [], ({ amount }) => {
				totalSavings += parseFloat(amount);
			});

			menu.con(`You have so far saved UGX ${totalSavings}. \n0. Back`);
		},
		next: {
			'0': 'dashboard'
		},
		defaultNext: 'invalidOption'
	});

	return menu;
};
