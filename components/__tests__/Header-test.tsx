import * as React from 'react';
import renderer from 'react-test-renderer';
import Header from '../HeaderFooter/Header';

it('deve renderizar o header com o logo corretamente', () => {
  const tree = renderer.create(
    <Header />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
