+++
title = "A Git feature I should've met sooner!"
date = "2025-04-04"
description = "I was living in stash-hell and didn't even know it."
+++

# Why, You Ask?

Because I thought I knew Git.
Like really. Branches? Merged. Rebased. Cherry-picked. Heck, I've even force-pushed into production (don't judge me). I've danced the `git stash` tango more times than I care to admit, and I've rage-quit after realizing I checked out the wrong branch with uncommitted changes.

But then-then-I discovered `git worktree`.

And everything changed.

## The Problem With the "Normal" Way™

Let's say you're working on a feature. You're knee-deep in uncommitted changes, and suddenly you need to switch to another branch to hotfix or review something. What do you do?

- `git stash`
- `git checkout other-branch`
- Try to remember what you were doing in your branch later.
- Forget what you stashed and why.
- Cry 

This is the standard Git workflow we all just kind of accept. It's chaotic good at best.

## Enter: `git worktree`

What if I told you... you could just check out multiple branches at the same time? Each in its own separate folder. No stash. No backflips. No existential dread.

`git worktree` is a built-in Git feature that lets you:

- Check out multiple branches at once
- Work on each one in its own directory
- Keep your mental state and filesystem intact

## Examples

Create a new worktree for a feature branch

```bash
git worktree add ../feature-x origin/feature-x
```

This checks out the `feature-x` branch (fetched from `origin`) into a new directory `../feature-x`.

If it's a new feature you start locally, do this:

```bash
git worktree add ../feature-x -b feature-x
```

This creates a new local branch `feature-x` from your current `HEAD` (usually `main`) and checks it out into `../feature-x`.

Wow. 🥳 No more "wait lemme stash real quick."

Now you can commit your fix, push it, and go back to your mess later. Like a civilized developer.

### List all worktrees

```bash
git worktree list
```
Because you will forget what you spun up after the third coffee.

## What's the Catch?
Honestly? Not much. A few things to keep in mind:

You can't check out the same branch twice. Git will yell at you. That's fair.

Deleting a worktree is easy: just `git worktree remove ../feature-x` (the directory) and that's it.

## Why You Need This in Your Life
If you're working on multiple features, doing code reviews locally, fixing stuff mid-feature, or just trying to keep your brain from melting-`git worktree` is the gift you didn't know Git included.

- No more stash juggling.
- No more "which terminal had which branch again?"
- No more "accidentally committed to main" horror stories.

Just clean, parallel workspaces from a single clone.

Use it. Love it. Regret not learning it sooner.
I know I did.

