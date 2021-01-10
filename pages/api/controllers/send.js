import {validate as uuidValidate} from 'uuid';

import postMessageService from '../services/post-message-service';
import sendEmailService from '../services/send-email-service';

export default async (req, res) => {
    try {
        const {email, message, isSelfDestructChecked} = req.body;

        const {
            guid,
            key,
            iv,
            hmacKey
        } = await postMessageService({
            message,
            isSelfDestructChecked
        });

        if (uuidValidate(guid)) {
            const link = `http://localhost:3000/view?id=${guid}&key=${key}&iv=${iv}&hmacKey=${hmacKey}`;

            await sendEmailService(email, link, isSelfDestructChecked);

            res.status(200).json({message: 'Success'});
        } else {
            res.status(500).json({
                message: 'Something went wrong'
            });
        }
    } catch (error) {
	console.log('error', error);
        res.status(500).json({error});
    }
};
