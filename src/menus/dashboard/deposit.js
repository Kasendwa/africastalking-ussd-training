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

			menu.con(`Deposit Money \nEnter the amount to deposit:`);
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
			const { min, max } = limits;
			val = parseFloat(val);

			if (val >= min && val <= max) {
				menu.con(`You have successfully deposited UGX ${val}. \n0. Back`);
			} else {
				menu.con(`Invalid amount provided. Enter an amount UGX ${min} and ${max}:`);
			}
		},
		next: {
			'0': 'dashboard',
			'*\\d+': 'dashboard.deposit.instructions'
		},
		defaultNext: 'invalidOption'
	});

	return menu;
};
