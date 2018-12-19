import _ from 'lodash';
import JSONFile from 'jsonfile';

const db = `./sessions/db.json`;
const perPage = 3;

export default menu => {
	menu.state('dashboard.statements', {
		run: () => {
			const {
				val,
				args: { phoneNumber }
			} = menu;
			const data = JSONFile.readFileSync(db);

			const user = _.find(data.users, ({ phone }) => phone === phoneNumber);
			const { deposits, page } = user;

			const startIndex = page * perPage;

			let history = '';

			_.forEach(
				_.slice(deposits || [], startIndex, startIndex + perPage),
				({ date, amount }) => {
					history = `${history}\n${date}: UGX ${amount}`;
				}
			);

			JSONFile.writeFileSync(db, {
				...data,
				users: _.map(data.users, user => {
					const { phone } = user;

					if (phone === phoneNumber) {
						return { ...user, page: page + 1 };
					}

					return user;
				})
			});

			menu.con(`Statement ${history} \n0. Back \n00. Next`);
		},
		next: {
			'0': 'dashboard',
			'00': 'dashboard.statements'
		},
		defaultNext: 'invalidOption'
	});

	return menu;
};
