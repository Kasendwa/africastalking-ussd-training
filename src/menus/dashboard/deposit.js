import _ from 'lodash';
import JSONFile from 'jsonfile';

const db = `./sessions/db.json`;
const limits = {
	min: 500,
	max: 3000000
};

export default menu => {
	menu.state('dashboard.deposit', {
		run: () => {
			const {
				val,
				args: { phoneNumber, text }
			} = menu;
			const { min, max } = limits;

			menu.con(
				_.includes(['1', '0'], `${val}`)
					? `Deposit Money \nEnter the amount to deposit:`
					: `Invalid amount provided. Enter an amount between UGX ${min} and ${max}. \nTry again.`
			);
		},
		next: {
			'*\\d+': 'dashboard.deposit.instructions'
		},
		defaultNext: 'dashboard.deposit'
	});

	menu.state('dashboard.deposit.instructions', {
		run: () => {
			let {
				val,
				args: { phoneNumber }
			} = menu;

			val = parseFloat(val);

			if (!(val >= limits.min && val <= limits.max)) {
				menu.go('dashboard.deposit');
			} else {
				/* Implement actual deposit logic */

				menu.con(`You have successfully deposited UGX ${val}. \n0. Back`);
			}
		},
		next: {
			'0': 'dashboard'
		},
		defaultNext: 'invalidOption'
	});

	return menu;
};
