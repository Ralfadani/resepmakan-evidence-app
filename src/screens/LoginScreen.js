import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Header from '../components/Header';
import Card from '../components/Card';
import TextField from '../components/TextField';
import AppButton from '../components/AppButton';
import { loginUser } from '../services/storageService';
import { colors } from '../theme/colors';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleLogin() {
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Email dan kata sandi wajib diisi.');
      return;
    }

    try {
      const user = await loginUser({ email, password });
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
      <Header title="ResepMakan" subtitle="Masuk untuk menyimpan resep favorit dan melihat rekomendasi masakan." />

      <Card>
        <Text style={styles.title}>Masuk Akun</Text>
        <Text style={styles.desc}>Gunakan email dan kata sandi yang sudah terdaftar.</Text>

        <TextField
          label="Email"
          placeholder="contoh@email.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <TextField
          label="Kata Sandi"
          placeholder="Masukkan kata sandi"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <AppButton title="Masuk" onPress={handleLogin} />
      </Card>

      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.link}>Belum punya akun? Daftar</Text>
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
  title: {
    color: colors.text,
    fontWeight: '900',
    fontSize: 22,
    marginBottom: 5
  },
  desc: {
    color: colors.muted,
    marginBottom: 14,
    lineHeight: 20
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
