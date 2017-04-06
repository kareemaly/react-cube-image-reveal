import chunk from 'lodash/chunk';

export const constructMatrixFromFlattenArray = ({ arr, noOfColumns }) => {
  return chunk(arr, noOfColumns);
}
