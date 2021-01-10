const sendMessage = async (email, message, isSelfDestructChecked) => {
    const result = await fetch('/secret-message/api/controllers/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            message,
            isSelfDestructChecked
        })
    });

    return result.json();
};

export default sendMessage;
