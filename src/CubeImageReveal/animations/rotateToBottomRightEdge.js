import React from 'react';
import styled from 'styled-components';
import AnimateToBottomRightEdge from './animators/AnimateToBottomRightEdge';
import { convertRange } from '../../helpers';

const Wrapper = styled.div`
  ${(props) => props.rotateX !== undefined ? `transform: rotateX(${props.rotateX}deg);` : ''}
`;

export default new AnimateToBottomRightEdge({
  getWrapper: (value, props) => 
    <Wrapper
      rotateX={convertRange(value, [0, 1], [90, 0])}
      {...props}
    />,
  threshold: 0.2,
});
