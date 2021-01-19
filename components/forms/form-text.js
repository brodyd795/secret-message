import React from 'react';

export const FormHeader = ({children}) =>
    <span
        className={'block text-center text-2xl sm:text-3xl my-4'}
    >
        {children}
    </span>;

export const FormSubHeader = ({children}) =>
    <span
        className={'block text-md text-center mt-2'}
    >
        {children}
    </span>;
