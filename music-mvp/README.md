# Music MVP - Spotify Clone

MVP aplikacji muzycznej wzorowanej na Spotify z React frontend i Node.js backend.

## 🚀 Funkcjonalności

- **Autoryzacja użytkowników** - rejestracja i logowanie (login/hasło)
- **Przeglądanie utworów** - lista dostępnych piosenek z mockowanymi danymi
- **Odtwarzacz muzyczny** - HTML5 audio player z kontrolkami
- **Zarządzanie playlistami** - tworzenie, dodawanie utworów, usuwanie
- **Wyszukiwanie** - znajdowanie utworów po tytule, artyście, albumie
- **Responsywny UI** - design wzorowany na Spotify z Tailwind CSS

## 🛠 Stack Technologiczny

**Frontend:**
- React 18 z TypeScript
- React Router DOM
- Tailwind CSS
- Axios
- React Icons
- Context API (React Hooks)

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs
- CORS

## 📦 Instalacja

### Wymagania
- Node.js 16+
- MongoDB (lokalnie lub Atlas)
- npm lub yarn

**Instalacja MongoDB (Ubuntu/Debian):**
```bash
sudo apt-get install -y mongodb
sudo systemctl start mongodb
sudo systemctl enable mongodb
```

**Alternatywnie:** Użyj MongoDB Atlas (cloud) - skopiuj connection string do `.env`

### Backend Setup

```bash
cd backend
npm install
```

Skonfiguruj zmienne środowiskowe w `.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/music-mvp
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

Uruchom backend:
```bash
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
```

Uruchom frontend:
```bash
npm start
```

### Szybkie Uruchomienie (Jedna komenda)

Po instalacji MongoDB uruchom cały stack:
```bash
# Zainstaluj wszystkie dependencies
npm run install:all

# Uruchom frontend i backend jednocześnie
npm run dev
```

Aplikacja będzie dostępna na:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## 🎵 Testowe Dane

Aplikacja automatycznie utworzy 5 przykładowych piosenek przy pierwszym uruchomieniu:

1. **Bohemian Rhapsody** - Queen
2. **Imagine** - John Lennon  
3. **Hotel California** - Eagles
4. **Billie Jean** - Michael Jackson
5. **Smells Like Teen Spirit** - Nirvana

**Uwaga:** Obecnie używane są placeholder audio URLs. Do pełnej funkcjonalności należy dodać rzeczywiste pliki MP3 do foldera `frontend/public/audio/`.

## 🎮 Użytkowanie

1. **Rejestracja/Logowanie**
   - Utwórz konto lub zaloguj się (min. 3 znaki username, 6 znaków hasło)

2. **Przeglądanie muzyki**
   - Główna strona zawiera listę wszystkich dostępnych utworów
   - Użyj wyszukiwarki aby filtrować po tytule/artyście/albumie

3. **Odtwarzanie**
   - Kliknij przycisk Play przy wybranym utworze
   - Kontroluj odtwarzanie w player'ze na dole strony
   - Używaj przycisków poprzedni/następny oraz regulacji głośności

4. **Playlisty**
   - Kliknij "+" przy utworze aby dodać do playlisty
   - Wybierz istniejącą playlistę lub utwórz nową
   - Przejdź do "My Playlists" aby zarządzać swoimi playlistami

## 🏗 Architektura

### Frontend (React)
```
src/
├── components/
│   ├── Auth/           # Komponenty logowania/rejestracji  
│   └── Music/          # Komponenty muzyczne (Player, SongCard)
├── contexts/           # React Context (Auth, Player)
├── pages/              # Główne strony aplikacji
├── services/           # API calls (axios)
└── types/              # TypeScript definitions
```

### Backend (Express)
```
backend/
├── models/             # Mongoose models (User, Song, Playlist)
├── routes/             # Express routes (auth, songs, playlists)
├── middleware/         # JWT authentication middleware
└── index.js            # Main server file
```

## 🔧 API Endpoints

### Auth
- `POST /api/auth/register` - Rejestracja
- `POST /api/auth/login` - Logowanie  
- `GET /api/auth/me` - Obecny użytkownik

### Songs
- `GET /api/songs` - Wszystkie utwory
- `GET /api/songs/:id` - Konkretny utwór
- `GET /api/songs/search/:query` - Wyszukiwanie
- `POST /api/songs/init-sample-data` - Inicjalizacja przykładowych danych

### Playlists
- `GET /api/playlists/my` - Playlisty użytkownika
- `POST /api/playlists` - Tworzenie playlisty
- `GET /api/playlists/:id` - Konkretna playlista
- `PUT /api/playlists/:id` - Edycja playlisty
- `DELETE /api/playlists/:id` - Usuwanie playlisty
- `POST /api/playlists/:id/songs` - Dodawanie utworu do playlisty
- `DELETE /api/playlists/:id/songs/:songId` - Usuwanie utworu z playlisty

## 🎨 UI/UX

- **Ciemna kolorystyka** inspirowana Spotify
- **Responsywny design** - działa na desktop i mobile  
- **Intuicyjne kontrolki** - przejrzyste i łatwe w użyciu
- **Hover effects** - interaktywne elementy
- **Loading states** - feedback dla użytkownika

## 🚧 Możliwe Rozszerzenia

- Upload własnych plików audio
- Obsługa obrazów/okładek
- Publiczne playlisty  
- System follow/obserwacji użytkowników
- Zaawansowana kolejka odtwarzania
- Last.fm integration
- Lyrics display
- Social features (współdzielenie, komentarze)

## 📝 Notatki Techniczne

- **Authentication:** JWT tokens przechowywane w localStorage
- **Audio Player:** Vanilla HTML5 Audio API
- **State Management:** React Context API
- **Styling:** Tailwind CSS z custom Spotify-theme
- **Database:** MongoDB z Mongoose ODM
- **Validation:** Client-side i server-side validation

## 🤝 Contributing

1. Fork project
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

MIT License - use freely for learning and personal projects.

---

**Uwaga:** To jest projekt MVP (Minimum Viable Product) stworzony w celach edukacyjnych. Nie zawiera wszystkich funkcjonalności pełnego odtwarzacza muzycznego.