import * as React from 'react';
import renderer from 'react-test-renderer';
import { View } from 'react-native';
import { ThemedView } from '../ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';

jest.mock('@/hooks/useThemeColor', () => ({
  useThemeColor: jest.fn(),
}));

it('deve renderizar ThemedView com a cor de fundo correta', () => {
  const mockThemeColor = '#FFFFFF';
  
  (useThemeColor as jest.Mock).mockReturnValue(mockThemeColor);

  const tree = renderer.create(
    <ThemedView lightColor="#FFFFFF" darkColor="#000000" style={{ padding: 10 }} />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
