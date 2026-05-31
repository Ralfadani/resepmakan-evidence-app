import React, { useEffect, useState } from 'react';
import { ScrollView, Text, ActivityIndicator, Image, StyleSheet } from 'react-native';
import Header from '../components/Header';
import Card from '../components/Card';
import AppButton from '../components/AppButton';
import { fetchExternalRecipes } from '../services/apiService';
import { mealDbSearchUrl } from '../data/recipes';
import { colors } from '../theme/colors';

export default function ApiRecipeScreen() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadApiData() {
    setLoading(true);
    setError('');

    try {
      const data = await fetchExternalRecipes();
      setRecipes(data);
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadApiData();
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Header title="API Resep Eksternal" subtitle="Data makanan diambil dari TheMealDB API." />

      <Card>
        <Text style={styles.sectionTitle}>Endpoint API</Text>
        <Text style={styles.endpoint}>{mealDbSearchUrl}</Text>
        <AppButton title="Muat Ulang Data API" onPress={loadApiData} variant="secondary" />
      </Card>

      {loading ? <ActivityIndicator size="large" color={colors.primary} /> : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}

      {recipes.map(recipe => (
        <Card key={recipe.id}>
          {recipe.image ? <Image source={{ uri: recipe.image }} style={styles.image} /> : null}
          <Text style={styles.source}>{recipe.source}</Text>
          <Text style={styles.title}>{recipe.title}</Text>
          <Text style={styles.meta}>{recipe.category} • {recipe.area}</Text>
          <Text style={styles.instructions} numberOfLines={4}>{recipe.instructions}</Text>
        </Card>
      ))}
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
  sectionTitle: {
    color: colors.text,
    fontWeight: '900',
    fontSize: 18
  },
  endpoint: {
    color: colors.primary,
    marginTop: 8,
    fontWeight: '800'
  },
  error: {
    color: colors.danger,
    fontWeight: '900',
    marginBottom: 12
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 18,
    marginBottom: 12
  },
  source: {
    color: colors.success,
    fontWeight: '900',
    marginBottom: 5
  },
  title: {
    color: colors.text,
    fontWeight: '900',
    fontSize: 18,
    marginBottom: 4
  },
  meta: {
    color: colors.primaryDark,
    fontWeight: '800',
    marginBottom: 8
  },
  instructions: {
    color: colors.muted,
    lineHeight: 22
  }
});
