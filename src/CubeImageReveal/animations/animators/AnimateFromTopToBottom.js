import flatten from 'lodash/flatten';
import { spring, presets } from 'react-motion';
import { constructMatrixFromFlattenArray, isInteger } from '../../../helpers';

export default class AnimateFromCenter {
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
    return flatten(imageCubeMatrix).map(() => ({
      value: 0,
    }));
  }

  getInverseStyles({ prevStyles, imageCubeMatrix, springConfig }) {
    const noOfRows = imageCubeMatrix.length;
    const noOfColumns = imageCubeMatrix[0].length;

    const prevStylesMatrix = constructMatrixFromFlattenArray({
      arr: prevStyles,
      noOfColumns,
    });

    const _spring = (val) => spring(val, springConfig);
    const newStylesMatrix = [];

    for (let i = 0; i < noOfRows; i++) {
      let newStylesRow = [];
      for (let j = 0; j < noOfColumns; j++) {
        // If it's a top row
        if(i === 0) {
          newStylesRow.push({
            value: _spring(0),
          });
        }
        // If the previous row has finished
        else if(this.getProperty(prevStylesMatrix, i - 1, j) < this.config.threshold)
        {
          newStylesRow.push({
            value: _spring(0),
          });
        }
        else {
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
    const noOfRows = imageCubeMatrix.length;
    const noOfColumns = imageCubeMatrix[0].length;

    const prevStylesMatrix = constructMatrixFromFlattenArray({
      arr: prevStyles,
      noOfColumns,
    });

    const _spring = (val) => spring(val, springConfig);
    const newStylesMatrix = [];

    for (let i = 0; i < noOfRows; i++) {
      let newStylesRow = [];
      for (let j = 0; j < noOfColumns; j++) {
        // If it's a top row
        if(i === 0) {
          newStylesRow.push({
            value: _spring(1),
          });
        }
        // If the previous row has finished
        else if(this.getProperty(prevStylesMatrix, i - 1, j) > this.config.threshold)
        {
          newStylesRow.push({
            value: _spring(1),
          });
        }
        else {
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
