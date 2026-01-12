#!/bin/bash

# Skript för att skapa game1-game9 repon
# Kör från game1-mappen: ./setup-repos.sh

set -e

GITHUB_USER="ekandreas"
BASE_DIR="/Users/andreasek/dev"
SOURCE_DIR="$BASE_DIR/game1"

echo "==================================="
echo "  Skapar game1-game9 repon"
echo "==================================="
echo ""

# Kontrollera att vi är i rätt mapp
if [ ! -f "$SOURCE_DIR/CLAUDE.md" ]; then
    echo "❌ Fel: Kör skriptet från game1-mappen"
    exit 1
fi

# Kontrollera att gh CLI är installerat
if ! command -v gh &> /dev/null; then
    echo "❌ Fel: GitHub CLI (gh) är inte installerat"
    echo "   Installera med: brew install gh"
    exit 1
fi

# Kontrollera att användaren är inloggad på GitHub
if ! gh auth status &> /dev/null; then
    echo "❌ Fel: Du är inte inloggad på GitHub"
    echo "   Logga in med: gh auth login"
    exit 1
fi

echo "✅ Förberedelser klara"
echo ""

# Loop genom game2-game9
for i in {2..9}; do
    REPO_NAME="game$i"
    REPO_DIR="$BASE_DIR/$REPO_NAME"
    REPO_URL="https://$GITHUB_USER.github.io/$REPO_NAME/"

    echo "-----------------------------------"
    echo "📦 Skapar $REPO_NAME..."
    echo "-----------------------------------"

    # Ta bort mappen om den redan finns
    if [ -d "$REPO_DIR" ]; then
        echo "   ⚠️  Mappen finns redan, tar bort..."
        rm -rf "$REPO_DIR"
    fi

    # Kopiera source till ny mapp
    echo "   📁 Kopierar filer..."
    cp -r "$SOURCE_DIR" "$REPO_DIR"

    # Ta bort gamla git-grejer och node_modules
    rm -rf "$REPO_DIR/.git"
    rm -rf "$REPO_DIR/node_modules"
    rm -f "$REPO_DIR/setup-repos.sh"  # Ta bort detta skript från kopiorna

    # Uppdatera URL i CLAUDE.md
    echo "   📝 Uppdaterar CLAUDE.md..."
    sed -i '' "s|github.io/game1/|github.io/$REPO_NAME/|g" "$REPO_DIR/CLAUDE.md"

    # Initiera git
    echo "   🔧 Initierar git..."
    cd "$REPO_DIR"
    git init -q
    git add .
    git commit -q -m "Initial setup: Phaser game project with auto-deploy"

    # Skapa GitHub repo (om det inte finns)
    echo "   🌐 Skapar GitHub repo..."
    if gh repo view "$GITHUB_USER/$REPO_NAME" &> /dev/null; then
        echo "   ⚠️  Repo finns redan på GitHub, hoppar över skapande..."
    else
        gh repo create "$REPO_NAME" --public --source=. --push
    fi

    # Pusha till GitHub
    echo "   🚀 Pushar till GitHub..."
    git remote add origin "git@github.com:$GITHUB_USER/$REPO_NAME.git" 2>/dev/null || true
    git branch -M main
    git push -u origin main --force

    # Aktivera GitHub Pages
    echo "   📄 Aktiverar GitHub Pages..."
    gh api -X PUT "repos/$GITHUB_USER/$REPO_NAME/pages" \
        -f build_type="workflow" 2>/dev/null || echo "   ⚠️  Pages kanske redan är aktiverat"

    echo "   ✅ $REPO_NAME klar!"
    echo ""
done

cd "$SOURCE_DIR"

echo "==================================="
echo "  🎉 Alla repon är skapade!"
echo "==================================="
echo ""
echo "Repon:"
for i in {1..9}; do
    echo "  - https://github.com/$GITHUB_USER/game$i"
done
echo ""
echo "Speladresser (efter första deploy):"
for i in {1..9}; do
    echo "  - https://$GITHUB_USER.github.io/game$i/"
done
echo ""
echo "OBS: GitHub Pages kan ta några minuter att aktiveras första gången."
echo ""
