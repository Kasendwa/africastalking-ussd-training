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
				args: { phoneNumber }
			} = menu;

			menu.con(
				_.includes(['1', '0'], `${val}`)
					? `Deposit Money \nEnter the amount to deposit:`
					: `Wrong input. Try again.`
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

			if (val < limits.min) {
				menu.go('dashboard.deposit.lowAmount');
			} else if (val > limits.max) {
				menu.go('dashboard.deposit.highAmount');
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

	menu.state('dashboard.deposit.lowAmount', {
		run: () => {
			const { val } = menu;

			menu.con(`UGX ${val} is too low. Minimum acceptable amount is UGX ${limits.min}`);
		},
		next: {
			'*\\d+': 'dashboard.deposit.instructions'
		},
		defaultNext: 'invalidOption'
	});

	menu.state('dashboard.deposit.highAmount', {
		run: () => {
			const { val } = menu;

			menu.con(`UGX ${val} is too high. Maximum acceptable amount is UGX ${limits.max}`);
		},
		next: {
			'*\\d+': 'dashboard.deposit.instructions'
		},
		defaultNext: 'invalidOption'
	});

	return menu;
};
