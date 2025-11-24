---
description: Complete Git workflow from pull to push
---

# Git Workflow: From Pull to Push

This workflow covers the complete Git process for the 4k_wallpaper_creator project.

## Initial Setup (Already Completed)

1. **Initialize Git repository**
   ```bash
   git init
   ```

2. **Add remote origin**
   ```bash
   git remote add origin https://github.com/nicocodeevo-ux/4k_wallpaper_creator.git
   ```

3. **Initial commit**
   ```bash
   git add .
   git commit -m "Initial commit: 4K Wallpaper Creator app"
   ```

## Daily Workflow

### 1. Pull Latest Changes (Start of Day)

Before starting work, always pull the latest changes from the remote repository:

```bash
git pull origin main
```

If you encounter merge conflicts, resolve them manually and then:
```bash
git add .
git commit -m "Resolved merge conflicts"
```

### 2. Check Current Status

Before making changes, check what branch you're on and the current status:

```bash
git status
git branch
```

### 3. Create a Feature Branch (Optional but Recommended)

For new features or significant changes:

```bash
git checkout -b feature/your-feature-name
```

Examples:
- `git checkout -b feature/add-filters`
- `git checkout -b fix/download-bug`
- `git checkout -b enhance/ui-improvements`

### 4. Make Your Changes

Edit your files as needed. Use your code editor to make changes.

### 5. Check What Changed

Review your changes before committing:

```bash
git status
git diff
```

To see changes for a specific file:
```bash
git diff path/to/file
```

### 6. Stage Your Changes

Stage all changes:
```bash
git add .
```

Or stage specific files:
```bash
git add App.tsx components/Header.tsx
```

### 7. Commit Your Changes

Commit with a descriptive message:

```bash
git commit -m "Your descriptive commit message"
```

**Good commit message examples:**
- `git commit -m "Add image filter functionality"`
- `git commit -m "Fix download button not working on mobile"`
- `git commit -m "Update README with installation instructions"`
- `git commit -m "Refactor WallpaperDisplay component for better performance"`

**Commit message best practices:**
- Use present tense ("Add feature" not "Added feature")
- Be specific and descriptive
- Keep it under 50 characters if possible
- If you need more detail, add a blank line and then a longer description

### 8. Push Your Changes

If you're on the main branch:
```bash
git push origin main
```

If you're on a feature branch:
```bash
git push origin feature/your-feature-name
```

**First time pushing a new branch:**
```bash
git push -u origin feature/your-feature-name
```

The `-u` flag sets up tracking so future pushes can just use `git push`.

### 9. Create a Pull Request (If Using Feature Branches)

1. Go to https://github.com/nicocodeevo-ux/4k_wallpaper_creator
2. Click "Pull requests" → "New pull request"
3. Select your feature branch
4. Add a description of your changes
5. Click "Create pull request"
6. Review and merge when ready

## Common Scenarios

### Scenario 1: Quick Fix on Main Branch

```bash
# Pull latest changes
git pull origin main

# Make your changes
# ... edit files ...

# Stage and commit
git add .
git commit -m "Fix: resolve download button issue"

# Push
git push origin main
```

### Scenario 2: Working on a New Feature

```bash
# Pull latest changes
git pull origin main

# Create feature branch
git checkout -b feature/add-style-presets

# Make your changes
# ... edit files ...

# Stage and commit
git add .
git commit -m "Add style preset functionality"

# Push feature branch
git push -u origin feature/add-style-presets

# Create pull request on GitHub
# After review, merge to main
```

### Scenario 3: Undoing Changes

**Undo uncommitted changes to a file:**
```bash
git checkout -- filename
```

**Undo all uncommitted changes:**
```bash
git reset --hard
```

**Undo last commit (keep changes):**
```bash
git reset --soft HEAD~1
```

**Undo last commit (discard changes):**
```bash
git reset --hard HEAD~1
```

### Scenario 4: Viewing History

```bash
# View commit history
git log

# View compact history
git log --oneline

# View last 5 commits
git log -n 5

# View changes in a commit
git show commit-hash
```

### Scenario 5: Switching Branches

```bash
# List all branches
git branch -a

# Switch to existing branch
git checkout branch-name

# Create and switch to new branch
git checkout -b new-branch-name

# Delete a branch (after merging)
git branch -d branch-name
```

## Authentication

When pushing for the first time, you'll need to authenticate:

### Option 1: Personal Access Token (Recommended)

1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token with `repo` permissions
3. Use the token as your password when prompted

### Option 2: SSH Key

1. Generate SSH key:
   ```bash
   ssh-keygen -t ed25519 -C "your_email@example.com"
   ```

2. Add to SSH agent:
   ```bash
   eval "$(ssh-agent -s)"
   ssh-add ~/.ssh/id_ed25519
   ```

3. Add public key to GitHub (Settings → SSH and GPG keys)

4. Update remote URL:
   ```bash
   git remote set-url origin git@github.com:nicocodeevo-ux/4k_wallpaper_creator.git
   ```

## Best Practices

1. **Commit often**: Make small, logical commits
2. **Pull before push**: Always pull before pushing to avoid conflicts
3. **Write good commit messages**: Be clear and descriptive
4. **Use branches**: Keep main stable, develop in feature branches
5. **Review before committing**: Use `git status` and `git diff`
6. **Don't commit sensitive data**: Check `.gitignore` includes `.env.local`
7. **Keep commits focused**: One feature/fix per commit when possible

## Quick Reference

```bash
# Daily workflow
git pull origin main          # Get latest changes
git status                    # Check status
git add .                     # Stage all changes
git commit -m "message"       # Commit changes
git push origin main          # Push to remote

# Branch workflow
git checkout -b feature/name  # Create feature branch
git add .                     # Stage changes
git commit -m "message"       # Commit
git push -u origin feature/name  # Push branch

# Useful commands
git log --oneline            # View history
git diff                     # View changes
git branch                   # List branches
git remote -v                # View remotes
```

## Troubleshooting

**Problem: "fatal: refusing to merge unrelated histories"**
```bash
git pull origin main --allow-unrelated-histories
```

**Problem: "Your branch is ahead of 'origin/main' by X commits"**
```bash
git push origin main
```

**Problem: "Your branch is behind 'origin/main' by X commits"**
```bash
git pull origin main
```

**Problem: Merge conflicts**
1. Open conflicted files
2. Look for `<<<<<<<`, `=======`, `>>>>>>>` markers
3. Edit to resolve conflicts
4. Remove conflict markers
5. `git add .`
6. `git commit -m "Resolved merge conflicts"`
7. `git push origin main`
