import React from 'react';
import styled from 'styled-components';

const ResponsiveBlock = styled.div`
  width: 1194px;
  margin: 0 auto;

  @media (max-width: 1194px) {
    width: 768px;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Responsive = ({ children }) => {
    return <ResponsiveBlock>{children}</ResponsiveBlock>
}

export default Responsive;