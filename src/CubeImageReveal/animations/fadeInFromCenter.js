import flatten from 'lodash/flatten';
import { spring, presets } from 'react-motion';
import { constructMatrixFromFlattenArray } from './helpers';

export const applyAnimationInitialization = ({ imageCubeMatrix }) => {
  return flatten(imageCubeMatrix).map(imageCube => ({
    opacity: 0,
  }));
}

const isInteger = (val) => val === parseInt(val, 10);

const getCenterPoints = (noOfRows, noOfColumns) => {
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

const hasPoint = (points, i, j) => points.some(p => p.i === i && p.j === j);

const getOpacity = (style, i, j, defaultVal = 0) => style && style[i] && style[i][j] ? style[i][j].opacity : defaultVal;

export const applyAnimation = ({ prevStyles, imageCubeMatrix, springConfig }) => {
  const _spring = (val) => spring(val, springConfig);

  const noOfRows = imageCubeMatrix.length;
  const noOfColumns = imageCubeMatrix[0].length;

  const prevStylesMatrix = constructMatrixFromFlattenArray({
    arr: prevStyles,
    noOfColumns,
  });

  const newStylesMatrix = [];
  const centerPoints = getCenterPoints(noOfRows, noOfColumns);

  // Default threshold
  const horizontalThreshold = 0.2;
  const verticalThreshold = (noOfColumns * horizontalThreshold) / noOfRows;

  for (let i = 0; i < noOfRows; i++) {
    let newStylesRow = [];
    for (let j = 0; j < noOfColumns; j++) {
      // If it's a center point
      if(hasPoint(centerPoints, i, j)) {
        newStylesRow.push({
          opacity: _spring(1),
        });
      }
      else if(
        (getOpacity(prevStylesMatrix, i - 1, j) > horizontalThreshold) ||
        (getOpacity(prevStylesMatrix, i + 1, j) > horizontalThreshold))
      {
        newStylesRow.push({
          opacity: _spring(1),
        });
      }
      else if(
        (getOpacity(prevStylesMatrix, i, j - 1) > verticalThreshold) ||
        (getOpacity(prevStylesMatrix, i, j + 1) > verticalThreshold))
      {
        newStylesRow.push({
          opacity: _spring(1),
        });
      }
      else {
        newStylesRow.push({
          opacity: _spring(0),
        });
      }
    }
    newStylesMatrix.push(newStylesRow);
  }

  return flatten(newStylesMatrix);
}
