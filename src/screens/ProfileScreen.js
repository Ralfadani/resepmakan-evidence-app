import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import Header from '../components/Header';
import Card from '../components/Card';
import { getCurrentUser, getFavorites } from '../services/storageService';
import { colors } from '../theme/colors';

export default function ProfileScreen() {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    async function loadData() {
      const currentUser = await getCurrentUser();
      const savedFavorites = await getFavorites();

      setUser(currentUser);
      setFavorites(savedFavorites);
    }

    loadData();
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Header title="Favorit & Profil" subtitle="Data favorit tersimpan menggunakan local storage." />

      <Card>
        <View style={styles.profileRow}>
          <Text style={styles.avatar}>{user?.username?.charAt(0)?.toUpperCase() || 'R'}</Text>
          <View>
            <Text style={styles.name}>{user?.username || 'Pengguna'}</Text>
            <Text style={styles.email}>{user?.email || '-'}</Text>
          </View>
        </View>
      </Card>

      <Card>
        <Text style={styles.sectionTitle}>Bukti Persistence</Text>
        <Text style={styles.text}>Storage Key: RESEPMAKAN_FAVORITES</Text>
        <Text style={styles.text}>Jumlah resep favorit: {favorites.length}</Text>
        <Text style={styles.text}>Data favorit ditampilkan kembali dari AsyncStorage.</Text>
      </Card>

      <Text style={styles.listTitle}>Resep Favorit</Text>

      {favorites.length === 0 ? (
        <Card>
          <Text style={styles.text}>Belum ada resep favorit. Buka detail resep lalu tekan Simpan ke Favorit.</Text>
        </Card>
      ) : (
        favorites.map(recipe => (
          <Card key={recipe.id}>
            <Text style={styles.recipeIcon}>{recipe.imageIcon || '🍽️'}</Text>
            <Text style={styles.recipeTitle}>{recipe.title}</Text>
            <Text style={styles.text}>{recipe.summary}</Text>
          </Card>
        ))
      )}
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
  profileRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center'
  },
  avatar: {
    width: 54,
    height: 54,
    backgroundColor: colors.primary,
    color: '#fff',
    borderRadius: 20,
    textAlign: 'center',
    paddingTop: 11,
    fontSize: 24,
    fontWeight: '900',
    overflow: 'hidden'
  },
  name: {
    color: colors.text,
    fontWeight: '900',
    fontSize: 18
  },
  email: {
    color: colors.muted,
    marginTop: 3
  },
  sectionTitle: {
    color: colors.text,
    fontWeight: '900',
    fontSize: 18,
    marginBottom: 8
  },
  text: {
    color: colors.muted,
    lineHeight: 22
  },
  listTitle: {
    color: colors.text,
    fontWeight: '900',
    fontSize: 20,
    marginBottom: 12
  },
  recipeIcon: {
    fontSize: 36,
    marginBottom: 6
  },
  recipeTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 6
  }
});
