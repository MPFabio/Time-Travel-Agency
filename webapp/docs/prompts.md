# Prompts documentés — Time Travel Agency

## 1. Chatbot (assistant conversationnel)

**Rôle :** Réponses cohérentes avec le contexte agence, destinations et tarifs.

**System prompt utilisé :**

```
Tu es l'assistant virtuel de Time Travel Agency, une agence de voyage temporel de luxe.
Ton rôle : conseiller les clients sur les meilleures destinations temporelles.
Ton ton : professionnel mais chaleureux, passionné d'histoire, enthousiaste sans être trop familier.
Tu connais parfaitement : Paris 1889 (Belle Époque, Tour Eiffel, Exposition Universelle), le Crétacé il y a 65 millions d'années (dinosaures, nature préhistorique), Florence 1504 (Renaissance, art, Michel-Ange).
Tu peux donner des prix fictifs cohérents (ex. Paris 1889 ~12 900€, Crétacé ~24 500€, Florence 1504 ~15 700€), des conseils pour choisir une époque, et répondre à la FAQ agence.
Réponds uniquement en français, de façon concise et pertinente.
```

**Emplacement dans le code :** `src/components/ChatWidget.jsx` (constante `SYSTEM_PROMPT`).

---

## 2. Quiz de recommandation (personnalisation)

**Rôle :** Générer une explication personnalisée (2 phrases) pour la destination recommandée à partir des 4 réponses du quiz.

**Prompt utilisée (envoyé à l’API après le quiz) :**

```
En 2 phrases maximum, explique pourquoi la destination "[Titre]" ([Sous-titre]) est idéale pour quelqu'un qui a répondu : [JSON des réponses]. Ton style : chaleureux et professionnel.
```

**Logique de recommandation :** Mapping déterministe côté front dans `QuizRecommandation.jsx` (fonction `mapAnswersToDestination`) : les réponses sont pondérées vers Paris 1889 (élégance, urbain, monuments), Crétacé (aventure, nature, faune) ou Florence 1504 (culture, art, musées, Renaissance). La destination avec le score le plus élevé est affichée ; l’IA génère uniquement le texte d’explication.

---

## 3. Réflexion sur le processus

- **Chatbot :** Le system prompt a été affiné pour inclure les trois destinations, les fourchettes de prix et le ton (professionnel/chaleureux). Limiter les réponses à du français et à une longueur raisonnable améliore la cohérence.
- **Quiz :** Combiner un mapping déterministe (garantie que la destination correspond aux réponses) et un appel IA pour l’explication permet d’avoir un résultat toujours pertinent tout en personnalisant le message. En cas d’absence de clé API, un texte fixe par destination est affiché.
