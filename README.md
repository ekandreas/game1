# Spelutveckling med AI

Välkommen till workshopen där du ska bygga ett spel med hjälp av AI!

## Snabbstart

1. Öppna terminalen i denna mapp
2. Skriv `claude` för att starta Claude Code
3. Claude hälsar dig välkommen och guidar dig vidare!

## Kommandon i Claude Code

| Kommando | Vad det gör |
|----------|-------------|
| `/start` | Startar spelet lokalt så du kan testa |
| `/release` | Publicerar spelet till internet |
| `/help` | Visar hjälp och tips |

## Tips för bra prompter

**Var specifik:**
- "Lägg till en fiende" (bra)
- "Fixa spelet" (för vagt)

**Ge exempel:**
- "Jag vill ha en fiende som rör sig fram och tillbaka, som i gamla Mario-spel"

**Steg för steg:**
- Be om en sak i taget istället för allt på en gång

## Ditt spel på internet

När du kör `/release` publiceras spelet automatiskt till:

**https://ekandreas.github.io/game1/**

Skanna QR-koden i `docs/qr-code.png` för att öppna på mobilen!

## Felsökning

**Spelet startar inte?**
- Kör `/start` igen
- Kolla att du är i rätt mapp

**Ändringar syns inte på internet?**
- Vänta 1-2 minuter efter `/release`
- Rensa webbläsarens cache (Ctrl+Shift+R)

## Projektstruktur (för den nyfikne)

```
game1/
├── src/                 # Spelets kod
│   ├── main.js         # Startar spelet
│   └── scenes/         # Spelscener
├── public/assets/      # Bilder och ljud
├── index.html          # Webbsidan
└── CLAUDE.md           # Instruktioner för AI:n
```

Lycka till och ha kul!
