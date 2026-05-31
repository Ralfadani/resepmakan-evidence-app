import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import HomeScreen from './src/screens/HomeScreen';
import DetailScreen from './src/screens/DetailScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import ApiRecipeScreen from './src/screens/ApiRecipeScreen';
import MenuScreen from './src/screens/MenuScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import NotificationScreen from './src/screens/NotificationScreen';
import { getCurrentUser } from './src/services/storageService';
import { colors } from './src/theme/colors';

const screens = {
  Login: LoginScreen,
  Signup: SignupScreen,
  Home: HomeScreen,
  Detail: DetailScreen,
  Profile: ProfileScreen,
  ApiRecipe: ApiRecipeScreen,
  Menu: MenuScreen,
  Settings: SettingsScreen,
  Notification: NotificationScreen
};

export default function App() {
  const [route, setRoute] = useState({ name: 'Login', params: {} });
  const [history, setHistory] = useState([]);

  useEffect(() => {
    async function restoreSession() {
      const user = await getCurrentUser();

      if (user) {
        setRoute({ name: 'Home', params: { user } });
      }
    }

    restoreSession();
  }, []);

  const navigation = {
    navigate: (name, params = {}) => {
      setHistory(prev => [...prev, route]);
      setRoute({ name, params });
    },
    replace: (name, params = {}) => {
      setHistory([]);
      setRoute({ name, params });
    },
    goBack: () => {
      setHistory(prev => {
        if (prev.length === 0) return prev;
        const updated = [...prev];
        const previous = updated.pop();
        setRoute(previous);
        return updated;
      });
    }
  };

  const Screen = screens[route.name] || LoginScreen;
  const showBackButton = history.length > 0 && route.name !== 'Login';

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />

      {showBackButton ? (
        <View style={styles.backWrapper}>
          <TouchableOpacity style={styles.backButton} onPress={navigation.goBack}>
            <Text style={styles.backText}>← Kembali</Text>
          </TouchableOpacity>
        </View>
      ) : null}

      <Screen navigation={navigation} route={route} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background
  },
  backWrapper: {
    position: 'absolute',
    top: 42,
    left: 18,
    zIndex: 20
  },
  backButton: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 13,
    paddingVertical: 8
  },
  backText: {
    color: colors.primary,
    fontWeight: '900'
  }
});
