import nodemailer from 'nodemailer';

export default async (recipientEmailAddress, link, isSelfDestructChecked) => {
    const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.EMAIL_SENDER_ADDRESS,
			pass: process.env.EMAILER_SENDER_PASSWORD,
		},
	});

	// TODO
	// const now = new Date();
	// const selfDestructTime = new Date(now.getTime() + 15*60000);
	const selfDestructionMessage = `This message will self-destruct 15 minutes from the delivery.`;

	const mailOptions = {
		from: process.env.EMAIL_SENDER_ADDRESS,
		to: recipientEmailAddress,
		subject: "Your secret message",
		text: `New message at ${link}. ${selfDestructionMessage}.`,
        html: `<p>New message <a href=${link} target="blank">here</a></p><p>${selfDestructionMessage}</p>`
    };
    
	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
            return error;
		}

        return;
    });
};


// import AWS from 'aws-sdk';

// AWS.config.update({region: 'us-east-2'});

// export default async (recipientEmailAddress, link) => {
//     const fromEmail = 'noreply@dingel.dev';

//     const params = {
//         Destination: {
//             ToAddresses: [recipientEmailAddress]
//         },
//         Message: {
//             Body: {
//                 Html: {
//                     Charset: "UTF-8",
//                     Data: `<>New message <a href=${link} target="blank">here</a></>`
//                 },
//                 Text: {
//                     Charset: "UTF-8",
//                     Data: `New message at ${link}`
//                 }
//             },
//             Subject: {
//                 Charset: 'UTF-8',
//                 Data: 'New Secret Message'
//             }
//         },
//         Source: fromEmail,
//         ReplyToAddresses: [
//             fromEmail,
//         ]
//     };

//     const data = await new AWS.SES({apiVersion: '2010-12-01'}).sendEmail(params).promise();

//     return data;
// };
