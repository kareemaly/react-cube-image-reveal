import React from 'react';
import styled from 'styled-components';
import AnimateInSequence from './animators/AnimateInSequence';

const Wrapper = styled.div`
  ${(props) => props.opacity !== undefined ? `opacity: ${props.opacity};` : ''}
`;

export default new AnimateInSequence({
  getWrapper: (value, props) => 
    <Wrapper
      opacity={value}
      {...props}
    />,
  threshold: 0.2,
});
