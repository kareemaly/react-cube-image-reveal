import React from 'react';
import { StaggeredMotion, spring, presets } from 'react-motion';
import flatten from 'lodash/flatten';
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

export default class FadeInAnimator extends React.Component {
  static configPropTypes = {
  };

  static propTypes = {
    springConfig: React.PropTypes.shape({
      stiffness: React.PropTypes.number,
      precision: React.PropTypes.number,
      damping: React.PropTypes.number,
    }).isRequired,
    piecesPerWidth: React.PropTypes.number.isRequired,
    imageCubeMatrix: React.PropTypes.arrayOf(React.PropTypes.arrayOf(React.PropTypes.element)).isRequired,
    ...FadeInAnimator.configPropTypes,
  };

  static defaultProps = {
  };

  getDefaultStyles({ imageCubeMatrix }) {
    return flatten(imageCubeMatrix).map(imageCube => ({
      opacity: 0,
    }));
  }

  getStyles({ imageCubeMatrix, springConfig }) {
    const _spring = (val) => spring(val, springConfig);

    return (prevStyles) => prevStyles.map((_, i) => {
      return i === 0 ?
        { opacity: _spring(1) } :
        { opacity: _spring(prevStyles[i - 1].opacity > 0.3 ? 1 : 0) };
    });
  }

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
      ...props,
    } = this.props;

    return (
      <StaggeredMotion
        defaultStyles={this.getDefaultStyles({ imageCubeMatrix })}
        styles={this.getStyles({ imageCubeMatrix, springConfig })}
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
