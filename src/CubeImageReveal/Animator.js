import React from 'react';
import { StaggeredMotion, spring, presets } from 'react-motion';
import styled from 'styled-components';

const MatrixWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const ImageCubeWrapper = styled.div`
  opacity: ${(props) => props.opacity};
`;

export default class Animator extends React.Component {
  static propTypes = {
    springConfig: React.PropTypes.shape({
      stiffness: React.PropTypes.number,
      precision: React.PropTypes.number,
      damping: React.PropTypes.number,
    }).isRequired,
    piecesPerWidth: React.PropTypes.number.isRequired,
    imageCubeMatrix: React.PropTypes.arrayOf(React.PropTypes.arrayOf(React.PropTypes.element)).isRequired,
    applyAnimationInitialization: React.PropTypes.func.isRequired,
    applyAnimation: React.PropTypes.func.isRequired,
  };

  renderMatrix({ imageCubeMatrix, styles, piecesPerWidth }) {
    return imageCubeMatrix.map((imageCubeRow, i) => (
      <Row key={i}>
        {imageCubeRow.map((imageCube, j) => (
          <ImageCubeWrapper
            opacity={styles[i * piecesPerWidth + j].opacity}
            key={j}
          >
            {imageCube}
          </ImageCubeWrapper>
        ))}
      </Row>
    ));
  }

  render() {
    const {
      springConfig,
      imageCubeMatrix,
      piecesPerWidth,
      applyAnimationInitialization,
      applyAnimation,
      ...props,
    } = this.props;

    return (
      <StaggeredMotion
        defaultStyles={applyAnimationInitialization({
          imageCubeMatrix,
        })}
        styles={(prevStyles) => applyAnimation({
          prevStyles,
          imageCubeMatrix,
          springConfig,
        })}
      >
      {(styles) => (
        <MatrixWrapper {...props}>
          {this.renderMatrix({ imageCubeMatrix, styles, piecesPerWidth })}
        </MatrixWrapper>
      )}
      </StaggeredMotion>
    );
  }
}
