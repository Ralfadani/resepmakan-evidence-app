import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import Header from '../components/Header';
import Card from '../components/Card';
import AppButton from '../components/AppButton';
import RecipeBadge from '../components/RecipeBadge';
import { getFavorites, toggleFavorite } from '../services/storageService';
import { colors } from '../theme/colors';

export default function DetailScreen({ route }) {
  const { recipe } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    async function loadStatus() {
      const favorites = await getFavorites();
      setIsFavorite(favorites.some(item => item.id === recipe.id));
    }
    loadStatus();
  }, []);

  async function handleToggleFavorite() {
    const favorites = await toggleFavorite(recipe);
    setIsFavorite(favorites.some(item => item.id === recipe.id));
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Header title="Detail Resep" subtitle="Informasi lengkap resep makanan." />

      <Card>
        <Text style={styles.icon}>{recipe.imageIcon}</Text>
        <RecipeBadge>{recipe.category}</RecipeBadge>
        <Text style={styles.title}>{recipe.title}</Text>
        <Text style={styles.summary}>{recipe.summary}</Text>

        <View style={styles.metaBox}>
          <Text style={styles.meta}>Tingkat: {recipe.difficulty}</Text>
          <Text style={styles.meta}>Durasi: {recipe.duration}</Text>
          <Text style={styles.meta}>Kalori: {recipe.calories}</Text>
        </View>
      </Card>

      <Card>
        <Text style={styles.sectionTitle}>Bahan-Bahan</Text>
        {recipe.ingredients.map((item, index) => (
          <Text key={index} style={styles.listItem}>• {item}</Text>
        ))}
      </Card>

      <Card>
        <Text style={styles.sectionTitle}>Langkah Memasak</Text>
        {recipe.steps.map((step, index) => (
          <Text key={index} style={styles.listItem}>{index + 1}. {step}</Text>
        ))}
      </Card>

      <Card>
        <Text style={styles.sectionTitle}>Status Penyimpanan Lokal</Text>
        <Text style={styles.statusText}>
          {isFavorite
            ? 'Resep ini sudah tersimpan di local storage sebagai favorit.'
            : 'Resep ini belum tersimpan di local storage.'}
        </Text>
      </Card>

      <AppButton
        title={isFavorite ? 'Hapus dari Favorit' : 'Simpan ke Favorit'}
        onPress={handleToggleFavorite}
        variant={isFavorite ? 'secondary' : 'primary'}
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
  },
  icon: {
    fontSize: 56,
    marginBottom: 8
  },
  title: {
    color: colors.text,
    fontSize: 26,
    fontWeight: '900',
    marginTop: 12
  },
  summary: {
    color: colors.muted,
    marginTop: 8,
    lineHeight: 22
  },
  metaBox: {
    backgroundColor: colors.surfaceSoft,
    borderRadius: 18,
    padding: 13,
    marginTop: 14
  },
  meta: {
    color: colors.text,
    fontWeight: '800',
    marginBottom: 4
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 8
  },
  listItem: {
    color: colors.muted,
    lineHeight: 24,
    marginBottom: 4
  },
  statusText: {
    color: colors.muted,
    lineHeight: 22
  }
});
