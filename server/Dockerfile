# Koristimo Node.js baziranu sliku
FROM node:18

# Postavljamo radni direktorij
WORKDIR /app

# Kopiramo package.json i package-lock.json
COPY package*.json ./

# Instaliramo zavisnosti
RUN npm install

# Kopiramo ostatak aplikacije
COPY . .

# Eksponiramo port 5000
EXPOSE 5000

# Pokrećemo aplikaciju
CMD ["node", "index.js"]