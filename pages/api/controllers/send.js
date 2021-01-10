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

        const link = `http://localhost:3000/view?id=${guid}&key=${key}&iv=${iv}&hmacKey=${hmacKey}`;

        await sendEmailService(email, link, isSelfDestructChecked);

        res.status(200).end();
    } catch (error) {
        console.log('error', error);
        res.status(500).end();
    }
};
