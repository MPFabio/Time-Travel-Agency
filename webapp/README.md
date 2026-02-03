# Time Travel Agency — Webapp Interactive

Webapp pour une agence de voyage temporel fictive, créée dans le cadre du projet supervisé IA M1/M2 (Session 2). Landing page, galerie de destinations, chatbot IA et quiz de recommandation.

## Stack technique

- **Frontend :** React 19, Vite 7
- **Styles :** Tailwind CSS v4
- **Animations :** Framer Motion
- **IA :** API Groq (ou Mistral) pour le chatbot et la personnalisation du quiz
- **Hébergement :** Vercel (recommandé)

## Fonctionnalités

- Landing page avec hero (vidéo ou image de fallback), navigation fixe
- Section **Destinations** : 3 cartes (Paris 1889, Crétacé 65M, Florence 1504) avec images lazy-loadées
- **Chatbot** : widget en bas à droite, assistant virtuel (personnalité Time Travel Agency, conseils, tarifs, FAQ)
- **Quiz** : 4 questions pour une recommandation de destination + explication personnalisée par IA
- **Formulaire de réservation** : destination + dates, validation côté client, message de confirmation
- Design dark, accents dorés, animations au scroll et au survol
- Mobile-first, responsive

## IA utilisées

- **Code :** Cursor (IDE avec IA)
- **Chatbot :** API Groq (modèle `llama-3.1-8b-instant`) ou Mistral (`mistral-small-latest`)
- **Quiz :** même API pour la génération du texte de recommandation personnalisé
- **Visuels / assets :** Session 1 (Livrables) — voir Crédits

## Installation

1. Cloner le dépôt et se placer dans le dossier `webapp` :
   ```bash
   cd webapp
   ```
2. Installer les dépendances :
   ```bash
   npm install
   ```
3. Copier le dossier **Livrables** (Session 1) dans `webapp/public/Livrables/` pour que les images et vidéos s’affichent (voir `public/Livrables/README.txt`).
4. Créer un fichier `.env` à la racine de `webapp` à partir de `.env.example` et renseigner une clé API :
   - **Groq :** [console.groq.com](https://console.groq.com/) → `VITE_GROQ_API_KEY=votre_cle`
   - **Mistral :** [console.mistral.ai](https://console.mistral.ai/) → `VITE_MISTRAL_API_KEY=votre_cle`
5. Lancer le serveur de développement :
   ```bash
   npm run dev
   ```
6. Build de production :
   ```bash
   npm run build
   ```

## Déploiement (Vercel)

1. Importer le projet depuis GitHub sur [vercel.com](https://vercel.com).
2. Dans **Settings → Environment Variables**, ajouter `VITE_GROQ_API_KEY` (ou `VITE_MISTRAL_API_KEY`) avec votre clé.
3. Déployer ; l’URL publique sera fournie par Vercel.

## Documentation des prompts

Les prompts du chatbot et du quiz sont documentés dans [docs/prompts.md](docs/prompts.md) (system prompt, prompt du quiz, réflexion sur le processus).

## Crédits

- **Assets Session 1 :** dossier Livrables (images Paris 1889, Crétacé, Florence 1504 ; vidéos Tour_Eiffel, Dino, Florence, Montage_Transition ; documents Document_Demarche_Realisation.pdf, Recherche_Documentaire.pdf).
- **APIs IA :** Groq, Mistral AI.
- **Polices :** Google Fonts (Cormorant Garamond, Inter).
- **Projet pédagogique :** M1/M2 Digital & IA.

## Licence

Projet pédagogique — usage dans le cadre du cours uniquement.
