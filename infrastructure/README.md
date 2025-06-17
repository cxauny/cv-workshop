# Forutsetninger

### Nødvendige verktøy

#### Windows

- Installer [Windows Subsystem for Linux](https://docs.docker.com/desktop/features/wsl).

- Installer [Git](https://git-scm.com/downloads) og [Azure CLI](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli-linux?view=azure-cli-latest&pivots=apt) i WSL.
  Ikke installer de på Windows!

#### macOS

- Installer [Azure CLI](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli-macos?view=azure-cli-latest).

### Fork repoet

Fork dette repoet til din egen GitHub-konto (samme hvilken).
Eventuelt opprett en GitHub-konto hvis du ikke har en fra før.

### Lag en Azure-konto

Registrer deg for en gratis Azure-konto [her](https://azure.microsoft.com/free).

### Autentiser deg med Azure CLI

Kjør denne kommandoen i terminalen for å logge inn med Azure CLI:

```bash
az login
```

Følg så flyten i nettleseren.

# Del 1: Azure og Terraform

Når man setter opp skyinfrastruktur er det sterkt anbefalt å bruke et verktøy som Terraform for å
definere infrastrukturen som kode. Dette gjør det enklere å versjonskontrollere og gjenbruke konfigurasjonen.
Hvis vi istedenfor bruker Azure-portalen til å sette opp infrastruktur, kan det fort bli vanskelig å holde oversikt over hva som er satt opp og hvordan.
Dette kalles "Click-Ops", og er dårlig praksis i alt annet enn små eller uviktige prosjekter.

## 🔨 Oppgave 1.1

Terraform er på en måte en slags "Git for infrastruktur", og trenger dermed et sted å lagre "repoet" sitt ("state").
State inneholder informasjon om hvilke ressurser som er opprettet, og deres tilstand.
Azure har støtte for å lagre Terraform state i en Azure Storage Container.

Brukt skriptet `create-terraform-state.sh` for å opprette en Azure Storage Container som skal brukes til å lagre Terraform state.

💡 _TIPS:_ bruk syntaksen `./mitt-kule-skript.sh` for å kjøre et skript i terminalen. Pass på at du er i riktig mappe først!

<details>
  <summary>✨ Se fasit</summary>

```bash
cd infrastructure           # bytter mappe (trengs ikke hvis du allerede er der)
./create-terraform-state.sh # kjører skriptet
```

</details>

## 🔨 Oppgave 1.2

Nå kan Terraform lagre state, men den trenger også tilgang til Azure for å kunne opprette ressurser.

Bruk skriptet `create-azure-service-principal.sh` for å opprette en Azure Service Principal som Terraform kan bruke til å autentisere seg mot Azure.

Du vil få ut fire verdier som starter med `ARM_`.
Lagre disse som secrets i GitHub-repoet ditt, slik at de kan brukes i GitHub Actions.

<details>
  <summary>✨ Se fasit</summary>

```bash
cd infrastructure                   # bytter mappe (trengs ikke hvis du allerede er der)
./create-azure-service-principal.sh # kjører skriptet
```

Gå til **Settings** -> **Secrets and variables** -> **Actions** -> **New repository secret**.
Legg inn følgende secrets:

- `ARM_CLIENT_ID`
- `ARM_CLIENT_SECRET`
- `ARM_SUBSCRIPTION_ID`
- `ARM_TENANT_ID`

</details>

##### VIKTIG!

Dersom alt ble gjort riktig, skal det skal også ha blitt opprettet en fil som heter `providers.tf` i `infrastructure`-mappen.
Denne filen inneholder konfigurasjonen som lar Terraform vite hvordan den skal bruke Azure, både for å autentisere seg og for å lagre state.

# Del 2: GitHub Actions

GitHub Actions er et verktøy for å automatisere arbeidsflyter i GitHub.
I dette tilfellet skal vi bruke GitHub Actions til å kjøre Terraform-kode for å opprette infrastruktur i Azure.

## 🔨 Oppgave 2.1

Commit endringene i repoet ditt slik de er nå, og push de til GitHub.

Se på **Actions**-fanen i repoet ditt for å se at det kjører en workflow som heter `Deploy`.
Den vil feile siden vi ikke har lagt til alt den trenger enda.

## 🔨 Oppgave 2.2

Nå skal vi legge til de siste delene som trengs for å opprette infrastrukturen.

Lag to secrets i GitHub-repoet ditt:

- `SUPABASE_CONNECTION_STRING`: kobling til Supabase-databasen
- `API_KEY`: Nøkkel som blir brukt av frontend/backend for å autentisere seg mot hverandre.

Disse skal du ha fått fra tidligere.

## 🔨 Oppgave 2.3

Push endringene dine til GitHub igjen, og se at workflowen kjører og fullfører uten feil.

Du vil da få ut to URL'er i loggen, én til frontend og én til backend.

# Videre

Alternativt kan du installere disse hvis du vil kjøre lokalt senere

- [Docker](https://docs.docker.com/desktop/features/wsl)
- [Terraform](https://developer.hashicorp.com/terraform/install#linux)
