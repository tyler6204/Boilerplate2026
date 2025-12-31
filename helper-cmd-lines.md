# Command Helper Lines

## 📦 Package Scripts

### Development

```bash
# Start website development server
pnpm dev:website

# Start Convex development server
pnpm dev:convex

# Start mobile development
pnpm dev:mobile
```

### Build

```bash
# Build website
pnpm build
```

### Stripe

```bash
# Listen to Stripe webhooks
pnpm stripe:listen
```

## 🔀 Git Workflow

### Merging dev to main

#### Step-by-step:

```bash
# 1️⃣ Switch to main branch
git checkout main

# 2️⃣ Ensure main is up to date
git pull origin main

# 3️⃣ Merge dev branch into main
git merge dev

# 4️⃣ Resolve any conflicts (if prompted)
#    Then commit the merge if necessary

# 5️⃣ Push changes to remote
git push origin main

# 6️⃣ Switch back to dev branch
git checkout dev
```

#### One-liner:

```bash
# Merge dev into main and push, then switch back to dev
git checkout main && git pull origin main && git merge dev && git push origin main && git checkout dev
```
