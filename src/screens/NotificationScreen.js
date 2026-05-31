import React, { useState } from 'react';
import { ScrollView, Text, View, Switch, StyleSheet } from 'react-native';
import Header from '../components/Header';
import Card from '../components/Card';
import AppButton from '../components/AppButton';
import { triggerRecipeNotification } from '../services/notificationService';
import { colors } from '../theme/colors';

export default function NotificationScreen() {
  const [enabled, setEnabled] = useState(false);
  const [message, setMessage] = useState('');

  async function handleTestNotification() {
    try {
      await triggerRecipeNotification();
      setMessage('Notifikasi pengingat memasak berhasil dipicu.');
    } catch (err) {
      setMessage(err.message);
    }
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Header title="Pemberitahuan" subtitle="Konfigurasi dan uji notifikasi pengingat memasak." />

      <Card>
        <View style={styles.row}>
          <View style={styles.rowText}>
            <Text style={styles.title}>Aktifkan Notifikasi</Text>
            <Text style={styles.desc}>Switch ini digunakan sebagai bukti konfigurasi notifikasi.</Text>
          </View>
          <Switch value={enabled} onValueChange={setEnabled} />
        </View>

        <AppButton title="Uji Notifikasi Sekarang" onPress={handleTestNotification} />
      </Card>

      <Card>
        <Text style={styles.statusTitle}>Status Pengujian</Text>
        <Text style={styles.statusText}>
          {message || 'Belum ada notifikasi yang diuji.'}
        </Text>
      </Card>
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
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  rowText: {
    flex: 1,
    paddingRight: 12
  },
  title: {
    color: colors.text,
    fontWeight: '900',
    fontSize: 17
  },
  desc: {
    color: colors.muted,
    marginTop: 5,
    lineHeight: 21
  },
  statusTitle: {
    color: colors.text,
    fontWeight: '900',
    fontSize: 18,
    marginBottom: 8
  },
  statusText: {
    color: colors.success,
    fontWeight: '800',
    lineHeight: 22
  }
});
