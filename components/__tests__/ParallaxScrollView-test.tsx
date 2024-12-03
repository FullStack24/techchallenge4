import * as React from 'react';
import renderer from 'react-test-renderer';
import { ParallaxScrollView } from './ParallaxScrollView';

// Mock da imagem do cabeçalho
const mockHeaderImage = <div><Header>Test</Header></div>;

it('deve renderizar o ParallaxScrollView corretamente', () => {
  const tree = renderer.create(
    <ParallaxScrollView 
      headerImage={mockHeaderImage} 
      headerBackgroundColor={{ light: '#fff', dark: '#000' }} 
    />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
