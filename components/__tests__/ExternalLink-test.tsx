import * as React from 'react';
import renderer from 'react-test-renderer';
import { ExternalLink } from '../ExternalLink';

it('deve renderizar o ExternalLink corretamente', () => {
  const tree = renderer.create(
    <ExternalLink href="https://www.example.com" />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
