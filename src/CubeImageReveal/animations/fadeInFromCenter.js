import React from 'react';
import styled from 'styled-components';
import AnimateFromCenter from './animators/AnimateFromCenter';

const Wrapper = styled.div`
  ${(props) => props.opacity !== undefined ? `opacity: ${props.opacity};` : ''}
`;

export default new AnimateFromCenter({
  getWrapper: (value, props) => 
    <Wrapper
      opacity={value}
      {...props}
    />,
  threshold: 0.2,
});
