# StickerForge — Nexus Labs

> Créateur de stickers WhatsApp personnalisés. Application React + Vite, déployable sur Vercel en quelques clics.

## Fonctionnalités

- Import d'image par clic ou glisser-déposer
- Découpe en cercle, carré arrondi ou hexagone
- Superposition de texte avec choix de couleur, taille et style
- Contour personnalisable
- Export en **WebP** (format natif WhatsApp) ou **PNG** à 512×512 px
- Interface en français, design mobile-first

## Stack technique

| Outil | Rôle |
|---|---|
| React 18 | Interface utilisateur |
| Vite 5 | Bundler & serveur de dev |
| lucide-react | Icônes |
| HTML5 Canvas | Rendu et export du sticker |

## Installation locale

```bash
# 1. Cloner le dépôt
git clone https://github.com/<votre-pseudo>/stickerforge.git
cd stickerforge

# 2. Installer les dépendances
npm install

# 3. Lancer en développement
npm run dev
```

L'application est accessible sur `http://localhost:5173`.

## Déploiement sur Vercel

### Option A — Interface Vercel (recommandé)

1. Pousser ce dépôt sur GitHub.
2. Se connecter sur [vercel.com](https://vercel.com) et cliquer **Add New Project**.
3. Sélectionner le dépôt `stickerforge`.
4. Vercel détecte automatiquement Vite — cliquer **Deploy**.

### Option B — CLI Vercel

```bash
npm install -g vercel
vercel
```

## Structure du projet

```
stickerforge/
├── public/
│   └── favicon.svg
├── src/
│   ├── main.jsx        # Point d'entrée React
│   └── App.jsx         # Application complète
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

## Licence

MIT — © 2025 Nexus Labs
