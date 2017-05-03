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
    /**
     * Image url to animate.
     */
    image: React.PropTypes.string.isRequired,
    /**
     * Image width. This is required for this animation to work.
     */
    width: React.PropTypes.number.isRequired,
    /**
     * Image height. This is required for this animation to work.
     */
    height: React.PropTypes.number.isRequired,
    /**
     * This defines how many pieces the width should be divided into.
     * Setting this too high will impact the performance of the animation so
     * use this carefully.
     */
    piecesPerWidth: React.PropTypes.number.isRequired,
    /**
     * React motion configurations.
     * [More about this here](https://github.com/chenglou/react-motion#--spring-val-number-config-springhelperconfig--opaqueconfig)
     */
    springConfig: React.PropTypes.shape({
      stiffness: React.PropTypes.number,
      precision: React.PropTypes.number,
      damping: React.PropTypes.number,
    }),
    /**
     * Type of animation to use.
     */
    animationType: React.PropTypes.oneOf([
      'simpleFadeIn',
      'fadeInFromCenter',
      'fadeInToBottomRightEdge',
      'rotateToBottomRightEdge',
      'rotateFromCenter',
      'rotateTopToBottom',
    ]),
    /**
     * Setting this to true will reverse the image animation.
     */
    inverseAnimation: React.PropTypes.bool,
    /**
     * Use this if you want to apply your own animation.
     * Take a look at our animations to learn more [from here](https://github.com/bitriddler/react-cube-image-reveal/tree/master/src/CubeImageReveal/animations)
     */
    customAnimator: React.PropTypes.shape({
      applyAnimation: React.PropTypes.func.isRequired,
      applyAnimationInitialization: React.PropTypes.func.isRequired,
      applyInverseAnimation: React.PropTypes.func.isRequired,
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
