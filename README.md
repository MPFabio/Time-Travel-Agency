# Time Travel Agency — Webapp Interactive

Webapp pour une agence de voyage temporel fictive, créée dans le cadre du projet supervisé IA M1/M2 (Session 2). Landing page, galerie de destinations, chatbot IA et quiz de recommandation.

**Membres du groupe :** Lenny COSTON, Sebastien GIGUET, Fabio MARATEA.

---

## Stack technique

- **Frontend :** React 18, Vite 5
- **Styles :** Tailwind CSS v3
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
- **Visuels / assets :** Session 1 (dossier Livrables) — voir Crédits

## Installation

1. Cloner le dépôt :
   ```bash
   git clone https://github.com/VOTRE_USERNAME/Time-Travel-Agency.git
   cd Time-Travel-Agency
   ```
2. Lancer depuis la racine :
   ```bash
   npm run dev
   ```
   Ou depuis le dossier webapp :
   ```bash
   cd webapp
   npm install
   npm run dev
   ```
3. Les assets (images, vidéos) sont dans `webapp/public/Livrables/`. Si besoin, copier le dossier **Livrables** (Session 1) dans `webapp/public/Livrables/`.
4. Créer `webapp/.env` avec votre clé API :
   - **Groq :** [console.groq.com](https://console.groq.com/) → `VITE_GROQ_API_KEY=votre_cle`
   - **Mistral :** [console.mistral.ai](https://console.mistral.ai/) → `VITE_MISTRAL_API_KEY=votre_cle`
5. Build de production :
   ```bash
   npm run build
   ```

## Déploiement (Vercel)

1. Importer le projet depuis GitHub sur [vercel.com](https://vercel.com).
2. **Root Directory** : `./` — **Build Command** : `npm run build --prefix webapp` — **Output Directory** : `webapp/dist` — **Install Command** : `npm install --prefix webapp`.
3. Dans **Environment Variables**, ajouter `VITE_GROQ_API_KEY` (ou `VITE_MISTRAL_API_KEY`) avec votre clé.
4. Déployer ; l’URL publique sera fournie par Vercel.

## Documentation des prompts

Les prompts du chatbot et du quiz sont documentés dans [webapp/docs/prompts.md](webapp/docs/prompts.md) (system prompt, prompt du quiz, réflexion sur le processus).

## Crédits

- **Équipe :** Lenny COSTON, Sebastien GIGUET, Fabio MARATEA.
- **Assets Session 1 :** dossier Livrables (images Paris 1889, Crétacé, Florence 1504 ; vidéos Tour_Eiffel, Dino, Florence, Montage_Transition ; documents PDF).
- **APIs IA :** Groq, Mistral AI.
- **Polices :** Google Fonts (Cormorant Garamond, Inter).
- **Projet pédagogique :** M1/M2 Digital & IA.

## Licence

Projet pédagogique — usage dans le cadre du cours uniquement.
