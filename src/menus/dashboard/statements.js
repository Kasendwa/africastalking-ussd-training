import _ from 'lodash';
import JSONFile from 'jsonfile';

const db = `./sessions/db.json`;

export default menu => {
	menu.state('dashboard.statements', {
		run: () => {
			const {
				val,
				args: { phoneNumber }
			} = menu;
			const data = JSONFile.readFileSync(db);

			const user = _.find(data.users, ({ phone }) => phone === phoneNumber);
			const { deposits } = user;

			let history = '';

			_.forEach(deposits || [], ({ date, amount }) => {
				history = `${history}\n${date}: ${amount}`;
			});

			menu.con(`Statement \n${history} \n0. Back \n00. Next`);
		},
		next: {
			'0': 'dashboard'
		},
		defaultNext: 'invalidOption'
	});

	return menu;
};
