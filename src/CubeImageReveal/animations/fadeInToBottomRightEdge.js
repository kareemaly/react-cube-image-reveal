import React from 'react';
import styled from 'styled-components';
import AnimateToBottomRightEdge from './animators/AnimateToBottomRightEdge';

const Wrapper = styled.div`
  ${(props) => props.opacity !== undefined ? `opacity: ${props.opacity};` : ''}
`;

export default new AnimateToBottomRightEdge({
  getWrapper: (value, props) => 
    <Wrapper
      opacity={value}
      {...props}
    />,
  threshold: 0.2,
});
