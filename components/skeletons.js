import React from 'react';

const pulse = {
    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
};

const Skeletons = () =>
    <div className={'flex flex-col w-full sm:w-1/2 p-8'}>
        <div
            className={'bg-gray-800 w-3/4 h-5 mb-3'}
            style={pulse}
        />
        <div
            className={'bg-gray-800 w-full h-5 mb-3'}
            style={pulse}
        />
        <div
            className={'bg-gray-800 w-5/6 h-5'}
            style={pulse}
        />
    </div>;

export default Skeletons;
