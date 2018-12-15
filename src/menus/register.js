import _ from 'lodash';
import JSONFile from 'jsonfile';

export default menu => {
	menu.state('register', {
		run: () => {
			menu.con(`Enter your last name:`);
		}
	});

	return menu;
};
