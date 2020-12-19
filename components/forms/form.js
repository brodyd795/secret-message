import React from 'react';

const Form = ({children}) =>
    <form className={'flex flex-col w-full h-60'}>
        {children}
    </form>;

export default Form;
