import _ from 'lodash';
import JSONFile from 'jsonfile';

const db = `./sessions/db.json`;

export default menu => {
	menu.state('dashboard.deposit', {
		run: () => {
			const {
				val,
				args: { phoneNumber, text }
			} = menu;

			menu.con(
				_.includes(['1', '0'], `${val}`)
					? `Deposit Money \nEnter the amount to deposit:`
					: `Invalid amount provided. Enter an amount between UGX 500 and 3,000,000. \nTry again.`
			);
		},
		next: {
			'*\\([5-8][0-9]{2}|9[0-8][0-9]|99[0-9]|[1-8][0-9]{3}|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-9]|[1-8][0-9]{4}|9[0-8][0-9]{3}|99[0-8][0-9]{2}|999[0-8][0-9]|9999[0-9]|[1-8][0-9]{5}|9[0-8][0-9]{4}|99[0-8][0-9]{3}|999[0-8][0-9]{2}|9999[0-8][0-9]|99999[0-9]|[12][0-9]{6}|3000000)':
				'dashboard.deposit.instructions'
		},
		defaultNext: 'dashboard.deposit'
	});

	menu.state('dashboard.deposit.instructions', {
		run: () => {
			let {
				val,
				args: { phoneNumber }
			} = menu;

			menu.con(`You have successfully deposited UGX ${val}. \n0. Back`);
		},
		next: {
			'0': 'dashboard'
		},
		defaultNext: 'invalidOption'
	});

	return menu;
};
