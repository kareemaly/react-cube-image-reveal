import chunk from 'lodash/chunk';

export const constructMatrixFromFlattenArray = ({ arr, noOfColumns }) => {
  return chunk(arr, noOfColumns);
}

export const isInteger = (val) => val === parseInt(val, 10);

export function convertRange(value, r1, r2) { 
  return ( value - r1[ 0 ] ) * ( r2[ 1 ] - r2[ 0 ] ) / ( r1[ 1 ] - r1[ 0 ] ) + r2[ 0 ];
}