import renderer from 'react-test-renderer';
import { Circle } from './circle';
import { ElementStates } from '../../../types/element-states';

describe('Circle component tests', () => {
  it('Circle render without letter', () => {
    const circle = renderer.create(<Circle />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it('Circle render with letter', () => {
    const circle = renderer.create(<Circle letter='q' />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it('Circle render with letter in head', () => {
    const circle = renderer.create(<Circle head='X' />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it('Circle render with letter in tail', () => {
    const circle = renderer.create(<Circle tail='q' />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it('Circle render with index', () => {
    const circle = renderer.create(<Circle index={1} />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it('Circle render with jsx element in head', () => {
    const circle = renderer.create(<Circle head={<Circle />} />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it('Circle render with jsx element in tail', () => {
    const circle = renderer.create(<Circle tail={<Circle />} />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it('Circle render with prop is-small', () => {
    const circle = renderer.create(<Circle isSmall />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it('Circle render with default state', () => {
    const circle = renderer.create(<Circle state={ElementStates.Default} />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it('Circle render with changing state', () => {
    const circle = renderer.create(<Circle state={ElementStates.Changing} />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it('Circle render with modified state', () => {
    const circle = renderer.create(<Circle state={ElementStates.Modified} />).toJSON();
    expect(circle).toMatchSnapshot();
  });
});
