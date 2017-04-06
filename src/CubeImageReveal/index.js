import React from 'react';
import { Motion, spring, presets } from 'react-motion';
import Measure from 'react-measure';
import styled from 'styled-components';
import Animator from './Animator';
import ImageCube from './ImageCube';
import * as simpleFadeInAnimation from './animations/simpleFadeIn';

const SliderWrapper = styled.div`
`;

export default class CubeImageReveal extends React.Component {
  static propTypes = {
    image: React.PropTypes.string.isRequired,
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    piecesPerWidth: React.PropTypes.number.isRequired,
    springConfig: React.PropTypes.shape({
      stiffness: React.PropTypes.number,
      precision: React.PropTypes.number,
      damping: React.PropTypes.number,
    }),
    animationType: React.PropTypes.oneOf([
      'fadeIn',
    ]),
    applyAnimationInitialization: React.PropTypes.func,
    applyAnimation: React.PropTypes.func,
  };

  static defaultProps = {
    springConfig: presets.noWobble,
    applyAnimationInitialization: simpleFadeInAnimation.applyAnimationInitialization,
    applyAnimation: simpleFadeInAnimation.applyAnimation,
  };

  getImageCube({ image, width, cubeWidth, cubeHeight, position }) {
    return (
      <ImageCube
        imageWidth={width}
        cubeWidth={cubeWidth}
        cubeHeight={cubeHeight}
        image={image}
        position={position}
      />
    );
  }

  buildMatrix({ image, width, height, piecesPerWidth }) {
    const cubeWidth = width / piecesPerWidth;
    const piecesPerHeight = Math.round(height / cubeWidth);
    const cubeHeight = height / piecesPerHeight;

    // Build the matrix
    const matrix = [];
    for (var x = 0; x < piecesPerHeight; x++) {
      const arr = [];
      for (var y = 0; y < piecesPerWidth; y++) {
        const position = { x, y };
        arr.push(this.getImageCube({ image, width, cubeWidth, cubeHeight, position }));
      }
      matrix.push(arr);
    }

    return matrix;
  }

  render() {
    const {
      springConfig,
      image,
      width,
      height,
      piecesPerWidth,
      applyAnimationInitialization,
      applyAnimation,
      ...props,
    } = this.props;

    const imageCubeMatrix = this.buildMatrix({ image, width, height, piecesPerWidth });

    return (
      <SliderWrapper>
        <Animator
          applyAnimationInitialization={applyAnimationInitialization}
          applyAnimation={applyAnimation}
          piecesPerWidth={piecesPerWidth}
          springConfig={springConfig}
          imageCubeMatrix={imageCubeMatrix}
        />
      </SliderWrapper>
    );
  }
}
