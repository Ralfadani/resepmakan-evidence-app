import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Header from '../components/Header';
import Card from '../components/Card';
import RecipeBadge from '../components/RecipeBadge';
import SettingsMenu from '../components/SettingsMenu';
import { localRecipes } from '../data/recipes';
import { colors } from '../theme/colors';

export default function HomeScreen({ navigation, route }) {
  const user = route?.params?.user;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Header
        title="ResepMakan"
        subtitle={`Halo, ${user?.username || 'Foodies'}! Pilih resep favoritmu hari ini.`}
      />

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>5</Text>
          <Text style={styles.statLabel}>Resep Lokal</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>API</Text>
          <Text style={styles.statLabel}>TheMealDB</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>⭐</Text>
          <Text style={styles.statLabel}>Favorit</Text>
        </View>
      </View>

      <View style={styles.navRow}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('ApiRecipe')}>
          <Text style={styles.navIcon}>🌐</Text>
          <Text style={styles.navText}>API Resep</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.navIcon}>⭐</Text>
          <Text style={styles.navText}>Favorit</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Menu')}>
          <Text style={styles.navIcon}>⚙️</Text>
          <Text style={styles.navText}>Menu</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Rekomendasi Resep</Text>

      {localRecipes.map(recipe => (
        <TouchableOpacity
          key={recipe.id}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('Detail', { recipe })}
        >
          <Card>
            <View style={styles.recipeTop}>
              <Text style={styles.foodIcon}>{recipe.imageIcon}</Text>
              <View style={styles.recipeContent}>
                <View style={styles.recipeHeader}>
                  <RecipeBadge>{recipe.category}</RecipeBadge>
                  <Text style={styles.difficulty}>{recipe.difficulty}</Text>
                </View>

                <Text style={styles.recipeTitle}>{recipe.title}</Text>
                <Text style={styles.summary}>{recipe.summary}</Text>

                <View style={styles.metaRow}>
                  <Text style={styles.meta}>⏱ {recipe.duration}</Text>
                  <Text style={styles.meta}>🔥 {recipe.calories}</Text>
                </View>

                <Text style={styles.openDetail}>Lihat resep →</Text>
              </View>
            </View>
          </Card>
        </TouchableOpacity>
      ))}

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
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding: 13
  },
  statNumber: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 18
  },
  statLabel: {
    color: '#FFEDD5',
    marginTop: 3,
    fontWeight: '800',
    fontSize: 12
  },
  navRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20
  },
  navItem: {
    flex: 1,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    padding: 12,
    alignItems: 'center'
  },
  navIcon: {
    fontSize: 25,
    marginBottom: 5
  },
  navText: {
    color: colors.text,
    fontWeight: '900',
    fontSize: 13
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 12
  },
  recipeTop: {
    flexDirection: 'row',
    gap: 13
  },
  foodIcon: {
    fontSize: 42
  },
  recipeContent: {
    flex: 1
  },
  recipeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },
  difficulty: {
    color: colors.muted,
    fontWeight: '800'
  },
  recipeTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900'
  },
  summary: {
    color: colors.muted,
    marginTop: 6,
    lineHeight: 21
  },
  metaRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 10
  },
  meta: {
    color: colors.primaryDark,
    fontWeight: '800'
  },
  openDetail: {
    color: colors.primary,
    fontWeight: '900',
    marginTop: 12
  }
});
