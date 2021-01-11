import React from 'react';

export const FormHeader = ({children}) =>
    <span
        className={'block text-2xl sm:text-3xl mb-4'}
    >
        {children}
    </span>;

export const FormSubHeader = ({children}) =>
    <span
        className={'block self-left text-md'}
    >
        {children}
    </span>;
