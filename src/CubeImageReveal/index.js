import React from 'react';
import { StaggeredMotion, spring, presets } from 'react-motion';
import Measure from 'react-measure';
import keys from 'lodash/keys';
import styled from 'styled-components';
import ImageCube from './ImageCube';
import simpleFadeIn from './animations/simpleFadeIn';
import fadeInFromCenter from './animations/fadeInFromCenter';
import fadeInToBottomRightEdge from './animations/fadeInToBottomRightEdge';
import rotateToBottomRightEdge from './animations/rotateToBottomRightEdge';
import rotateFromCenter from './animations/rotateFromCenter';
import rotateTopToBottom from './animations/rotateTopToBottom';

const SliderWrapper = styled.div`
`;


const MatrixWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const animators = {
  simpleFadeIn,
  fadeInFromCenter,
  fadeInToBottomRightEdge,
  rotateToBottomRightEdge,
  rotateFromCenter,
  rotateTopToBottom,
};

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
    animationType: React.PropTypes.oneOf(keys(animators)),
    inverseAnimation: React.PropTypes.bool,
    // use this If you want to use your own animation
    customAnimator: React.PropTypes.shape({
      applyAnimation: React.PropTypes.func.isRequired,
      applyAnimationInitialization: React.PropTypes.func.isRequired,
      applyInverseAnimation: React.PropTypes.func.isRequired,
      // Wrapper element
      getWrapper: React.PropTypes.func,
    }),
  };

  static defaultProps = {
    springConfig: presets.noWobble,
    animationType: 'fadeInFromCenter',
    inverseAnimation: true,
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

  renderMatrix({ animator, imageCubeMatrix, styles, piecesPerWidth }) {
    return imageCubeMatrix.map((imageCubeRow, i) => (
      <Row key={i}>
        {imageCubeRow.map((imageCube, j) => 
          animator.getWrapper(styles[i * piecesPerWidth + j], {
            children: imageCube,
            key: j,
          })
        )}
      </Row>
    ));
  }

  getStyles({
    inverseAnimation,
    animator,
    imageCubeMatrix,
    springConfig,
  }) {
    if(inverseAnimation) {
      return (prevStyles) => animator.getInverseStyles({
        prevStyles,
        imageCubeMatrix,
        springConfig,
      });
    }

    return (prevStyles) => animator.getStyles({
      prevStyles,
      imageCubeMatrix,
      springConfig,
    });
  }

  render() {
    const {
      springConfig,
      image,
      width,
      height,
      piecesPerWidth,
      animationType,
      customAnimator,
      inverseAnimation,
      ...props,
    } = this.props;

    const imageCubeMatrix = this.buildMatrix({ image, width, height, piecesPerWidth });
    const animator = customAnimator || animators[animationType];

    return (
      <SliderWrapper>
        <StaggeredMotion
          defaultStyles={animator.getDefaultStyles({
            imageCubeMatrix,
          })}
          styles={this.getStyles({
            inverseAnimation,
            animator,
            imageCubeMatrix,
            springConfig,
          })}
        >
        {(styles) => (
          <MatrixWrapper {...props}>
            {this.renderMatrix({ animator, imageCubeMatrix, styles, piecesPerWidth })}
          </MatrixWrapper>
        )}
        </StaggeredMotion>
      </SliderWrapper>
    );
  }
}
