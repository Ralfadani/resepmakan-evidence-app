import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Header from '../components/Header';
import SettingsMenu from '../components/SettingsMenu';
import { colors } from '../theme/colors';

export default function MenuScreen({ navigation }) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Header title="Menu Pengaturan" subtitle="Bukti ikon dan item menu pengaturan aplikasi." />

      <SettingsMenu
        onSettingsPress={() => navigation.navigate('Settings')}
        onNotificationPress={() => navigation.navigate('Notification')}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  content: {
    padding: 22,
    paddingTop: 56,
    paddingBottom: 40
  }
});
