import * as React from 'react';
import renderer from 'react-test-renderer';
import SearchBar from '../SearchBar';

it('deve renderizar o SearchBar corretamente', () => {
  const mockOnSearch = jest.fn();
  const tree = renderer.create(
    <SearchBar searchTerm="test" onSearch={mockOnSearch} />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
