import _ from 'lodash';
import JSONFile from 'jsonfile';
import moment from 'moment';

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
				const data = JSONFile.readFileSync(db);

				JSONFile.writeFileSync(db, {
					...data,
					users:
						_.map(data.users, user => {
							const { phone, deposits } = user;

							if (phone === phoneNumber) {
								return {
									...user,
									deposits: _.concat(deposits || [], [
										{ amount: val, date: moment().format('DD/MM/YY') }
									])
								};
							}

							return user;
						}) || [],
					[`${phoneNumber}`]: {}
				});

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
