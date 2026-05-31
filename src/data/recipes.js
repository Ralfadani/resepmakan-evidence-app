export const localRecipes = [
  {
    id: 'r1',
    title: 'Nasi Goreng Kampung',
    category: 'Makanan Utama',
    difficulty: 'Mudah',
    duration: '20 menit',
    calories: '430 kcal',
    imageIcon: '🍛',
    summary: 'Nasi goreng sederhana dengan bumbu bawang, cabai, telur, dan kecap.',
    ingredients: ['Nasi putih', 'Telur', 'Bawang merah', 'Bawang putih', 'Cabai', 'Kecap manis', 'Garam'],
    steps: [
      'Tumis bawang merah, bawang putih, dan cabai hingga harum.',
      'Masukkan telur lalu orak-arik hingga matang.',
      'Tambahkan nasi putih dan aduk rata.',
      'Masukkan kecap, garam, lalu koreksi rasa.',
      'Sajikan hangat dengan topping sesuai selera.'
    ]
  },
  {
    id: 'r2',
    title: 'Ayam Teriyaki',
    category: 'Protein',
    difficulty: 'Sedang',
    duration: '30 menit',
    calories: '510 kcal',
    imageIcon: '🍗',
    summary: 'Ayam saus teriyaki manis gurih cocok untuk bekal makan siang.',
    ingredients: ['Dada ayam', 'Saus teriyaki', 'Bawang bombay', 'Kecap asin', 'Madu', 'Merica'],
    steps: [
      'Potong ayam sesuai selera.',
      'Tumis bawang bombay hingga layu.',
      'Masukkan ayam dan masak hingga berubah warna.',
      'Tambahkan saus teriyaki, kecap asin, madu, dan merica.',
      'Masak hingga saus meresap.'
    ]
  },
  {
    id: 'r3',
    title: 'Soto Ayam Bening',
    category: 'Sup',
    difficulty: 'Sedang',
    duration: '45 menit',
    calories: '390 kcal',
    imageIcon: '🍲',
    summary: 'Soto ayam kuah bening dengan aroma rempah yang segar.',
    ingredients: ['Ayam', 'Serai', 'Daun salam', 'Bawang putih', 'Kunyit', 'Soun', 'Kol', 'Telur rebus'],
    steps: [
      'Rebus ayam hingga matang lalu suwir.',
      'Tumis bumbu halus bersama serai dan daun salam.',
      'Masukkan bumbu ke kuah kaldu.',
      'Siapkan soun, kol, telur, dan ayam suwir.',
      'Tuang kuah panas dan sajikan.'
    ]
  },
  {
    id: 'r4',
    title: 'Pancake Pisang',
    category: 'Sarapan',
    difficulty: 'Mudah',
    duration: '15 menit',
    calories: '280 kcal',
    imageIcon: '🥞',
    summary: 'Pancake pisang lembut untuk sarapan cepat dan praktis.',
    ingredients: ['Pisang matang', 'Tepung terigu', 'Telur', 'Susu', 'Baking powder', 'Madu'],
    steps: [
      'Haluskan pisang matang.',
      'Campur pisang, telur, susu, tepung, dan baking powder.',
      'Panaskan teflon anti lengket.',
      'Tuang adonan sedikit demi sedikit.',
      'Masak hingga kedua sisi kecokelatan.'
    ]
  },
  {
    id: 'r5',
    title: 'Salad Buah Yogurt',
    category: 'Dessert',
    difficulty: 'Mudah',
    duration: '10 menit',
    calories: '220 kcal',
    imageIcon: '🥗',
    summary: 'Salad buah segar dengan saus yogurt yang ringan.',
    ingredients: ['Apel', 'Melon', 'Anggur', 'Stroberi', 'Yogurt plain', 'Madu', 'Keju parut'],
    steps: [
      'Potong semua buah sesuai selera.',
      'Campur yogurt plain dan madu.',
      'Masukkan buah ke mangkuk.',
      'Tuang saus yogurt.',
      'Tambahkan keju parut bila suka.'
    ]
  }
];

export const mealDbSearchUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=chicken';
