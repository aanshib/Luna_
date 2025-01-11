#!/bin/bash

# ==============================
# CONFIG (EDIT THIS ONLY)
# ==============================

REPO_URL="https://github.com/aanshib/Luna_.git"

DATES=(
"2025-01-11T10:15:00+05:30"
"2025-01-12T14:20:00+05:30"
"2025-01-13T11:40:00+05:30"
"2025-01-14T16:10:00+05:30"
"2025-01-15T18:30:00+05:30"
)

MESSAGES=(
"Initial project setup"
"Added app structure and components"
"Implemented hooks and utilities"
"Added scripts and styling"
"Final project completion"
)

# ==============================
# START
# ==============================

echo "🚀 Creating backdated Git history..."

# remove old git history if exists
if [ -d ".git" ]; then
  rm -rf .git
fi

# initialize repo
git init

# create clean gitignore
cat > .gitignore <<EOL
node_modules/
.next/
.env.local
dist/
EOL

git add .gitignore

GIT_AUTHOR_DATE="${DATES[0]}" \
GIT_COMMITTER_DATE="${DATES[0]}" \
git commit --date="${DATES[0]}" -m "Add gitignore"

# ==============================
# PREPARE FILE LIST
# ==============================

git add .
git reset

FILES=($(git ls-files --others --exclude-standard))

TOTAL=${#FILES[@]}
COMMITS=${#DATES[@]}
PER_COMMIT=$(( (TOTAL + COMMITS - 1) / COMMITS ))

INDEX=0

# ==============================
# CREATE BACKDATED COMMITS
# ==============================

for ((i=0; i<COMMITS; i++))
do
  echo "📅 Commit for ${DATES[$i]}"

  COUNT=0
  while [ $COUNT -lt $PER_COMMIT ] && [ $INDEX -lt $TOTAL ]
  do
    git add "${FILES[$INDEX]}"
    INDEX=$((INDEX+1))
    COUNT=$((COUNT+1))
  done

  GIT_AUTHOR_DATE="${DATES[$i]}" \
  GIT_COMMITTER_DATE="${DATES[$i]}" \
  git commit --date="${DATES[$i]}" -m "${MESSAGES[$i]}"
done

# ==============================
# PUSH TO GITHUB
# ==============================

git remote add origin "$REPO_URL"
git branch -M main

git push -f -u origin main

echo "✅ SUCCESS — Backdated commits uploaded!"
