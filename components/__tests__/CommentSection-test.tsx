import * as React from 'react';
import renderer from 'react-test-renderer';
import { IComment } from '@/interfaces/Comment';
import CommentSection from '../CommentSection';

const mockOnCommentAdded = jest.fn();
const mockOnCommentDeleted = jest.fn();
const mockOnReplyAdded = jest.fn();

it('deve renderizar o CommentSection corretamente', () => {

  const mockComments: IComment[] = [
    {
      id: '1',
      post_id: '1',
      author: 'John Doe',
      content: 'This is a comment',
      created_at: new Date().toISOString(),
    },
    {
      id: '2',
      post_id: '1',
      author: 'Jane Doe',
      content: 'This is another comment',
      created_at: new Date().toISOString(),
    },
  ];

  const tree = renderer.create(
    <CommentSection
      comments={mockComments}
      postId="1"
      userRole="teacher"
      onCommentAdded={mockOnCommentAdded}
      onCommentDeleted={mockOnCommentDeleted}
      onReplyAdded={mockOnReplyAdded}
    />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
