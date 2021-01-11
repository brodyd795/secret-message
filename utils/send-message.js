const sendMessage = async (name, email, message, isSelfDestructChecked) =>
    fetch('/secret-message/api/controllers/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            email,
            message,
            isSelfDestructChecked
        })
    });

export default sendMessage;
