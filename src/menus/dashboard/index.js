import _ from 'lodash';
import JSONFile from 'jsonfile';

export default menu => {
	menu.state('dashboard', {
		run: () => {
			menu.end(`Welcome to the dashboard.`);
		}
	});

	return menu;
};
