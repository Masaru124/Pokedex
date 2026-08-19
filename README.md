# ⚡ Pokémon Explorer — Anime-Authentic Pokédex Web App

A production-quality, highly responsive, interactive **Pokédex Explorer** built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS**, and **PokéAPI**. Inspired by the iconic handheld Pokédex hardware from the Pokémon anime and retro Game Boy titles.

![Pokédex Explorer Banner](https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png)

---

## 🌟 Key Features & Pokédex Redesign

- 🔍 **Partial Substring & Fuzzy Name Search**: Live search by partial name or ID (e.g. typing `"pika"` displays Pikachu & all Pikachu forms; typing `"char"` displays Charizard, Charmander & Charmeleon; typing `"mew"` displays Mew & Mewtwo).
- 🔴 **Handheld Metallic Pokédex Enclosure**: Deep crimson handheld body with metallic bevel highlights, indicator LEDs (Power, Data, Signal), and an OLED display casing.
- 🔊 **8-Bit Web Audio Synthesizer**: Zero audio MP3 downloads needed! Uses the Web Audio API to synthesize retro 8-bit sound effects + official Pokémon cry streaming:
  - Tactile button click chimes
  - Laser scanner sounds on search input
  - Pokédex mechanical lid opening fanfare
  - Real official **Pokémon audio cries** streamed directly from PokéAPI for every Pokémon!
- 🎬 **Anime Pokédex Animations**:
  - **Mechanical Lid Doors**: Dual red doors slide open on detail terminal launch.
  - **Laser Biometric Scanline**: Glowing cyan laser beam sweeps across Pokémon artwork during analysis.
  - **Typewriter Text Bio Log**: Types out species details and stats character-by-character with 8-bit typewriter audio ticks.
  - **CRT Scanlines**: Retro CRT overlay texture over terminal screens.
- 🃏 **3D Holographic Cards**: Mouse-tracking 3D tilt effect with holographic sheen reflection and quick ATK/DEF/SPD stat gauges.
- ✨ **Shiny Pokémon Mode**: One-click toggle to view official Shiny Pokémon artwork and sprites with animated sparkle FX.
- ⚔️ **Battle Comparison Terminal**: Side-by-side battle matrix evaluating HP, Attack, Defense, Sp. Atk, Sp. Def, and Speed with winner trophy badges.
- 📏 **Trainer Height Scale**: Visual biometric height guide scaling Pokémon directly against a 1.7m human trainer silhouette.
- 🔀 **Multi-Criteria Sorting**: Sort by Lowest ID (#1), Highest ID, Name (A-Z), Top Attack, Top Defense, Top Speed, or Top HP.
- 🌙 **Dark & Light Theme Switcher**: Persisted theme switcher toggling between Cyberpunk Stealth Dark mode and Classic Silver Light mode.
- ❤️ **Favorites**: Saved favorite Pokémon stored in `localStorage` with a dedicated view.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (Strict typing across API view-models and component props)
- **Styling**: Tailwind CSS (v4)
- **Icons**: Lucide React
- **Audio**: Web Audio API + PokéAPI Cries CDN
- **API**: [PokéAPI](https://pokeapi.co/) (v2)

---

## 📁 Project Structure

```
pokemon/
├── src/
│   ├── app/
│   │   ├── globals.css              # CRT scanlines, laser beams, lid door animations
│   │   ├── layout.tsx               # Root layout & Inter font configuration
│   │   ├── page.tsx                 # Main explorer page shell & state hub
│   │   └── pokemon/[name]/page.tsx  # Direct URL detail route
│   ├── components/
│   │   ├── PokedexChassis.tsx       # Handheld red Pokédex frame & hardware LEDs
│   │   ├── Header.tsx               # Control console with search, filters & theme toggles
│   │   ├── SearchBar.tsx            # Debounced search bar with scanner audio
│   │   ├── TypeFilter.tsx           # 18-type selector dropdown with icons
│   │   ├── SortSelect.tsx           # Multi-criteria sort selector
│   │   ├── PokemonCard.tsx          # 3D tilt card with holographic sheen & shiny toggle
│   │   ├── PokemonGrid.tsx          # Responsive grid with Load More trigger
│   │   ├── PokemonModal.tsx         # Dual-screen Pokédex terminal with laser scan & typewriter bio
│   │   ├── TypewriterText.tsx       # Character-by-character printing component
│   │   ├── CompareDrawer.tsx        # Battle comparison terminal with stat winner trophies
│   │   ├── LoadingSkeleton.tsx      # Skeleton grid with CSS shimmer effect
│   │   ├── ErrorState.tsx           # Retryable error screen
│   │   └── EmptyState.tsx           # Zero-result screen
│   ├── hooks/
│   │   ├── usePokemonList.ts        # Data fetching, partial search, pagination & race-condition guards
│   │   ├── usePokemonDetail.ts      # Detailed stats lazy fetcher
│   │   ├── useFavorites.ts          # LocalStorage favorites state manager
│   │   └── useDarkMode.ts           # LocalStorage theme switcher
│   ├── lib/
│   │   ├── soundFx.ts               # Web Audio API 8-bit retro sound synthesizer & cry streamer
│   │   └── typeColors.ts            # Type palette map & icons
│   ├── services/
│   │   └── pokemonApi.ts            # PokéAPI client with full index caching & partial search
│   └── types/
│       └── pokemon.ts               # TypeScript interfaces & view models
├── package.json
└── tsconfig.json
```

---

## 🚀 Running Locally

### Prerequisites
- Node.js 18.x or higher
- npm 9.x or higher

### Installation & Execution

1. Navigate to the project directory:
   ```bash
   cd pokemon
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.
