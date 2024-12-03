import userService from 'services/userService';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('@react-native-async-storage/async-storage');
jest.mock('node-fetch', () => jest.fn());
const fetch = require('node-fetch');

describe('userService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getUserById', () => {
    it('deve buscar um usuário pelo id com sucesso', async () => {
      const mockResponse = { id: '1', name: 'John Doe', email: 'john@example.com' };

      AsyncStorage.getItem.mockResolvedValue('fakeToken');

      fetch.mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await userService.getUserById('1');

      expect(result).toEqual(mockResponse);
      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/users/1',
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            'Authorization': 'Bearer fakeToken',
            'Content-Type': 'application/json',
          }),
        })
      );
    });

    it('deve retornar null se a busca pelo usuário falhar', async () => {

      fetch.mockResolvedValue({
        ok: false,
        json: async () => ({ message: 'Erro ao buscar usuário' }),
      });

      const result = await userService.getUserById('1');

      expect(result).toBeNull();
      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/users/1',
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            'Authorization': 'Bearer fakeToken',
            'Content-Type': 'application/json',
          }),
        })
      );
    });
  });

  describe('updateUser', () => {
    it('deve atualizar um usuário com sucesso', async () => {
      const mockResponse = { id: '1', name: 'John Doe', email: 'john@example.com' };
      const userData = { name: 'Jane Doe' };

      AsyncStorage.getItem.mockResolvedValue('fakeToken');

      fetch.mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await userService.updateUser('1', userData);

      expect(result).toEqual(mockResponse);
      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/users/1',
        expect.objectContaining({
          method: 'PUT',
          headers: expect.objectContaining({
            'Authorization': 'Bearer fakeToken',
            'Content-Type': 'application/json',
          }),
          body: JSON.stringify(userData),
        })
      );
    });

    it('deve retornar null se a atualização do usuário falhar', async () => {
      const userData = { name: 'Jane Doe' };

      fetch.mockResolvedValue({
        ok: false,
        json: async () => ({ message: 'Erro ao atualizar usuário' }),
      });

      const result = await userService.updateUser('1', userData);

      expect(result).toBeNull();
      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/users/1',
        expect.objectContaining({
          method: 'PUT',
          headers: expect.objectContaining({
            'Authorization': 'Bearer fakeToken',
            'Content-Type': 'application/json',
          }),
          body: JSON.stringify(userData),
        })
      );
    });
  });

  describe('listAllUsers', () => {
    it('deve listar todos os usuários com sucesso', async () => {
      const mockResponse = [
        { id: '1', name: 'John Doe', email: 'john@example.com' },
        { id: '2', name: 'Jane Doe', email: 'jane@example.com' },
      ];


      AsyncStorage.getItem.mockResolvedValue('fakeToken');

      fetch.mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await userService.listAllUsers();

      expect(result).toEqual(mockResponse);
      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/users',
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            'Authorization': 'Bearer fakeToken',
            'Content-Type': 'application/json',
          }),
        })
      );
    });

    it('deve retornar lista vazia se listar os usuários falhar', async () => {

      fetch.mockResolvedValue({
        ok: false,
        json: async () => ({ message: 'Erro ao buscar usuários' }),
      });

      const result = await userService.listAllUsers();

      expect(result).toEqual([]);
      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/users',
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            'Authorization': 'Bearer fakeToken',
            'Content-Type': 'application/json',
          }),
        })
      );
    });
  });

  describe('deleteUser', () => {
    it('deve excluir um usuário com sucesso', async () => {

      AsyncStorage.getItem.mockResolvedValue('fakeToken');

      fetch.mockResolvedValue({
        ok: true,
        json: async () => ({ message: 'Usuário deletado com sucesso' }),
      });

      await expect(userService.deleteUser('1')).resolves.not.toThrow();
      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/users/1',
        expect.objectContaining({
          method: 'DELETE',
          headers: expect.objectContaining({
            'Authorization': 'Bearer fakeToken',
            'Content-Type': 'application/json',
          }),
        })
      );
    });

    it('deve lançar erro se a exclusão do usuário falhar', async () => {

      fetch.mockResolvedValue({
        ok: false,
        json: async () => ({ message: 'Erro ao excluir usuário' }),
      });

      await expect(userService.deleteUser('1')).rejects.toThrow('Erro ao excluir usuário');
    });
  });
});
