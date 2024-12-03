import commentService from 'services/commentService';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('@react-native-async-storage/async-storage');
jest.mock('node-fetch', () => jest.fn());
const fetch = require('node-fetch');

describe('commentService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createComment', () => {
    it('deve criar um comentário com sucesso', async () => {

      AsyncStorage.getItem.mockResolvedValue('fakeToken');
      
      fetch.mockResolvedValue({
        ok: true,
        json: async () => ({ id: '123', postId: '456', author: 'John', content: 'Test comment' }),
      });

      const result = await commentService.createComment('456', 'John', 'Test comment');
      
      expect(result).toEqual({ id: '123', postId: '456', author: 'John', content: 'Test comment' });
      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/posts/456/comments', 
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Authorization': 'Bearer fakeToken',
            'Content-Type': 'application/json',
          }),
          body: JSON.stringify({ postId: '456', author: 'John', content: 'Test comment' }),
        })
      );
    });

    it('deve lançar um erro se a resposta da API for negativa', async () => {

      AsyncStorage.getItem.mockResolvedValue('fakeToken');
      
      fetch.mockResolvedValue({
        ok: false,
        json: async () => ({ message: 'Erro ao criar comentário' }),
      });

      await expect(commentService.createComment('456', 'John', 'Test comment')).rejects.toThrow('Erro ao criar comentário');
    });

    it('deve lançar erro se ocorrer falha de rede', async () => {

      AsyncStorage.getItem.mockResolvedValue('fakeToken');

      fetch.mockRejectedValue(new Error('Erro de rede'));

      await expect(commentService.createComment('456', 'John', 'Test comment')).rejects.toThrow('Erro de rede');
    });
  });

  describe('deleteComment', () => {
    it('deve excluir um comentário com sucesso', async () => {

      AsyncStorage.getItem.mockResolvedValue('fakeToken');
      

      fetch.mockResolvedValue({ ok: true });

      await expect(commentService.deleteComment('123')).resolves.not.toThrow();
      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/comments/123', 
        expect.objectContaining({
          method: 'DELETE',
          headers: expect.objectContaining({
            'Authorization': 'Bearer fakeToken',
            'Content-Type': 'application/json',
          }),
        })
      );
    });

    it('deve lançar erro se a exclusão falhar', async () => {

      AsyncStorage.getItem.mockResolvedValue('fakeToken');
      
      fetch.mockResolvedValue({ ok: false });

      await expect(commentService.deleteComment('123')).rejects.toThrow('Erro ao excluir comentário');
    });
  });

  describe('replyToComment', () => {
    it('deve responder a um comentário com sucesso', async () => {

      AsyncStorage.getItem.mockResolvedValue('fakeToken');
      
      fetch.mockResolvedValue({
        ok: true,
        json: async () => ({ id: '789', commentId: '123', author: 'John', content: 'Reply content' }),
      });

      const result = await commentService.replyToComment('123', '456', 'John', 'Reply content');
      
      expect(result).toEqual({ id: '789', commentId: '123', author: 'John', content: 'Reply content' });
      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/comments/123/reply', 
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Authorization': 'Bearer fakeToken',
            'Content-Type': 'application/json',
          }),
          body: JSON.stringify({ author: 'John', content: 'Reply content', postId: '456' }),
        })
      );
    });

    it('deve lançar erro se a resposta ao comentário falhar', async () => {

      AsyncStorage.getItem.mockResolvedValue('fakeToken');
      
      fetch.mockResolvedValue({ ok: false });

      await expect(commentService.replyToComment('123', '456', 'John', 'Reply content')).rejects.toThrow('Erro ao responder comentário');
    });
  });
});
