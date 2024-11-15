+++
title = "Moving to Fedora: Automating Discord Updates with Ansible"
date = "2024-11-15"
description = "Because life's too short to manually update Discord every week."
+++

## Why, You Ask?

So, you've found yourself running Fedora and decided to install Discord, huh? Great choice — Fedora is fantastic. But then you realize Discord's tarball updates are a hassle. Every week, it's the same story: download, extract, and pray you didn't miss a step. Tedious, right?

Fear not! This is where Ansible swoops in to save the day. Let's walk through a playbook that automates the entire process of installing and updating Discord on Fedora. Say goodbye to manual labor and hello to efficiency.

## Step 1: Understanding the Process

Discord on Linux isn't as straightforward as we'd like. Flatpak is an option, but it can be slow with updates or cause compatibility issues. For those of us who prefer the direct tarball approach, we need a way to automate the mess. With Ansible, we can ensure Discord is always up-to-date with just one command. No more hunting for the latest download link or worrying about cleaning up old versions.

## Step 2: The Playbook
Here's an Ansible playbook to make your life easier. It handles everything — downloading the tarball, extracting it to the proper location, and cleaning up afterward.

```yml
---
- name: Install and Update Discord on Fedora 41 using Ansible
  hosts: localhost
  become: true
  tasks:
    - name: Ensure /usr/share/discord is removed if it exists
      file:
        path: /usr/share/discord
        state: absent

    - name: Download Discord tarball
      get_url:
        url: "https://discord.com/api/download/stable?platform=linux&format=tar.gz"
        dest: "/tmp/discord.tar.gz"
        mode: "0644"

    - name: Create /usr/share/discord directory
      file:
        path: /usr/share/discord
        state: directory
        mode: "0755"

    - name: Extract Discord tarball to /usr/share/discord
      unarchive:
        src: "/tmp/discord.tar.gz"
        dest: "/usr/share/discord/"
        remote_src: true
        extra_opts: ["--strip-components=1"]
      args:
        creates: "/usr/share/discord/discord"

    - name: Clean up temporary files
      file:
        path: "/tmp/discord.tar.gz"
        state: absent
```

## Step 3: What This Playbook Does

- Step 1: If Discord is already installed, it removes the existing files to prevent conflicts.
- Step 2: It downloads the latest stable Discord tarball directly from the official API.
- Step 3: Creates the required directory at `/usr/share/discord`.
- Step 4: Extracts the tarball into `/usr/share/discord`, stripping unnecessary folder components.
- Step 5: Cleans up temporary files, leaving your system tidy.

## A Note About Bash Aliases

If you're like me and love shortcuts, consider adding a bash alias to streamline running the playbook. This way, updating Discord becomes as simple as typing a single command. Here's how you can set it up:

```bash
cat ~/.bashrc.d/alias.sh
alias ansible-venv=". ~/repos/ansible/.venv/bin/activate"
alias update-discord="ansible-venv && ansible-playbook ~/repos/ansible/update-discord.yml --connection=local -K"
```

With this in place:

- `ansible-venv` activates your virtual environment for Ansible.
- `update-discord` runs the playbook with local connection and prompts for sudo permissions when needed.

Now, keeping Discord updated is literally a one-liner. Perfect, right?

## Wrapping Up
With this playbook, you're one command away from keeping Discord updated effortlessly. Whether you're installing it for the first time or just keeping up with their relentless update schedule, this playbook has you covered.

So, go ahead — run it, relax, and enjoy Fedora without the hassle. Because let's face it: managing updates manually is so last year.
