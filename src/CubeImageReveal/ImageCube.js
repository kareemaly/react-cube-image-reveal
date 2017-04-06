import React from 'react';
import styled from 'styled-components';

const calculateYPosition = ({ position, cubeWidth }) => position.y * cubeWidth;
const calculateXPosition = ({ position, cubeHeight }) => position.x * cubeHeight;
const calculateBackgroundSize = ({ imageWidth, cubeWidth }) => (imageWidth / cubeWidth) * 100;

const Image = styled.div`
  background-image: url(${(props) => props.image});
  background-position: -${calculateYPosition}px -${calculateXPosition}px;
  background-size: ${calculateBackgroundSize}%;
  width: ${(props) => props.cubeWidth}px;
  height: ${(props) => props.cubeHeight}px;
`;

const ImageCube = ({ image, imageWidth, cubeWidth, cubeHeight, position, ...props }) => (
  <Image
    image={image}
    position={position}
    imageWidth={imageWidth}
    cubeWidth={cubeWidth}
    cubeHeight={cubeHeight}
    {...props}
  />
);

ImageCube.propTypes = {
  image: React.PropTypes.string.isRequired,
  imageWidth: React.PropTypes.number.isRequired,
  cubeWidth: React.PropTypes.number.isRequired,
  cubeHeight: React.PropTypes.number.isRequired,
  // Position in the matrix
  position: React.PropTypes.shape({
    x: React.PropTypes.number,
    y: React.PropTypes.number,
  }).isRequired,
};

export default ImageCube;
