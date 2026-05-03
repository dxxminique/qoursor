# Qoursor — Course Generator

Self-hosted version. Runs on Railway (~$5/month). No Manus dependency.

---

## What changed from the Manus version

| Manus version | This version |
|---|---|
| Manus built-in LLM | OpenAI GPT-4o (your own API key) |
| Manus Forge S3 storage | AWS S3 or Backblaze B2 |
| Manus OAuth login | Email + password (JWT) |
| Manus sandbox hosting | Railway (any Node host) |

Everything else is identical: the pipeline, the chapter cards, the assembler, the roadmap.

---

## Deploy to Railway (step by step, no terminal needed)

### Step 1: Create accounts (all free to sign up)

- **Railway**: railway.app — the host. Free trial, then ~$5/month.
- **GitHub**: github.com — Railway deploys from GitHub. Free.
- **Backblaze B2**: backblaze.com — S3-compatible storage, free for first 10GB. (Or use AWS S3.)
- **OpenAI**: platform.openai.com — you already have this.

### Step 2: Push this code to GitHub

1. Go to github.com and create a new repository called `qoursor`. Make it private.
2. On your Chromebook, open the Linux terminal (Ctrl+Alt+T, then type `bash`).
3. Run these commands one at a time:

```bash
sudo apt install -y git nodejs npm
npm install -g pnpm
cd ~
git clone https://github.com/YOUR_USERNAME/qoursor.git
```

4. Copy the contents of this folder into that cloned folder, then:

```bash
cd qoursor
git add .
git commit -m "initial"
git push origin main
```

### Step 3: Set up Backblaze B2 storage

1. Go to backblaze.com and create a free account.
2. Click "Buckets" then "Create a Bucket". Name it `qoursor-storage`. Set it to Private.
3. Click "App Keys" then "Add a New Application Key". Give it access to your bucket. Copy the `keyID` and `applicationKey` — you will need these in Step 5.
4. Note your bucket's endpoint URL (shown on the bucket page — looks like `s3.us-west-004.backblazeb2.com`).

### Step 4: Create a Railway project

1. Go to railway.app and sign in with GitHub.
2. Click "New Project" then "Deploy from GitHub repo". Select your `qoursor` repo.
3. Railway will detect it is a Node app and start deploying. Let it run.
4. Click "Add a service" and choose "MySQL". Railway creates a database and gives you a `DATABASE_URL` automatically.

### Step 5: Add environment variables in Railway

In your Railway project, click on your app service, then "Variables". Add each of these:

```
DATABASE_URL        (Railway fills this in automatically from the MySQL service)
JWT_SECRET          (generate one at: randomkeygen.com — use the 256-bit key)
S3_BUCKET           qoursor-storage
S3_REGION           us-west-004
S3_ACCESS_KEY       (your Backblaze keyID from Step 3)
S3_SECRET_KEY       (your Backblaze applicationKey from Step 3)
S3_ENDPOINT         https://s3.us-west-004.backblazeb2.com
OPENAI_API_KEY      (your OpenAI key)
APP_URL             (Railway gives you a public URL — paste it here, e.g. https://qoursor.up.railway.app)
NODE_ENV            production
```

### Step 6: Run the database migration

In Railway, click your app service, then "Shell" (or use the Railway CLI). Run:

```bash
npm run db:push
```

This creates all the tables. You only need to do this once.

### Step 7: Open your app

Railway gives you a public URL (shown in the "Settings" tab of your service). Open it in your browser. You will see the Qoursor login page. Create your account — the first person to register becomes the admin.

---

## Local development (optional)

```bash
cp .env.example .env
# Fill in .env with your values
npm install
npm run db:push
npm run dev
```

Open http://localhost:5173

---

## System requirements (for the server)

The server needs `ffmpeg`, `python3`, and `edge-tts` installed.

On Railway (Ubuntu), add a `nixpacks.toml` file to install them automatically — this file is already included in the repo.

---

## Cost estimate

| Service | Cost |
|---|---|
| Railway hobby plan | $5/month |
| Backblaze B2 storage | Free for first 10GB, then $0.006/GB |
| OpenAI GPT-4o | ~$0.03 per course script |
| edge-tts (TTS) | Free |
| Total | ~$5-6/month |
