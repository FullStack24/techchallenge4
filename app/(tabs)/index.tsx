import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import useAuth from '@/hooks/useAuth';
import LoginScreen from "@/app/(tabs)/auth/LoginScreen";

const IndexScreen: React.FC = () => {
    const router = useRouter();
    const { loading, isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated && !loading) {
            router.push('/home/HomeScreen');
        }
    }, [isAuthenticated, loading, router]);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return <LoginScreen />;
};

export default IndexScreen;