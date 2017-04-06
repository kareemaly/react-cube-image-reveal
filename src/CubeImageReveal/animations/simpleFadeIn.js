import flatten from 'lodash/flatten';
import { spring } from 'react-motion';
import { constructMatrixFromFlattenArray } from './helpers';

export const applyAnimationInitialization = ({ imageCubeMatrix }) => {
  return flatten(imageCubeMatrix).map(imageCube => ({
    opacity: 0,
  }));
}

export const applyAnimation = ({ prevStyles, imageCubeMatrix, springConfig }) => {
  const _spring = (val) => spring(val, springConfig);

  return prevStyles.map((_, i) => {
    return i === 0 ?
      { opacity: _spring(1) } :
      { opacity: _spring(prevStyles[i - 1].opacity > 0.3 ? 1 : 0) };
  });
}
