import authService from 'services/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('@react-native-async-storage/async-storage');
jest.mock('node-fetch', () => jest.fn());
const fetch = require('node-fetch');

describe('authService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('deve registrar um novo usuário com sucesso', async () => {
      const mockResponse = {
        token: 'fakeToken',
        user: { role: 'user' },
      };


      AsyncStorage.setItem.mockResolvedValue(null);

      fetch.mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      });

      const registerData = {
        email: 'test@example.com',
        password: 'password123',
      };

      const result = await authService.register(registerData);

      expect(result).toEqual(mockResponse);
      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/auth/register',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
          body: JSON.stringify(registerData),
        })
      );
      expect(AsyncStorage.setItem).toHaveBeenCalledWith('userToken', 'fakeToken');
    });

    it('deve lançar erro se o token não for recebido', async () => {

      fetch.mockResolvedValue({
        ok: true,
        json: async () => ({ user: { role: 'user' } }),
      });

      const registerData = {
        email: 'test@example.com',
        password: 'password123',
      };

      await expect(authService.register(registerData)).rejects.toThrow('Token não recebido. Registro falhou.');
    });

    it('deve lançar erro se a resposta for negativa', async () => {
      const errorResponse = { message: 'Erro ao registrar' };

      fetch.mockResolvedValue({
        ok: false,
        json: async () => errorResponse,
      });

      const registerData = {
        email: 'test@example.com',
        password: 'password123',
      };

      await expect(authService.register(registerData)).rejects.toThrow('Erro ao registrar usuário');
    });
  });

  describe('login', () => {
    it('deve fazer login com sucesso', async () => {
      const mockResponse = {
        token: 'fakeToken',
        user: { role: 'user' },
      };


      AsyncStorage.setItem.mockResolvedValue(null);

      fetch.mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      });

      const loginData = {
        email: 'test@example.com',
        password: 'password123',
      };

      const result = await authService.login(loginData);

      expect(result).toEqual(mockResponse);
      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/auth/login',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
          body: JSON.stringify(loginData),
        })
      );
      expect(AsyncStorage.setItem).toHaveBeenCalledWith('userToken', 'fakeToken');
      expect(AsyncStorage.setItem).toHaveBeenCalledWith('userRole', 'user');
    });

    it('deve lançar erro se a resposta de login for negativa', async () => {
      const errorResponse = { message: 'Erro ao fazer login' };

      fetch.mockResolvedValue({
        ok: false,
        json: async () => errorResponse,
      });

      const loginData = {
        email: 'test@example.com',
        password: 'password123',
      };

      await expect(authService.login(loginData)).rejects.toThrow('Erro ao fazer login');
    });
  });

  describe('logout', () => {
    it('deve remover o token ao fazer logout', async () => {

      AsyncStorage.removeItem.mockResolvedValue(null);

      await authService.logout();

      expect(AsyncStorage.removeItem).toHaveBeenCalledWith('userToken');
    });
  });

  describe('getCurrentUser', () => {
    it('deve retornar o token do usuário se estiver presente no AsyncStorage', async () => {

      AsyncStorage.getItem.mockResolvedValue('fakeToken');

      const result = await authService.getCurrentUser();

      expect(result).toBe('fakeToken');
    });

    it('deve retornar null se não houver token no AsyncStorage', async () => {

      AsyncStorage.getItem.mockResolvedValue(null);

      const result = await authService.getCurrentUser();

      expect(result).toBeNull();
    });
  });
});
