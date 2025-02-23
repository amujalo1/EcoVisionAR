# Ecovision - Web Aplikacija za Smanjenje CO2

## Opis Projekta
Ecovision je web aplikacija osmišljena s ciljem smanjenja emisije CO2 kroz motivaciju korisnika da više hodaju, trče i koriste gradski prevoz. Korisnici su nagrađeni različitim popustima na proizvode dostupne u aplikaciji. Ova aplikacija potiče ekološki prihvatljiv način života kroz gamifikaciju i nagrade.

## Best Hackathon Mostar 2025
Aplikacija je razvijena tokom Best Hackathona u Mostaru od strane tima **Singleton**, koji čine:
- **Amer Mujalo**
- **Mario Prskalo**
- **Nedim Neimarlija**
- **Benjamin Bandić**

Projekat je razvijen u roku od **manje od 35 sati**.

---
## Struktura Projekta
Projekat se sastoji iz dva glavna dijela:
- **Client** - Frontend aplikacije razvijen u **React.js**, uz korištenje **Tailwind CSS**.
- **Server** - Backend razvijen u **Node.js** sa **MongoDB bazom** pomoću **Mongoose ORM-a**.

### **Folder struktura projekta**

```
.vite
client/
│── node_modules/
│── public/
│── src/
│   ├── api/
│   │   ├── api.js
│   ├── assets/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── ActivityForm.jsx
│   │   │   ├── ActivityIcon.jsx
│   │   │   ├── ActivityTab.jsx
│   │   │   ├── BottomBar.jsx
│   │   │   ├── Chart.jsx
│   │   │   ├── DailyQuest.jsx
│   │   │   ├── GPSTracker.jsx
│   │   │   ├── Layout.jsx
│   │   │   ├── Leaderboard.jsx
│   │   │   ├── LiquidGauge.jsx
│   │   │   ├── LogoutButton.jsx
│   │   │   ├── MonthlyQuest.jsx
│   │   │   ├── PhoneFrame.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── TopBar.jsx
│   │   │   ├── WeeklyQuest.jsx
│   │   │   ├── XpBar.jsx
│   ├── pages/
│   │   ├── ActivityPage.jsx
│   │   ├── CalculatorPage.jsx
│   │   ├── HomePage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── QuestPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── ShopPage.jsx
│   │   ├── StatsPage.jsx
│   ├── store/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   ├── main.jsx
│── index.html
│── tailwind.config.js
│── vite.config.js
│── package.json
│── package-lock.json

server/
│── models/
│── routes/
│── node_modules/
│── .env
│── index.js
│── package.json
│── package-lock.json
│── .gitignore
```

---
## Pokretanje Aplikacije

### **1. Pokretanje klijentskog (React) dijela**
Prvo instalirajte potrebne pakete:
```sh
cd client
npm install
```
Pokrenite aplikaciju:
```sh
npm run dev
```
Aplikacija će biti dostupna na `http://localhost:5173` (ili drugom portu ako je podešen).

### **2. Pokretanje serverskog (Node.js) dijela**
Pređite u `server/` direktorijum i instalirajte zavisnosti:
```sh
cd server
npm install
```
Pokrenite backend server:
```sh
node index.js
```
Server će raditi na `http://localhost:5000` (ili drugom portu ako je podešen u `.env` fajlu).

---
## Tehnologije Korištene
- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Baza podataka:** MongoDB, Mongoose
- **Autentifikacija:** JWT (JSON Web Token)
- **Razvojno okruženje:** Vite (za frontend)

## Autori
Tim **Singleton** – Best Hackathon Mostar 202X

## Licenca
Ovaj projekat je otvorenog koda i može se koristiti u edukativne svrhe.

