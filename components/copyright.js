import React from 'react';
import styled from 'styled-components';

const StyledCopyright = styled.p`
    display: inline-block;
`;

const Copyright = () => {
    const toDate = new Date().getFullYear();
    const fullDate = toDate > 2020 ? `2020 - ${toDate}` : '2020';

    return <StyledCopyright>{`© Copyright ${fullDate} Brody Dingel`}</StyledCopyright>;
};

export default Copyright;
