import React from 'react';
import styled from 'styled-components';

export const ResponsiveBlock = styled.div`
  width: 62.74vw;
  min-width: 768px;
  margin: 0 auto;
`;

const Responsive = ({ children }) => {
    return <ResponsiveBlock>{children}</ResponsiveBlock>
}

export default Responsive;