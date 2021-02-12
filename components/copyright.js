import React from 'react';

const Copyright = () => {
    const date = `2020 - ${new Date().getFullYear()}`;

    return (
        <p className={'inline-block'}>
            {`© Copyright ${date} Brody Dingel`}
        </p>
    );
};

export default Copyright;
