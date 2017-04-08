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

  getCenterPoints(noOfRows, noOfColumns) {
    const centerPointI = (noOfRows + 1) / 2; // row
    const centerPointJ = (noOfColumns + 1) / 2; // column
    if(isInteger(centerPointI) && isInteger(centerPointJ)) {
      // Only one center point
      return [{
        i: centerPointI,
        j: centerPointJ,
      }];
    } else {
      return [
        {
          i: Math.floor(centerPointI) - 1,
          j: Math.floor(centerPointJ) - 1,
        },
        {
          i: isInteger(centerPointI) ? centerPointI - 1 : Math.floor(centerPointI),
          j: isInteger(centerPointJ) ? centerPointJ - 1 : Math.floor(centerPointJ),
        },
      ];
    }
  }

  hasPoint(points, i, j) {
    return points.some(p => p.i === i && p.j === j);
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
    const centerPoints = this.getCenterPoints(noOfRows, noOfColumns);

    // Default threshold
    const horizontalThreshold = this.config.threshold;
    const verticalThreshold = (noOfColumns * horizontalThreshold) / noOfRows;

    for (let i = 0; i < noOfRows; i++) {
      let newStylesRow = [];
      for (let j = 0; j < noOfColumns; j++) {
        // If it's a center point
        if(this.hasPoint(centerPoints, i, j)) {
          newStylesRow.push({
            value: _spring(0),
          });
        }
        else if(
          (this.getProperty(prevStylesMatrix, i - 1, j) < (1 - horizontalThreshold)) ||
          (this.getProperty(prevStylesMatrix, i + 1, j) < (1 - horizontalThreshold)))
        {
          newStylesRow.push({
            value: _spring(0),
          });
        }
        else if(
          (this.getProperty(prevStylesMatrix, i, j - 1) < (1 - verticalThreshold)) ||
          (this.getProperty(prevStylesMatrix, i, j + 1) < (1 - verticalThreshold)))
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
    const centerPoints = this.getCenterPoints(noOfRows, noOfColumns);

    // Default threshold
    const horizontalThreshold = this.config.threshold;
    const verticalThreshold = (noOfColumns * horizontalThreshold) / noOfRows;

    for (let i = 0; i < noOfRows; i++) {
      let newStylesRow = [];
      for (let j = 0; j < noOfColumns; j++) {
        // If it's a center point
        if(this.hasPoint(centerPoints, i, j)) {
          newStylesRow.push({
            value: _spring(1),
          });
        }
        else if(
          (this.getProperty(prevStylesMatrix, i - 1, j) > horizontalThreshold) ||
          (this.getProperty(prevStylesMatrix, i + 1, j) > horizontalThreshold))
        {
          newStylesRow.push({
            value: _spring(1),
          });
        }
        else if(
          (this.getProperty(prevStylesMatrix, i, j - 1) > verticalThreshold) ||
          (this.getProperty(prevStylesMatrix, i, j + 1) > verticalThreshold))
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
