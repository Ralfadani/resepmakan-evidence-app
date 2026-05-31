import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

export default function RecipeBadge({ children }) {
  return <Text style={styles.badge}>{children}</Text>;
}

const styles = StyleSheet.create({
  badge: {
    backgroundColor: colors.chip,
    color: colors.primaryDark,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    overflow: 'hidden',
    fontWeight: '900'
  }
});
