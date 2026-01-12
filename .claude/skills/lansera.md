# Release Skill

Denna skill publicerar spelet till GitHub Pages.

## Instruktioner

När användaren kör `/release` ska du:

1. Först kontrollera att det finns ändringar att commita:
   ```bash
   git status
   ```

2. Om det finns ändringar, lägg till alla filer och skapa en commit:
   ```bash
   git add -A
   git commit -m "Uppdatering av spelet"
   ```

3. Pusha till GitHub:
   ```bash
   git push origin main
   ```

4. Informera användaren att:
   - Koden har pushats till GitHub
   - GitHub Actions bygger och deployar automatiskt (tar ca 1-2 minuter)
   - Spelet finns på: https://ekandreas.github.io/game1/

5. Visa QR-koden om den finns:
   ```
   Se QR-koden i filen: docs/qr-code.png
   ```

## Exempel på output

"Spelet har publicerats! Det tar cirka 1-2 minuter innan ändringarna syns på https://ekandreas.github.io/game1/. Skanna QR-koden för att testa på mobilen!"
