import * as React from 'react';
import renderer from 'react-test-renderer';
import { Collapsible } from '../Collapsible';
import { ThemedText } from '@/components/ThemedText';

it('deve renderizar o Collapsible corretamente', () => {
  const tree = renderer.create(
    <Collapsible title="Test Title">
      <ThemedText>Test Content</ThemedText>
    </Collapsible>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
