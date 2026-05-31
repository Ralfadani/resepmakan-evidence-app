import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Card from './Card';
import { colors } from '../theme/colors';

export default function SettingsMenu({ onSettingsPress, onNotificationPress }) {
  return (
    <Card>
      <View style={styles.header}>
        <Text style={styles.bigIcon}>⚙️</Text>
        <View>
          <Text style={styles.title}>Menu Pengaturan</Text>
          <Text style={styles.subtitle}>Atur preferensi ResepMakan</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.item} onPress={onSettingsPress}>
        <Text style={styles.icon}>🛠️</Text>
        <View style={styles.itemText}>
          <Text style={styles.itemTitle}>Pengaturan Aplikasi</Text>
          <Text style={styles.itemDesc}>Bahasa, mode vegetarian, dan auto save</Text>
        </View>
        <Text style={styles.arrow}>›</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item} onPress={onNotificationPress}>
        <Text style={styles.icon}>🔔</Text>
        <View style={styles.itemText}>
          <Text style={styles.itemTitle}>Pemberitahuan</Text>
          <Text style={styles.itemDesc}>Konfigurasi dan uji pengingat memasak</Text>
        </View>
        <Text style={styles.arrow}>›</Text>
      </TouchableOpacity>
    </Card>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    marginBottom: 10
  },
  bigIcon: {
    fontSize: 30
  },
  title: {
    color: colors.text,
    fontWeight: '900',
    fontSize: 18
  },
  subtitle: {
    color: colors.muted,
    marginTop: 2
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderTopColor: colors.border,
    borderTopWidth: 1,
    paddingVertical: 14
  },
  icon: {
    fontSize: 24
  },
  itemText: {
    flex: 1
  },
  itemTitle: {
    color: colors.text,
    fontWeight: '900'
  },
  itemDesc: {
    color: colors.muted,
    marginTop: 2,
    lineHeight: 19
  },
  arrow: {
    color: colors.primary,
    fontSize: 28
  }
});
