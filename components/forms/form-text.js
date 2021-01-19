import React from 'react';

export const FormHeader = ({children}) =>
    <span
        className={'block text-center text-2xl sm:text-3xl my-8'}
    >
        {children}
    </span>;

export const FormSubHeader = ({children}) =>
    <span
        className={'block text-md text-center mt-2'}
    >
        {children}
    </span>;

export const MessageSubHeader = ({children, isWarning}) =>
    <span
        className={`block text-md my-2 mx-4 ${isWarning ? 'text-red-400' : null}`}
    >
        {children}
    </span>;
