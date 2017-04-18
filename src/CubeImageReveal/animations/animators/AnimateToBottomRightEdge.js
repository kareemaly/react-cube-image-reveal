import flatten from 'lodash/flatten';
import { spring, presets } from 'react-motion';
import { constructMatrixFromFlattenArray, isInteger } from '../../../helpers';

export default class AnimateInSequence {
  constructor({
    getWrapper,
    threshold,
  }) {
    this.config = {
      getWrapper,
      threshold,
    };
  }

  getProperty(styles, i, j, defaultVal = 0) {
    return styles && styles[i] && styles[i][j] ? styles[i][j].value : defaultVal;
  }

  getWrapper(style, props) {
    return this.config.getWrapper(style.value, props);
  }

  getDefaultStyles({ imageCubeMatrix }) {
    return flatten(imageCubeMatrix).map(imageCube => ({
      value: 0,
    }));
  }

  getInverseStyles({ prevStyles, imageCubeMatrix, springConfig }) {
    const _spring = (val) => spring(val, springConfig);

    const prevStylesMatrix = constructMatrixFromFlattenArray({
      arr: prevStyles,
      noOfColumns: imageCubeMatrix[0].length,
    });

    const newStylesMatrix = [];

    for (let i = 0; i < prevStylesMatrix.length; i++) {
      let newStylesRow = [];
      for (let j = 0; j < prevStylesMatrix[i].length; j++) {
        if(i === prevStylesMatrix.length - 1 && j === prevStylesMatrix[0].length - 1)
        {
          newStylesRow.push({
            value: _spring(0),
          });
        }
        else if(
          this.getProperty(prevStylesMatrix, i + 1, j, 1) < (1 - this.config.threshold) ||
          this.getProperty(prevStylesMatrix, i, j + 1, 1) < (1 - this.config.threshold))
        {
          newStylesRow.push({
            value: _spring(0),
          });
        }
        else
        {
          newStylesRow.push({
            value: _spring(1),
          });
        }

      }
      newStylesMatrix.push(newStylesRow);
    }

    return flatten(newStylesMatrix);
  }

  getStyles({ prevStyles, imageCubeMatrix, springConfig }) {
    const _spring = (val) => spring(val, springConfig);

    const prevStylesMatrix = constructMatrixFromFlattenArray({
      arr: prevStyles,
      noOfColumns: imageCubeMatrix[0].length,
    });

    const newStylesMatrix = [];

    for (let i = 0; i < prevStylesMatrix.length; i++) {
      let newStylesRow = [];
      for (let j = 0; j < prevStylesMatrix[i].length; j++) {
        if(i === 0 && j === 0)
        {
          newStylesRow.push({
            value: _spring(1),
          });
        }
        else if(
          this.getProperty(prevStylesMatrix, i - 1, j) > this.config.threshold ||
          this.getProperty(prevStylesMatrix, i, j - 1) > this.config.threshold)
        {
          newStylesRow.push({
            value: _spring(1),
          });
        }
        else
        {
          newStylesRow.push({
            value: _spring(0),
          });
        }
      }
      newStylesMatrix.push(newStylesRow);
    }

    return flatten(newStylesMatrix);
  }
}
