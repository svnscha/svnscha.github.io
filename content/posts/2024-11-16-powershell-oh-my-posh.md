+++
title = "PowerShell with oh-my-posh"
date = "2024-11-16"
description = "Because a consistent PowerShell setup is the real productivity flex."
+++

# Why, You Ask?

So, I'm running Fedora, but here's the twist — I'm using PowerShell even on Linux. Why? Because I love having a consistent shell experience, no matter where I'm working. Workstations, VMs, devcontainers or Windows — PowerShell is my go-to shell, and I want it to look and behave the same everywhere. Enter [oh-my-posh](https://ohmyposh.dev/), the perfect companion to give PowerShell some style and functionality.

Let me walk you through how I set it up with [Cascadia Code Nerd Font](https://www.nerdfonts.com/font-downloads) and configured KDE Konsole for a smooth experience. Spoiler alert: it's simple but super effective.

Oh and guess what: This all works on Windows using Windows Terminal, too.

## Step 1: Install oh-my-posh

First, we need to install oh-my-posh. It's as easy as running this command:

```bash
curl -s https://ohmyposh.dev/install.sh | bash
```

This script downloads the latest version of oh-my-posh and installs it. Feel free to inspect the script if you're cautious. If you're running Windows the installation is slightly different, but I guess you figure this out.

## Step 2: Install Cascadia Code Nerd Font

oh-my-posh relies on a Nerd Font for its icons and styling. I chose Cascadia Code Nerd Mono because it's clean and works beautifully across different environments.

```bash
oh-my-posh font install
```

Set the Font in KDE Konsole:

- Open Konsole.
- Go to Settings > Edit Current Profile > Appearance.
- Click Edit Font and select Cascadia Code Nerd Mono.

Set the Font in Windows Terminal:

- Open Settings
- Navigate to Font and choose Cascadia Code Nerd Mono.

## Step 3: Seamlessly integrate PowerShell with oh-my-posh
To make oh-my-posh work seamlessly in PowerShell, edit your `$PROFILE` file.

```bash
code $PROFILE
```

Add the following lines to load oh-my-posh with your configuration:

```powershell
oh-my-posh init pwsh --config "/path/to/oh-my-posh.json" | Invoke-Expression
clear
```

This initializes oh-my-posh with your chosen theme and clears the screen for a clean start.

### Step 4: My oh-my-posh configuration

Here's my oh-my-posh config file. It's simple but does the job perfectly:

```json
{
  "$schema": "https://raw.githubusercontent.com/JanDeDobbeleer/oh-my-posh/main/themes/schema.json",
  "blocks": [
    {
      "type": "prompt",
      "alignment": "left",
      "segments": [
        {
          "properties": {
            "cache_duration": "none",
            "style": "full"
          },
          "template": "{{ .Path }} ",
          "foreground": "#77E4F7",
          "type": "path",
          "style": "plain"
        },
        {
          "properties": {
            "cache_duration": "none"
          },
          "template": "{{ .HEAD }} ",
          "foreground": "#FFE700",
          "type": "git",
          "style": "plain"
        },
        {
          "properties": {
            "cache_duration": "none"
          },
          "template": "$ ",
          "foreground": "#43D426",
          "type": "text",
          "style": "plain"
        }
      ]
    }
  ],
  "version": 3
}
```

- Path Segment: Displays the current directory in a bright cyan.
- Git Segment: Shows the current Git branch in yellow, if applicable.
- Prompt Character: Displays a green $, keeping it clean and minimal.

## Step 5: (optional) Create a New Profile for PowerShell in Konsole

Let's set up a dedicated profile for PowerShell in Konsole:

Duplicate an Existing Profile:

- In Konsole, go to Settings > Manage Profiles.
- Select your default profile and click Duplicate.

Configure the PowerShell Profile:

- Rename it to PowerShell.
- Set the command to pwsh.
- Under Appearance, set the font to Cascadia Code Nerd Mono.
- Save your changes.
- Set it as default (optional)

## Wrapping Up

With oh-my-posh, Cascadia Code Nerd Font, and a dedicated profile in KDE Konsole, my PowerShell setup is consistent, stylish, and super effective. Whether I'm on Fedora, a VM, or a devcontainer, my terminal always feels like home.

If you're a PowerShell fan like me, give this setup a try. Trust me, your terminal (and your productivity) will thank you.