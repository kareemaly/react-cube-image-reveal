react-cube-image-reveal
---------------

Installing
------------
```
$ npm install react-cube-image-reveal --save
```

[Demos](http://bitriddler.com/playground/cube-image-reveal)
--------------

Usage
--------------

```javascript
<CubeImageReveal
  image={image}
  width={width}
  height={height}
  piecesPerWidth={piecesPerWidth}
  animationType={animationType}
/>
```

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| image* | string |  | Image url to animate. |
| width* | number |  | Image width. This is required for this animation to work. |
| height* | number |  | Image height. This is required for this animation to work. |
| piecesPerWidth* | number |  | This defines how many pieces the width should be divided into.<br />Setting this too high will impact the performance of the animation so<br />use this carefully. |
| springConfig | shape {<br />`stiffness: number`<br />`precision: number`<br />`damping: number`<br />} | presets.noWobble | React motion configurations.<br />[More about this here](https://github.com/chenglou/react-motion#--spring-val-number-config-springhelperconfig--opaqueconfig) |
| animationType | enum ('simpleFadeIn', 'fadeInFromCenter', 'fadeInToBottomRightEdge', 'rotateToBottomRightEdge', 'rotateFromCenter', 'rotateTopToBottom') | 'fadeInFromCenter' | Type of animation to use. |
| inverseAnimation | bool | true | Setting this to true will reverse the image animation. |
| customAnimator | shape {<br />`applyAnimation: func`<br />`applyAnimationInitialization: func`<br />`applyInverseAnimation: func`<br />`getWrapper: func`<br />} |  | Use this if you want to apply your own animation.<br />Take a look at our animations to learn more [from here](https://github.com/bitriddler/react-cube-image-reveal/tree/master/src/CubeImageReveal/animations) |

Contributing
--------------
To contribute, follow these steps:
- Fork this repo.
- Clone your fork.
- Run `npm install`
- Run `npm start`
- Goto `localhost:3000`
- Add your patch then push to your fork and submit a pull request

License
---------
MIT
