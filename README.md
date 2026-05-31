# ResepMakan Evidence App

ResepMakan Evidence App adalah aplikasi mobile berbasis Expo React Native yang dibuat untuk memenuhi kebutuhan evidence submission.

## Konsep Aplikasi

Aplikasi ini bertema resep makanan. Pengguna dapat mendaftar, login, melihat daftar resep, membuka detail resep, menyimpan resep favorit secara lokal, melihat data resep dari API eksternal, mengatur preferensi aplikasi, dan menguji notifikasi.

## Fitur

- Signup dengan nama pengguna, email, dan kata sandi
- Login dengan email dan kata sandi
- Validasi error signup
- Validasi error login
- Home screen dengan logo dan daftar resep
- Detail screen berisi informasi resep
- Favorit/Profile dengan penyimpanan persistensi menggunakan AsyncStorage
- Integrasi API eksternal
- Menu pengaturan
- Layar pengaturan
- Konfigurasi dan test notification
- 9 user stories di file markdown

## Cara Menjalankan

```bash
npm install
npx expo start -c
```

Tekan:

```bash
i
```

untuk membuka iOS Simulator.

## File Penting Untuk GitHub Evidence

| Kebutuhan | File |
|---|---|
| User stories | `docs/user-stories.md` |
| Implementasi signup | `src/screens/SignupScreen.js` |
| Implementasi login | `src/screens/LoginScreen.js` |
| Implementasi home | `src/screens/HomeScreen.js` |
| Implementasi detail | `src/screens/DetailScreen.js` |
| Implementasi local storage | `src/services/storageService.js` |
| Implementasi API | `src/services/apiService.js` dan `src/screens/ApiRecipeScreen.js` |
| Implementasi menu pengaturan | `src/components/SettingsMenu.js` |
| Implementasi layar pengaturan | `src/screens/SettingsScreen.js` |
| Implementasi notifikasi | `src/services/notificationService.js` dan `src/screens/NotificationScreen.js` |

## Catatan Dependency

Versi React dibuat exact agar tidak terjadi error version mismatch:

```json
"react": "19.2.3",
"react-native": "0.85.0"
```

Jangan menjalankan `npm audit fix --force` karena bisa mengubah dependency Expo.
