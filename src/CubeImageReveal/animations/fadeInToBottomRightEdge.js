import flatten from 'lodash/flatten';
import { spring, presets } from 'react-motion';
import { constructMatrixFromFlattenArray } from './helpers';

export const applyAnimationInitialization = ({ imageCubeMatrix }) => {
  return flatten(imageCubeMatrix).map(imageCube => ({
    opacity: 0,
  }));
}

export const applyAnimation = ({ prevStyles, imageCubeMatrix, springConfig }) => {
  const _spring = (val) => spring(val, springConfig);

  const prevStylesMatrix = constructMatrixFromFlattenArray({
    arr: prevStyles,
    noOfColumns: imageCubeMatrix[0].length,
  });

  const newStylesMatrix = [];

  for (let i = 0; i < prevStylesMatrix.length; i++) {
    let newStylesRow = [];
    for (let j = 0; j < prevStylesMatrix[i].length; j++) {
      if(i === 0 && j === 0) {
        newStylesRow.push({
          opacity: _spring(1),
        });
      }

      else if(i > 0 && prevStylesMatrix[i - 1][j].opacity > 0.2) {
        newStylesRow.push({
          opacity: _spring(1),
        });
      }

      else if(j > 0 && prevStylesMatrix[i][j - 1].opacity > 0.2) {
        newStylesRow.push({
          opacity: _spring(1),
        });
      } else {
        newStylesRow.push({
          opacity: _spring(0),
        });
      }
    }
    newStylesMatrix.push(newStylesRow);
  }

  return flatten(newStylesMatrix);
}
