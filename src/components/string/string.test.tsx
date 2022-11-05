import { getReversingStringSteps } from './utils';

const oddString = '12345';

const evenString = '123456';

const emptyStringResult = [[]];

const oneCharResult = [['1']];

const oddResult = [
  ['1', '2', '3', '4', '5'],
  ['5', '2', '3', '4', '1'],
  ['5', '4', '3', '2', '1'],
];

const evenResult = [
  ['1', '2', '3', '4', '5', '6'],
  ['6', '2', '3', '4', '5', '1'],
  ['6', '5', '3', '4', '2', '1'],
  ['6', '5', '4', '3', '2', '1'],
];



describe('Reverse string steps test', () => {
  it('Return correctly steps array for odd string chars', () => {
    expect(getReversingStringSteps(oddString)).toEqual(oddResult);
  });

  it('Return correctly steps array for even string chars', () => {
    expect(getReversingStringSteps(evenString)).toEqual(evenResult);
  });

  it('Return correctly steps array for one char', () => {
    expect(getReversingStringSteps('1')).toEqual(oneCharResult);
  });

  it('Return correctly steps array for empty string', () => {
    expect(getReversingStringSteps('')).toEqual(emptyStringResult);
  });
});
