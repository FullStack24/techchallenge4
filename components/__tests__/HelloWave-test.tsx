import * as React from 'react';
import renderer from 'react-test-renderer';
import { HelloWave } from '../HelloWave';

it('deve renderizar o HelloWave corretamente', () => {
  const tree = renderer.create(<HelloWave />).toJSON();

  expect(tree).toMatchSnapshot();
});
