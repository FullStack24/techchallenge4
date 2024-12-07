import React, { useState, useContext } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import useAuth from '@/hooks/useAuth';

interface FooterProps {
    userRole: string | null;
    onLogout: () => void;
    onNavigateTo: (screen: string) => void;
}

const Footer: React.FC<FooterProps> = ({ userRole, onLogout, onNavigateTo }) => {
    const [menuVisible, setMenuVisible] = useState(false);
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    const options = userRole === 'teacher' ? [
        { label: 'Sala do Professor', value: '/teachers/ListTeachersScreen' },
        { label: 'Sala do Aluno', value: '/students/ListStudentsScreen' },
        { label: 'Sala do Admin', value: '/admin/AdminScreen' },
    ] : [];

    const handleHomeNavigation = () => {
        if (isAuthenticated) {
            router.push('/home/HomeScreen');
        } else {
            router.push('/auth/LoginScreen');
        }
    };

    return (
        <View style={styles.bottomNav}>
            {userRole === 'teacher' && (
                <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)} style={styles.menuButton}>
                    <Icon name="book" size={24} color="#FFFFFF" />
                    <Text style={styles.navText}>Salas</Text>
                </TouchableOpacity>
            )}
            {menuVisible && (
                <View style={styles.menu}>
                    <FlatList
                        data={options}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => {
                                    onNavigateTo(item.value);
                                    setMenuVisible(false);
                                }}
                                style={styles.menuOption}
                            >
                                <Text style={styles.menuText}>{item.label}</Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={item => item.value}
                    />
                </View>
            )}
            <TouchableOpacity onPress={handleHomeNavigation} style={styles.navItem}>
                <Icon name="home" size={24} color="#FFFFFF" />
                <Text style={styles.navText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onLogout} style={styles.navItem}>
                <Icon name="sign-out" size={24} color="#FFFFFF" />
                <Text style={styles.navText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    bottomNav: {
        flexDirection: 'row',
        backgroundColor: '#FF6B6B',
        paddingVertical: 5,
        paddingBottom: 15,
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        width: '100%',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    navItem: {
        alignItems: 'center',
    },
    menuButton: {
        alignItems: 'center',
    },
    navText: {
        color: '#FFFFFF',
        fontSize: 12,
        marginTop: 2,
    },
    menu: {
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        position: 'absolute',
        bottom: 50,
        left: 10,
        right: 10,
        padding: 10,
        elevation: 5,
        zIndex: 1000,
    },
    menuOption: {
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    menuText: {
        color: '#000000',
        fontSize: 16,
        textAlign: 'left',
    },
});

export default Footer;