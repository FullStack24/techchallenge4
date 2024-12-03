import postService from 'services/postService';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('@react-native-async-storage/async-storage');
jest.mock('node-fetch', () => jest.fn());
const fetch = require('node-fetch');

describe('postService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createPost', () => {
    it('deve criar um post com sucesso', async () => {
      const mockResponse = { id: '1', title: 'Post title', content: 'Post content' };
      

      AsyncStorage.getItem.mockResolvedValue('fakeToken');
      
      fetch.mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      });

      const postData = { title: 'Post title', content: 'Post content', author: 'Author' };

      const result = await postService.createPost(postData);

      expect(result).toEqual(mockResponse);
      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/posts',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Authorization': 'Bearer fakeToken',
            'Content-Type': 'application/json',
          }),
          body: JSON.stringify(postData),
        })
      );
    });

    it('deve lançar erro se a criação do post falhar', async () => {

      fetch.mockResolvedValue({
        ok: false,
        json: async () => ({ message: 'Erro ao criar postagem' }),
      });

      const postData = { title: 'Post title', content: 'Post content', author: 'Author' };

      await expect(postService.createPost(postData)).rejects.toThrow('Erro ao criar postagem');
    });
  });

  describe('getPostById', () => {
    it('deve buscar um post pelo id com sucesso', async () => {
      const mockResponse = { id: '1', title: 'Post title', content: 'Post content' };


      AsyncStorage.getItem.mockResolvedValue('fakeToken');

      fetch.mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await postService.getPostById('1');

      expect(result).toEqual(mockResponse);
      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/posts/1',
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            'Authorization': 'Bearer fakeToken',
            'Content-Type': 'application/json',
          }),
        })
      );
    });

    it('deve lançar erro se buscar o post falhar', async () => {

      fetch.mockResolvedValue({
        ok: false,
        json: async () => ({ message: 'Erro ao buscar post' }),
      });

      await expect(postService.getPostById('1')).rejects.toThrow('Erro ao buscar post');
    });
  });

  describe('updatePost', () => {
    it('deve atualizar um post com sucesso', async () => {
      const mockResponse = { id: '1', title: 'Updated Post', content: 'Updated content' };


      AsyncStorage.getItem.mockResolvedValue('fakeToken');

      fetch.mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      });

      const postData = { title: 'Updated Post', content: 'Updated content' };

      const result = await postService.updatePost('1', postData);

      expect(result).toEqual(mockResponse);
      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/posts/1',
        expect.objectContaining({
          method: 'PUT',
          headers: expect.objectContaining({
            'Authorization': 'Bearer fakeToken',
            'Content-Type': 'application/json',
          }),
          body: JSON.stringify(postData),
        })
      );
    });

    it('deve lançar erro se a atualização do post falhar', async () => {

      fetch.mockResolvedValue({
        ok: false,
        json: async () => ({ message: 'Erro ao atualizar post' }),
      });

      const postData = { title: 'Updated Post', content: 'Updated content' };

      await expect(postService.updatePost('1', postData)).rejects.toThrow('Erro ao atualizar post');
    });
  });

  describe('deletePost', () => {
    it('deve excluir um post com sucesso', async () => {

      AsyncStorage.getItem.mockResolvedValue('fakeToken');

      fetch.mockResolvedValue({
        ok: true,
        json: async () => ({ message: 'Post deletado com sucesso' }),
      });

      const result = await postService.deletePost('1');

      expect(result).toEqual({ message: 'Post deletado com sucesso' });
      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/posts/1',
        expect.objectContaining({
          method: 'DELETE',
          headers: expect.objectContaining({
            'Authorization': 'Bearer fakeToken',
            'Content-Type': 'application/json',
          }),
        })
      );
    });

    it('deve lançar erro se a exclusão do post falhar', async () => {

      fetch.mockResolvedValue({
        ok: false,
        json: async () => ({ message: 'Erro ao excluir post' }),
      });

      await expect(postService.deletePost('1')).rejects.toThrow('Erro ao excluir post');
    });
  });

  describe('getAllPosts', () => {
    it('deve buscar todos os posts com sucesso', async () => {
      const mockResponse = [{ id: '1', title: 'Post 1', content: 'Content 1' }, { id: '2', title: 'Post 2', content: 'Content 2' }];


      AsyncStorage.getItem.mockResolvedValue('fakeToken');

      fetch.mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await postService.getAllPosts();

      expect(result).toEqual(mockResponse);
      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/posts',
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            'Authorization': 'Bearer fakeToken',
            'Content-Type': 'application/json',
          }),
        })
      );
    });

    it('deve lançar erro se buscar todos os posts falhar', async () => {

      fetch.mockResolvedValue({
        ok: false,
        json: async () => ({ message: 'Erro ao buscar todos os posts' }),
      });

      await expect(postService.getAllPosts()).rejects.toThrow('Erro ao buscar todos os posts');
    });
  });

  describe('likePost', () => {
    it('deve dar like no post com sucesso', async () => {
      const mockResponse = { id: '1', title: 'Post title', content: 'Post content', likes: 1 };


      AsyncStorage.getItem.mockResolvedValue('fakeToken');

      fetch.mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await postService.likePost('1');

      expect(result).toEqual(mockResponse);
      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/posts/1/like',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Authorization': 'Bearer fakeToken',
            'Content-Type': 'application/json',
          }),
        })
      );
    });

    it('deve lançar erro se dar like no post falhar', async () => {

      fetch.mockResolvedValue({
        ok: false,
        json: async () => ({ message: 'Erro ao dar like no post' }),
      });

      await expect(postService.likePost('1')).rejects.toThrow('Erro ao dar like no post');
    });
  });
});
