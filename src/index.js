import express from 'express';

import { SERVER } from './config';
import routes from './routes';

const { host, port } = SERVER;
const app = express();

app.use('/', routes(app));

app.listen(port, host, () => {
	console.log(`USSD successfully started at: ${host}:${port}`);
});
