# Instruktörsmanual - Spelutveckling med AI

Den här guiden är för dig som ska hålla i workshopen. Deltagarna behöver **ingen** teknisk förkunskap.

## Innan workshopen

### Teknisk setup (Andreas/Jonas)

För varje deltagarplats, förbered:

1. **Dator med Claude Code**
   - Claude Code installerat och inloggat
   - Projektet klonat och öppnat i terminal
   - **VIKTIGT:** Byt till develop-branchen:
     ```bash
     git checkout develop
     ```
   - Starta Claude med:
     ```bash
     claude --dangerously-skip-permissions
     ```
   - Verifiera att Claude hälsar välkommen när den startar
   - Verifiera att du är på rätt branch: `git branch` ska visa `* develop`

2. **Monologue (röststyrning)**
   - Installera Monologue från: https://monologue.app
   - Testa att det fungerar med Option-tangenten
   - Sätt rätt språk (svenska)

3. **QR-kort**
   - Skriv ut QR-kod för varje deltagares spel-URL
   - Varje deltagare får sitt unika kort (game2, game3, game4, game5)

4. **Inspirationskort**
   - Skriv ut kort med idéer och utmaningar (se sektion nedan)
   - Ha en hög redo att dela ut vid pausen

### Checklista per plats

- [ ] Rätt branch aktiv (`develop`, INTE `main`)
- [ ] Terminal öppen med Claude startad
- [ ] Monologue installerat och testat
- [ ] QR-kort utdelat
- [ ] Deltagaren har sin mobil redo

## Genomförande

### 1. Introduktion (10 min)

Förklara för deltagarna:

**Vad de ska göra:**
> "Idag ska ni bygga ett eget mobilspel genom att prata med en AI. Ni behöver inte kunna programmera - AI:n skriver all kod åt er!"

**Hur det fungerar:**
> "Ni berättar vad ni vill att spelet ska göra, och AI:n fixar det. Sedan testar ni på mobilen och ger feedback. Så fortsätter vi tills ni är nöjda!"

**Viktigt - planera först:**
> "Innan vi börjar koda, fundera på vad ni vill bygga. Vad är spelidén? Vad gör det roligt?"

### 2. Visa Monologue (5 min)

Demonstrera röststyrningen:

**Så här fungerar det:**
1. **Tryck och håll Option (⌥)** - prata medan du håller in
2. **Dubbelklicka Option** - lyssnar tills du klickar igen
3. Det du säger blir text i terminalen
4. Tryck Enter för att skicka till Claude

**Visa live:**
> "Jag trycker Option, säger 'Lägg till en röd fiende som studsar runt', och sen ser ni hur texten dyker upp..."

**Tips att ge deltagarna:**
- Prata tydligt och i hela meningar
- Var specifik med vad du vill ha
- Det är OK att korrigera om det blir fel

### 3. Visa QR-koden (2 min)

**Instruera:**
> "Skanna QR-koden på ert kort med mobilen. Det är där ert spel finns. Varje gång AI:n gör en ändring, ladda om sidan på mobilen för att se resultatet!"

### 4. Låt dem börja! (resten av tiden)

**Gå runt och hjälp:**
- Uppmuntra dem att testa ofta
- Påminn om att ta små steg
- Hjälp om något går fel (be Claude fixa det!)

**Vanliga frågor:**
- "Varför händer inget?" → Ladda om sidan på mobilen
- "Det blev fel!" → Berätta för Claude vad som gick fel
- "Jag vet inte vad jag ska göra" → Föreslå: fiender, poäng, power-ups

## Schema (2 timmar)

| Tid | Aktivitet |
|-----|-----------|
| 00:00 | Introduktion och demo av Monologue |
| 00:15 | **Fas 1:** Lugn start - deltagarna planerar och börjar bygga |
| 00:45 | **Spion-momentet aktiveras!** (se nedan) |
| 01:00 | Kort paus + **Dela ut inspirationskort** (se nedan) |
| 01:15 | **Fas 2:** Fortsätt bygga med nya idéer och konkurrens |
| 01:45 | Avslutning, visa upp spelen för varandra |
| 02:00 | Slut |

*Dagen efter: Reflektion över promptning och hur det kan användas i arbetet.*

## Spion-momentet (efter ca 30 min)

När deltagarna har kommit igång och börjat få något på skärmen, introducera lite **stressfaktor**:

> "Nu har ni jobbat ett tag och börjat få grepp om det här. Men visste ni att ni kan **spionera på varandra**? Alla era spel är live just nu!"

**Deltagarnas spel-URLer:**
- https://game2.leasify.app
- https://game3.leasify.app
- https://game4.leasify.app
- https://game5.leasify.app

**Säg något i stil med:**
> "Vill ni se hur det går för de andra? Öppna deras URL på mobilen! Och kom ihåg - de kan se ert spel också..."

**Syftet:**
- Skapar lite tävlingskänsla
- Inspirerar genom att se andras idéer
- Gör det roligare och mer socialt
- Motiverar att fortsätta bygga

**VIKTIGT:** Vänta minst 30 minuter innan du introducerar detta! Deltagarna behöver lugn och ro att komma igång först.

## Inspirationskort (vid pausen ~01:00)

Vid pausen, dela ut **inspirationskort** med tips och idéer. Detta sätter fart på nya iterationer!

**Förbered kort med förslag som:**

*Gameplay-idéer:*
- "Lägg till en power-up som gör dig odödlig i 5 sekunder"
- "Skapa en tidsgräns - hinner du samla alla poäng?"
- "Lägg till en boss-fiende som är extra svår"
- "Gör så fienderna blir snabbare ju längre man spelar"
- "Lägg till flera liv"

*Visuella idéer:*
- "Byt bakgrundsfärg när man får poäng"
- "Lägg till en explosion-effekt vid kollision"
- "Gör spelaren större för varje poäng"
- "Lägg till en partikeleffekt när man rör sig"

*Ljud-idéer:*
- "Lägg till ett ljud när man får poäng"
- "Spela ett ljud när spelet tar slut"
- "Lägg till bakgrundsmusik"

*Utmaningar:*
- "Lägg till hinder som man måste undvika"
- "Skapa en labyrint"
- "Lägg till en andraspelare (tvåspelarläge)"

**Säg något som:**
> "Här är lite inspiration om ni kört fast eller vill ta ert spel till nästa nivå! Ta ett kort och utmana er själva!"

**Tips:** Låt deltagarna välja kort själva - det skapar ägarskap över idén.

## Felsökning

**Claude svarar inte:**
- Kolla att terminalen är aktiv
- Skriv något och tryck Enter

**Monologue fungerar inte:**
- Kolla att appen är startad
- Testa Option-tangenten i en annan app först

**Spelet kraschar:**
- Be Claude "fixa felet"
- Claude ser felet och kan rätta till det

**Deltagaren har kört fast:**
- Föreslå en enkel nästa sak att lägga till
- Hjälp dem formulera en tydlig prompt

## Bra att veta

- **Deltagarna ser inte koden** - de behöver inte förstå den
- **Allt sparas automatiskt** - ingen risk att förlora arbete
- **Det finns inga dumma idéer** - uppmuntra kreativitet!
- **Fel är lärorika** - visa att man kan be Claude fixa dem

## Kontakt

Tekniska problem? Kontakta Andreas eller Jonas.
