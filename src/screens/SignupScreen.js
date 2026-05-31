import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Header from '../components/Header';
import Card from '../components/Card';
import TextField from '../components/TextField';
import AppButton from '../components/AppButton';
import { registerUser } from '../services/storageService';
import { colors } from '../theme/colors';

export default function SignupScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSignup() {
    setError('');

    if (!username.trim() || !email.trim() || !password.trim()) {
      setError('Nama pengguna, email, dan kata sandi wajib diisi.');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      setError('Format email tidak valid.');
      return;
    }

    if (password.length < 6) {
      setError('Kata sandi minimal 6 karakter.');
      return;
    }

    try {
      const user = await registerUser({ username, email, password });
      navigation.replace('Home', { user });
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Header title="Daftar ResepMakan" subtitle="Buat akun untuk menyimpan resep favorit secara lokal." />

      <Card>
        <TextField
          label="Nama Pengguna"
          placeholder="Masukkan nama pengguna"
          value={username}
          onChangeText={setUsername}
        />

        <TextField
          label="Email"
          placeholder="contoh@email.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <TextField
          label="Kata Sandi"
          placeholder="Minimal 6 karakter"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <AppButton title="Daftar" onPress={handleSignup} />
      </Card>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Sudah punya akun? Masuk</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 22,
    justifyContent: 'center'
  },
  error: {
    color: colors.danger,
    fontWeight: '800',
    marginBottom: 4
  },
  link: {
    color: colors.primary,
    textAlign: 'center',
    marginTop: 16,
    fontWeight: '900'
  }
});
