import renderer from 'react-test-renderer';
import { Button } from './button';

const buttonText = 'Click';

describe('Button snapshot tests', () => {
  it('Button render with text', () => {
    const button = renderer.create(<Button text={buttonText} />).toJSON();
    expect(button).toMatchSnapshot();
  });

  it('Button render without text', () => {
    const button = renderer.create(<Button />).toJSON();
    expect(button).toMatchSnapshot();
  });

  it('Button render with loader correctly', () => {
    const button = renderer.create(<Button isLoader />).toJSON();
    expect(button).toMatchSnapshot();
  });

  it('Button disabled correctly', () => {
    const button = renderer.create(<Button disabled />).toJSON();
    expect(button).toMatchSnapshot();
  });
});
