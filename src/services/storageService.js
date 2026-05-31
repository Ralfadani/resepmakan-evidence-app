import AsyncStorage from '@react-native-async-storage/async-storage';

export const STORAGE_KEYS = {
  USERS: 'RESEPMAKAN_USERS',
  CURRENT_USER: 'RESEPMAKAN_CURRENT_USER',
  FAVORITES: 'RESEPMAKAN_FAVORITES',
  SETTINGS: 'RESEPMAKAN_SETTINGS'
};

export async function getJson(key, fallbackValue) {
  try {
    const rawValue = await AsyncStorage.getItem(key);
    return rawValue ? JSON.parse(rawValue) : fallbackValue;
  } catch (error) {
    console.error('Storage read error:', error);
    return fallbackValue;
  }
}

export async function setJson(key, value) {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}

export async function registerUser({ username, email, password }) {
  const users = await getJson(STORAGE_KEYS.USERS, []);
  const normalizedEmail = email.trim().toLowerCase();

  const exists = users.some(user => user.email === normalizedEmail);
  if (exists) {
    throw new Error('Email sudah terdaftar. Gunakan email lain.');
  }

  const newUser = {
    id: Date.now().toString(),
    username: username.trim(),
    email: normalizedEmail,
    password,
    createdAt: new Date().toISOString()
  };

  await setJson(STORAGE_KEYS.USERS, [...users, newUser]);
  await setJson(STORAGE_KEYS.CURRENT_USER, newUser);

  return newUser;
}

export async function loginUser({ email, password }) {
  const users = await getJson(STORAGE_KEYS.USERS, []);
  const normalizedEmail = email.trim().toLowerCase();

  const user = users.find(
    item => item.email === normalizedEmail && item.password === password
  );

  if (!user) {
    throw new Error('Email atau kata sandi salah.');
  }

  await setJson(STORAGE_KEYS.CURRENT_USER, user);
  return user;
}

export async function getCurrentUser() {
  return getJson(STORAGE_KEYS.CURRENT_USER, null);
}

export async function getFavorites() {
  return getJson(STORAGE_KEYS.FAVORITES, []);
}

export async function toggleFavorite(recipe) {
  const favorites = await getFavorites();
  const exists = favorites.some(item => item.id === recipe.id);

  const updatedFavorites = exists
    ? favorites.filter(item => item.id !== recipe.id)
    : [...favorites, { ...recipe, savedAt: new Date().toISOString() }];

  await setJson(STORAGE_KEYS.FAVORITES, updatedFavorites);
  return updatedFavorites;
}

export async function getSettings() {
  return getJson(STORAGE_KEYS.SETTINGS, {
    notificationEnabled: false,
    vegetarianMode: false,
    autoSaveFavorite: true,
    language: 'Indonesia'
  });
}

export async function saveSettings(settings) {
  await setJson(STORAGE_KEYS.SETTINGS, settings);
  return settings;
}
