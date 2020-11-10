import { validate as uuidValidate } from 'uuid';

import postMessageService from '../services/post-message-service';
import sendEmailService from '../services/send-email-service';

export default async (req, res) => {
	try {
		const { email, message } = req.body;

		const guid = await postMessageService({
			email,
			message
		});

		if (uuidValidate(guid)) {
			console.log('guid', guid);
			const link = `https://secret-message.dingel.dev/view?id=${guid}`;
			console.log('link', link);

			// await sendEmailService(email, link);

			res.status(200).json({ message: 'Success' });
		} else {
			res.status(500).json({
				message: 'Something went wrong',
				response
			});
		}
	} catch (error) {
		res.status(500).json({ error });
	}
};
