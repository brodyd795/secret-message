import AWS from 'aws-sdk';

AWS.config.update({region: 'us-east-2'});

export default async (recipientEmailAddress, link) => {
    const fromEmail = 'noreply@dingel.dev';

    const params = {
        Destination: {
            ToAddresses: [recipientEmailAddress]
        },
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: `<p>New message <a href=${link} target="blank">here</a></p>`
                },
                Text: {
                    Charset: "UTF-8",
                    Data: `New message at ${link}`
                }
            },
            Subject: {
                Charset: 'UTF-8',
                Data: 'New Secret Message'
            }
        },
        Source: fromEmail,
        ReplyToAddresses: [
            fromEmail,
        ]
    };

    const data = await new AWS.SES({apiVersion: '2010-12-01'}).sendEmail(params).promise();

    console.log('data.MessageId', data.MessageId);

    return data;
};
