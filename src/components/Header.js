import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

export default function Header({ title, subtitle }) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.logo}>
        <Text style={styles.logoText}>🍽️</Text>
      </View>
      <View style={styles.textBox}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    marginBottom: 18
  },
  logo: {
    width: 56,
    height: 56,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoText: {
    fontSize: 28
  },
  textBox: {
    flex: 1
  },
  title: {
    color: colors.text,
    fontWeight: '900',
    fontSize: 24
  },
  subtitle: {
    color: colors.muted,
    marginTop: 4,
    lineHeight: 20
  }
});
