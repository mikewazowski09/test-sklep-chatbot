# Quick Start Guide - Music MVP

## ⚡ Szybkie Uruchomienie (5 minut)

### 1. Clone i Setup
```bash
# Zainstaluj wszystkie dependencies
npm run install:all

# Skopiuj przykładowy plik konfiguracyjny
cp backend/.env.example backend/.env
```

### 2. MongoDB Setup

**Opcja A: MongoDB lokalnie (Ubuntu/Debian)**
```bash
sudo apt-get install -y mongodb
sudo systemctl start mongodb
```

**Opcja B: MongoDB Atlas (Cloud)**
1. Utwórz darmowe konto na https://cloud.mongodb.com/
2. Stwórz cluster
3. Skopiuj connection string do `backend/.env`:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/music-mvp
```

### 3. Uruchom Aplikację
```bash
# Uruchom frontend i backend jednocześnie
npm run dev
```

### 4. Otwórz w przeglądarce
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

### 5. Test Application

1. **Zarejestruj się** - utwórz nowe konto (username min. 3 znaki, hasło min. 6 znaków)
2. **Browse Songs** - aplikacja automatycznie załaduje 5 przykładowych piosenek
3. **Play Music** - kliknij Play przy wybranym utworze (uwaga: tylko placeholder audio)
4. **Create Playlist** - kliknij "+" przy utworze aby dodać do playlisty
5. **Manage Playlists** - przejdź do "My Playlists" w header

## 🔧 Rozwiązywanie Problemów

**Problem: MongoDB connection failed**
```bash
# Sprawdź czy MongoDB działa
sudo systemctl status mongodb

# Uruchom MongoDB
sudo systemctl start mongodb
```

**Problem: Port 3000/5000 zajęty**
```bash
# Znajdź i zatrzymaj proces
sudo lsof -i :3000
sudo lsof -i :5000
```

**Problem: npm install errors**
```bash
# Wyczyść cache i reinstaluj
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

## 📱 Testowanie Features

### Auth System
- ✅ Rejestracja nowego użytkownika
- ✅ Logowanie z istniejącymi credentials  
- ✅ JWT token authentication
- ✅ Logout functionality

### Music Player
- ✅ Play/Pause kontrolki
- ✅ Previous/Next track
- ✅ Volume control
- ✅ Progress bar seeking
- ⚠️ Audio files (placeholder URLs - dodaj prawdziwe MP3)

### Playlist Management
- ✅ Tworzenie nowych playlist
- ✅ Dodawanie utworów do playlist
- ✅ Usuwanie utworów z playlist
- ✅ Usuwanie całych playlist
- ✅ Browse playlist details

### Search & Browse
- ✅ Search przez tytuł/artystę/album
- ✅ Lista wszystkich utworów
- ✅ Responsive design

## 🎵 Dodawanie Prawdziwych Plików Audio

1. Dodaj pliki MP3 do `frontend/public/audio/`
2. Zaktualizuj sample data w `backend/routes/songs.js`:
```javascript
audioUrl: "/audio/your-song.mp3"
```

## 📚 API Endpoints

```
POST /api/auth/register     - Rejestracja
POST /api/auth/login        - Logowanie
GET  /api/songs             - Lista utworów
POST /api/playlists         - Nowa playlista  
GET  /api/playlists/my      - Moje playlisty
```

---

**Uwaga:** To jest MVP (Minimum Viable Product) - podstawowa wersja do demonstracji funkcjonalności. Dla production potrzebne są dodatkowe funkcje bezpieczeństwa, optymalizacji i obsługi błędów.