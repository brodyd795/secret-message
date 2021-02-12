import postMessageService from '../services/post-message-service';
import sendEmailService from '../services/send-email-service';

export default async (req, res) => {
    try {
        const {name, email, message, isSelfDestructChecked} = req.body;

        const {
            guid,
            key,
            iv,
            hmacKey
        } = await postMessageService({
            message,
            isSelfDestructChecked
        });

        const env = process.env.ENVIRONMENT;
        let basePath;

        if (env === 'local') {
            basePath = 'http://localhost:3000';
        } else if (env === 'dev') {
            basePath = 'https://dev.dingel.dev';
        } else {
            basePath = 'https://dingel.dev';
        }

        const link = `${basePath}/secret-message/view?id=${guid}&key=${key}&iv=${iv}&hmacKey=${hmacKey}`;

        await sendEmailService(name, email, link, isSelfDestructChecked);

        res.status(200).end();
    } catch (error) {
        res.status(500).end();
    }
};
