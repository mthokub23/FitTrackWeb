# FitTrack ✅

Lightweight fitness tracking web app built for school.

## Features ✨

- **Dashboard** — Quick overview of today's calories, workouts, and progress rings.
- **Workouts** — Log workouts with duration, type, and calculated calorie burn.
- **Meals & Food Search** — Search foods via Spoonacular, get nutrition per serving, and add meals.
- **Progress Tracking** — Weight history, rings and a history table for long-term trends.
- **Badges & Achievements** — Earn badges for streaks and milestones.
- **Filtering & Sorting** — Filter logs by date, type, and nutritional values.
- **Accessibility** — Semantic HTML and ARIA attributes for keyboard and screen-reader support.

## Setup 🛠️

1. Copy `.env.example` to `.env` and fill in your Spoonacular API key:

```
REACT_APP_SPOONACULAR_API_KEY=your_api_key_here
```

2. Install dependencies and (optionally) regenerate the lockfile:

```
npm install
```

3. Start the app in development mode:

```
npm start
```

## Broad technical description (50 words) 💡

FitTrack is a React single-page application that records workouts, meals, badges, and weight progression. It uses functional components and hooks, modular CSS, and client-side state with optional persistence. Food search and nutrient lookups use the Spoonacular API. Built with Create React App and standard npm tooling.

## Development notes

- API keys are read from environment variables. Use `.env.example` as a template; `.env` is ignored by git.
- The food-related code exposes `searchFoods` and `getNutritionInfo` from `src/services/nutritionixService.js` (now backed by Spoonacular). Existing UI logic expects the same return shape so components should not need changes.

---

If you'd like, I can add a short section with API rate-limit notes or add an optional fallback parse route to improve matching for ambiguous food queries. 🔧



