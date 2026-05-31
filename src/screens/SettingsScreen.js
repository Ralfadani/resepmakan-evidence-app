import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, Switch, StyleSheet } from 'react-native';
import Header from '../components/Header';
import Card from '../components/Card';
import AppButton from '../components/AppButton';
import { getSettings, saveSettings } from '../services/storageService';
import { colors } from '../theme/colors';

export default function SettingsScreen() {
  const [settings, setSettings] = useState({
    notificationEnabled: false,
    vegetarianMode: false,
    autoSaveFavorite: true,
    language: 'Indonesia'
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function loadSettings() {
      const saved = await getSettings();
      setSettings(saved);
    }

    loadSettings();
  }, []);

  async function updateSetting(key, value) {
    const updated = { ...settings, [key]: value };
    setSettings(updated);
    await saveSettings(updated);
    setMessage('Pengaturan berhasil disimpan ke local storage.');
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Header title="Layar Pengaturan" subtitle="Atur preferensi aplikasi ResepMakan." />

      <Card>
        <SettingRow
          title="Notifikasi Resep"
          description="Aktifkan pengingat memasak."
          value={settings.notificationEnabled}
          onValueChange={value => updateSetting('notificationEnabled', value)}
        />

        <SettingRow
          title="Mode Vegetarian"
          description="Prioritaskan resep tanpa daging."
          value={settings.vegetarianMode}
          onValueChange={value => updateSetting('vegetarianMode', value)}
        />

        <SettingRow
          title="Auto Save Favorit"
          description="Simpan preferensi favorit secara otomatis."
          value={settings.autoSaveFavorite}
          onValueChange={value => updateSetting('autoSaveFavorite', value)}
        />

        <Text style={styles.language}>Bahasa aktif: {settings.language}</Text>

        <AppButton
          title="Gunakan Bahasa Indonesia"
          variant="secondary"
          onPress={() => updateSetting('language', 'Indonesia')}
        />
      </Card>

      {message ? (
        <Card>
          <Text style={styles.success}>{message}</Text>
        </Card>
      ) : null}
    </ScrollView>
  );
}

function SettingRow({ title, description, value, onValueChange }) {
  return (
    <View style={styles.row}>
      <View style={styles.rowText}>
        <Text style={styles.rowTitle}>{title}</Text>
        <Text style={styles.rowDesc}>{description}</Text>
      </View>
      <Switch value={value} onValueChange={onValueChange} />
    </View>
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
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    paddingVertical: 14
  },
  rowText: {
    flex: 1,
    paddingRight: 12
  },
  rowTitle: {
    color: colors.text,
    fontWeight: '900',
    fontSize: 16
  },
  rowDesc: {
    color: colors.muted,
    marginTop: 4,
    lineHeight: 20
  },
  language: {
    color: colors.text,
    fontWeight: '900',
    marginTop: 16
  },
  success: {
    color: colors.success,
    fontWeight: '900',
    textAlign: 'center'
  }
});
