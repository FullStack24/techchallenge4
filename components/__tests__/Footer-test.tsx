import * as React from 'react';
import renderer from 'react-test-renderer';
import Footer from '../HeaderFooter/Footer';
import { TouchableOpacity } from 'react-native';

const onHomeMock = jest.fn();
const onLogoutMock = jest.fn();
const onNavigateToMock = jest.fn();

describe('Footer', () => {
  it('deve renderizar corretamente para um usuário com papel de "teacher"', () => {
    const tree = renderer.create(
      <Footer
        userRole="teacher"
        onHome={onHomeMock}
        onLogout={onLogoutMock}
        onNavigateTo={onNavigateToMock}
      />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('deve renderizar corretamente para um usuário sem papel de "teacher"', () => {
    const tree = renderer.create(
      <Footer
        userRole={null}
        onHome={onHomeMock}
        onLogout={onLogoutMock}
        onNavigateTo={onNavigateToMock}
      />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('deve chamar "onHome" ao clicar no botão "Home"', () => {
    const component = renderer.create(
      <Footer
        userRole="teacher"
        onHome={onHomeMock}
        onLogout={onLogoutMock}
        onNavigateTo={onNavigateToMock}
      />
    );
    const homeButton = component.root.findByType(TouchableOpacity).findByProps({ children: 'Home' });
    homeButton.props.onPress();
    expect(onHomeMock).toHaveBeenCalledTimes(1);
  });

  it('deve chamar "onLogout" ao clicar no botão "Logout"', () => {
    const component = renderer.create(
      <Footer
        userRole="teacher"
        onHome={onHomeMock}
        onLogout={onLogoutMock}
        onNavigateTo={onNavigateToMock}
      />
    );
    const logoutButton = component.root.findByType(TouchableOpacity).findByProps({ children: 'Logout' });
    logoutButton.props.onPress();
    expect(onLogoutMock).toHaveBeenCalledTimes(1);
  });

  it('deve alternar a visibilidade do menu de navegação quando clicar no botão "Salas"', () => {
    const component = renderer.create(
      <Footer
        userRole="teacher"
        onHome={onHomeMock}
        onLogout={onLogoutMock}
        onNavigateTo={onNavigateToMock}
      />
    );

    const menuButton = component.root.findByType(TouchableOpacity).findByProps({ children: 'Salas' });
    menuButton.props.onPress();
    expect(component.root.findByType('FlatList')).toBeTruthy();

    menuButton.props.onPress();
    expect(() => component.root.findByType('FlatList')).toThrow();
  });
});
