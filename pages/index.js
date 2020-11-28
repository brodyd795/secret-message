import React, {useState} from 'react';
import fetch from 'isomorphic-unfetch';

import Page from '../components/page';
import Footer from '../components/footer';
import Header from '../components/header';

const styles = {
    wrapper: {
        flex: 1
    }
    /*
     * formElement: {
     *     display: 'block'
     * }
     */
};

const Home = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isSelfDestructChecked, setIsSelfDestructChecked] = useState(true);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSave = async (e) => {
        e.preventDefault();

        const result = await fetch('/api/controllers', {
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

        const json = await result.json();

        if (result.status === 200) {
            setSuccessMessage('Success!');
        } else {
            setSuccessMessage('FAIL');
        }
    };

    return (
        <Page title={'Message'}>
            <Header />
            <div style={styles.wrapper}>
                <div>
                    <p>{successMessage}</p>
                </div>
                <form>
                    <div className={'flex flex-col justify-center'}>
                        <input
                            id={'email'}
                            type={'email'}
                            value={email}
                            ariaLabel={'email'}
                            placeholder={'Enter recipient email address'}
                            onChange={handleEmailChange}
                            style={styles.formElement}
                            className={'mx-4 my-2 p-1 rounded'}
                        />
                        <textarea
                            id={'message'}
                            type={'text'}
                            value={message}
                            ariaLabel={'message'}
                            placeholder={'Enter secret message'}
                            onChange={handleMessageChange}
                            style={styles.formElement}
                            className={'mx-4 my-2 p-1 rounded'}
                        />
                      
                        {/* <div className="flex items-center justify-center w-full mb-24">
                            <label
                                htmlFor="shouldSelfDestruct"
                                className="flex items-center cursor-pointer"
                            >
                                <div className="relative">
                                    <span>15min</span>
                                    <input
                                        id="shouldSelfDestruct"
                                        type="checkbox"
                                        className="hidden"
                                        checked={isSelfDestructChecked}
                                        onChange={() => setIsSelfDestructChecked(!isSelfDestructChecked)}
                                    />
                                    <div
                                        className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"
                                    />
                                    <div
                                        className="absolute w-6 h-6 bg-white rounded-full shadow inset-y-0 left-0"
                                        style={{
                                            top: '-.25rem',
                                            left: '-.25rem',
                                            transition: 'all 0.3s ease-in-out',
                                            transform: isSelfDestructChecked ? 'translateX(100%)' : null,
                                            backgroundColor: isSelfDestructChecked ? '#48bb78' : null
                                        }}
                                    />
                                    <span>Never</span>
                                    <div>
                                        <span>Self destruct</span>
                                    </div>
                                </div>
                            </label>
                        </div> */}
                        <button
                            type={'submit'}
                            onClick={handleSave}
                        >
                            {'Save'}
                        </button>
                    </div>
                </form>
            </div>
            <Footer />
        </Page>
    );
};

export default Home;
