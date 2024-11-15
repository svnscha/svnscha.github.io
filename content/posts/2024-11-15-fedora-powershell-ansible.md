
+++
title = "Moving to Fedora: Automating PowerShell Installation with Ansible"
date = "2024-11-15"
description = "Because repeating manual steps on multiple machines isn't fun anymore."
+++

# Why, You Ask?

So, you've moved to Fedora and find yourself needing PowerShell — whether it's for scripting, automation, or just that occasional `.ps1` nostalgia. But here's the thing: installing PowerShell manually on one machine is annoying enough. Doing it on several workstations, VMs, devcontainers, or servers? Nope, not happening.

This is where Ansible comes in. With one playbook, you can automate the entire installation process, saving time and making your setups consistent across all environments. Let's break it down.

## Step 1: The Problem

Installing PowerShell on Fedora involves downloading Microsoft's repository package, registering it, updating the package index, and then installing the actual PowerShell package. It's fine if you're doing it once, but if you have to repeat the process on multiple systems, it quickly becomes a chore.

The solution? Use Ansible to do it for you. Write the playbook once, and it works everywhere — no matter how many machines you're dealing with.

## Step 2: The Playbook

Here's the Ansible playbook that automates PowerShell installation on Fedora:

```yaml
---
- name: Install PowerShell on Fedora 41 using Ansible
  hosts: localhost
  become: yes
  gather_facts: true

  tasks:
    - name: Download Microsoft repository package
      ansible.builtin.get_url:
        url: https://packages.microsoft.com/config/rhel/8/packages-microsoft-prod.rpm
        dest: /tmp/packages-microsoft-prod.rpm

    - name: Register Microsoft repository
      ansible.builtin.command:
        cmd: rpm -i /tmp/packages-microsoft-prod.rpm
      args:
        creates: /etc/yum.repos.d/microsoft-prod.repo

    - name: Remove repository package after registration
      ansible.builtin.file:
        path: /tmp/packages-microsoft-prod.rpm
        state: absent

    - name: Update package index
      ansible.builtin.dnf:
        update_cache: yes
        state: latest

    - name: Install PowerShell
      ansible.builtin.dnf:
        name: powershell
        state: present

    - name: Verify PowerShell installation
      ansible.builtin.command:
        cmd: pwsh --version
      register: pwsh_version_output

    - name: Display PowerShell version
      ansible.builtin.debug:
        msg: "Installed PowerShell version: {{ pwsh_version_output.stdout }}"
```

## Step 3: Usage

Running this playbook is straightforward. If you're working with a virtual environment for Ansible, make sure it's activated. Then, execute the playbook locally with the following command:

```bash
ansible-playbook /path/to/install-powershell.yml --connection=local -K
```

Here's a quick breakdown:

- `ansible-playbook`: Runs the playbook.
- `/path/to/install-powershell.yml`: Path to the playbook file.
- `--connection=local`: Executes the playbook on the local machine instead of a remote host.
- `-K`: Prompts for sudo privileges to perform the installation.

With this command, you can easily install PowerShell on your Fedora system without worrying about missing steps.

## Wrapping Up

With this Ansible playbook, PowerShell installation on Fedora is no longer a manual, repetitive task. Whether you're setting up new workstations, provisioning servers, or managing devcontainers, this automation makes the process painless.

So, the next time you're staring down the prospect of yet another manual PowerShell install, let Ansible take care of it. Because honestly, you've got better things to do.