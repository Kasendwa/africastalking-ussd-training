import UssdMenu from 'ussd-menu-builder';
import _ from 'lodash';
import JSONFile from 'jsonfile';

let menu = new UssdMenu();

export default () => {
	menu.startState({
		run: () => {
			const { phoneNumber } = menu.args;
			const filename = `./sessions/${phoneNumber}.json`;

			JSONFile.writeFileSync(filename, {});

			menu.end('Welcome here');
		},
		next: {}
	});

	return menu;
};
