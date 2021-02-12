import React, {useState} from 'react';

const SendContext = React.createContext();

const useSend = () => {
    const context = React.useContext(SendContext);

    if (!context) {
        throw new Error('useSend must be used within a SendProvider');
    }

    return context;
};

const SendProvider = (props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isSelfDestructChecked, setIsSelfDestructChecked] = useState(true);
    const [step, setStep] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(true);
    const value = {
        name,
        setName,
        email,
        setEmail,
        message,
        setMessage,
        isSelfDestructChecked,
        setIsSelfDestructChecked,
        step,
        setStep,
        errorMessage,
        setErrorMessage,
        success,
        setSuccess,
        loading,
        setLoading
    };

    return (
        <SendContext.Provider
            value={value}
            {...props}
        />
    );
};

export {SendProvider, useSend};
