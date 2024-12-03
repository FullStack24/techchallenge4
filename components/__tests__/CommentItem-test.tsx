import * as React from 'react';
import renderer from 'react-test-renderer';
import { IComment } from '@/interfaces/Comment';
import CommentItem from '../CommentItem';

it('deve renderizar o CommentItem corretamente', () => {
  const mockComment: IComment = {
    id: '1',
    content: 'This is a comment',
    author: 'John Doe',
    post_id: '1',
    created_at: new Date().toISOString(),
  };

  const tree = renderer.create(
    <CommentItem comment={mockComment} />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
