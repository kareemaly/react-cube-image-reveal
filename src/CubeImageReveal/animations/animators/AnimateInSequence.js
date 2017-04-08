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

    return prevStyles.map((_, i) => {
      return i === prevStyles.length - 1 ?
        { value: _spring(0) } :
        { value: _spring(prevStyles[i + 1].value < 0.7 ? 0 : 1) };
    });
  }

  getStyles({ prevStyles, imageCubeMatrix, springConfig }) {
    const _spring = (val) => spring(val, springConfig);

    return prevStyles.map((_, i) => {
      return i === 0 ?
        { value: _spring(1) } :
        { value: _spring(prevStyles[i - 1].value > this.config.threshold ? 1 : 0) };
    });
  }
}
