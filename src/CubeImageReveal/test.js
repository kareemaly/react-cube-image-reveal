import React from 'react';
import { presets } from 'react-motion';
import CubeImageReveal from './index';
import range from 'lodash/range';
import styled from 'styled-components';

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0px auto;
`;

const Button = styled.button`
  ${(props) => !props.isFirst ? `margin-left: 10px;` : ``}
  background: ${(props) => props.active ? '#E65100' : '#333'};
  color: #FFF;
  border: 0;
  padding: 10px;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;

const DemoWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Title = styled.h2`
`;

const Controllers = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
`;

const Controller = styled.div`
  display: flex;
  margin-bottom: 10px;
  align-items: center;
`;

const Label = styled.div`
  width: 120px;
  text-align: right;
  margin-right: 10px;
`;

const Select = styled.select`
  border: 1px solid #EEE;
  padding: 10px;
`;

export default class TextCubeImageReveal extends React.Component {

  componentWillMount() {
    this.setState({
      animationType: 'fadeInFromCenter',
      inverseAnimation: true,
      piecesPerWidth: 6,
      image: 'https://cdn.geckoandfly.com/wp-content/uploads/2013/11/Self-Motivational-Quotes.jpg',
      width: 600,
      height: 450,
      springPresets: 'noWobble',
    });
  }

  resetAnimation(state) {
    this.setState({
      resetAnimation: true,
    });

    setTimeout(() => this.setState({
      ...state,
      inverseAnimation: false,
      resetAnimation: false,
    }), 100);
  }

  changeAnimation(animationType) {
    this.resetAnimation({
      animationType,
    });
  }

  changeSpringPresets(springPresets) {
    this.resetAnimation({
      springPresets,
    });
  }

  changePiecesPerWidth(piecesPerWidth) {
    this.resetAnimation({
      piecesPerWidth: Number(piecesPerWidth),
    });
  }

  render() {
    const {
      inverseAnimation,
      animationType,
      piecesPerWidth,
      resetAnimation,
      image,
      width,
      height,
      springPresets,
    } = this.state;

    return (
      <Wrapper>
        <Controllers>
          <Controller>
            <Label>
              Animation type
            </Label>
            <Select
              value={animationType}
              onChange={(e) => this.changeAnimation(e.target.value)}
            >
              <option value={'simpleFadeIn'}>simpleFadeIn</option>
              <option value={'fadeInFromCenter'}>fadeInFromCenter</option>
              <option value={'fadeInToBottomRightEdge'}>fadeInToBottomRightEdge</option>
              <option value={'rotateToBottomRightEdge'}>rotateToBottomRightEdge</option>
              <option value={'rotateFromCenter'}>rotateFromCenter</option>
              <option value={'rotateTopToBottom'}>rotateTopToBottom</option>
            </Select>
          </Controller>
          <Controller>
            <Label>
              Spring presets
            </Label>
            <Select
              value={springPresets}
              onChange={(e) => this.changeSpringPresets(e.target.value)}
            >
              <option value={'noWobble'}>noWobble</option>
              <option value={'gentle'}>gentle</option>
              <option value={'wobbly'}>wobbly</option>
              <option value={'stiff'}>stiff</option>
            </Select>
          </Controller>
          <Controller>
            <Label>
              Pieces per width
            </Label>
            <Select
              value={piecesPerWidth}
              onChange={(e) => this.changePiecesPerWidth(e.target.value)}
            >
              {range(4, 20).map(val => (
                <option value={val} key={val}>{val}</option>
              ))}
            </Select>
          </Controller>
          <Controller>
            <Button isFirst onClick={() => this.setState({ inverseAnimation: !inverseAnimation })}>
              Inverse the animation
            </Button>
          </Controller>
        </Controllers>

        {!resetAnimation ?
          <DemoWrapper>
            <CubeImageReveal
              image={image}
              width={width}
              height={height}
              piecesPerWidth={piecesPerWidth}
              animationType={animationType}
              inverseAnimation={inverseAnimation}
              springConfig={presets[springPresets]}
            />
          </DemoWrapper> : null}
      </Wrapper>
    );
  }
}
