# Installazione

# 1 - Installare nodeJS

Andare sul [sito uffciale node.js](https://nodejs.org/en/download) e installare nodeJS per il proprio sistema operativo

Controllare che node funzioni con

```bash
npm -v
```

# 2 - Clonazione repository

```bash
git clone https://github.com/Alex3725/totem-AIDO
```


Recarsi nella cartella e spostarsi sul branch "Alex"

```bash
cd totem-AIDO
git checkout Alex
```

Spostarsi nella cartella e installare le dipendenze con

```bash
cd ./progetto-formatted
npm i
```

# 3 - Apertura porta

# Locale

Aprire il server locale con

```bash
npm run dev
```

# LAN

Aprire il server in modalità host

```
npm run dev -- --host
```