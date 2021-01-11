import nodemailer from 'nodemailer';

export default async (name, recipientEmailAddress, link, isSelfDestructChecked) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_SENDER_ADDRESS,
            pass: process.env.EMAILER_SENDER_PASSWORD
        }
    });

    const selfDestructionMessage = isSelfDestructChecked ? 'This message will self-destruct 15 minutes from when it was delivered.' : '';

    const mailOptions = {
        from: process.env.EMAIL_SENDER_ADDRESS,
        to: recipientEmailAddress,
        subject: 'Your secret message',
        text: `You have received a secret message from ${name}. You may view your message here: ${link}. ${selfDestructionMessage}`,
        html: `<p>You have received a secret message from ${name}.</p><p>You may view your message <a href=${link} target="blank">here</a>.</p><p>${selfDestructionMessage}</p>`
    };

    transporter.sendMail(mailOptions, (error) => {
        if (error) {
            return error;
        }

        return;
    });
};
