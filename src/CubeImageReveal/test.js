import React from 'react';
import { presets } from 'react-motion';
import CubeImageReveal from './index';
import { applyAnimationInitialization, applyAnimation } from './animations/fadeInFromCenter';

export default () => (
  <CubeImageReveal
    image={'https://placeholdit.imgix.net/~text?txtsize=100&txt=KEMO&w=700&h=1200'}
    width={700}
    height={1200}
    piecesPerWidth={16}
    applyAnimationInitialization={applyAnimationInitialization}
    applyAnimation={applyAnimation}
    springConfig={{
      stiffness: 180,
      damping: 3, 
    }}
  />
);