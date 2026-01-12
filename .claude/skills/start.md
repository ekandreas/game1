# Start Skill

Denna skill startar utvecklingsservern så att användaren kan testa spelet lokalt.

## Instruktioner

När användaren kör `/start` ska du:

1. Kontrollera om dependencies är installerade:
   ```bash
   ls node_modules
   ```

2. Om node_modules inte finns, installera först:
   ```bash
   npm install
   ```

3. Starta utvecklingsservern i bakgrunden:
   ```bash
   npm run dev
   ```

4. Informera användaren att:
   - Spelet körs nu på http://localhost:3000
   - Ändringar uppdateras automatiskt när du sparar
   - Tryck Ctrl+C i terminalen för att stoppa

## Exempel på output

"Utvecklingsservern är igång! Öppna http://localhost:3000 i din webbläsare för att se spelet. Alla ändringar du gör uppdateras automatiskt."
