import React from 'react';

const View = ({message}) => {

    return (
        <>
            <p>Secret message:</p>
            <p>{message}</p>
        </>
    )
};

View.getInitialProps = async (ctx) => {
    const {query} = ctx;
    const res = await fetch(`http://localhost:3000/api/controllers/view?id=${query.id}`);
    const json = await res.json();
    const message = json.message;

    return {
        message
    };
  }

export default View;
