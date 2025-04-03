+++
title = "Windows: Install integrated OpenSSH Server"
date = "2025-04-03"
+++

Tired of everyone SSHing into Linux? Flip the script: SSH into Windows from your Linux box. Works great with VSCode Remote too. Here's how to enable the built-in OpenSSH server on Windows.

### Step 1: Check Installed OpenSSH Components

First, open a PowerShell window with administrator privileges. Let's see what's already installed:

```bash
Get-WindowsCapability -Online | Where-Object Name -like 'OpenSSH*'
```

You might see output indicating that the client is installed but not the server:

```
Name  : OpenSSH.Client~~~~0.0.1.0
State : Installed

Name  : OpenSSH.Server~~~~0.0.1.0
State : NotPresent
```

### Step 2: Install the OpenSSH Server

If the server isn't present, let's bring it on board. Run:

```bash
Add-WindowsCapability -Online -Name OpenSSH.Server~~~~0.0.1.0
```

### Step 3: Start and Enable the SSH Server

Now, let's get the `sshd` service up and running:

```bash
Start-Service sshd
```
And ensure it starts automatically with Windows:

```bash
Set-Service -Name sshd -StartupType 'Automatic'
```

That's it.
