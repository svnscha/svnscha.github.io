+++
title = "Simplify SSH"
date = "2024-10-03"
description = "How to stop typing your SSH Key passphrase every time. (because, let's be real, we're all a little lazy)"
+++

## Why, You Ask?

Every time I needed to SSH into a server, I'd be met with the same tedious ritual: entering my key passphrase again and again. You know the drill — open the terminal, type in your command, and boom! Another reminder that you still haven't figured out how to make your SSH key work seamlessly. But why, you ask? Because apparently, I love to live dangerously on the edge of frustration.

**It's time-consuming and frustrating. I'm tired of it.**

## Getting Started

So, you've got your shiny new SSH key and every time you want to connect to a server, you're greeted with that ever-familiar password prompt. Sure, typing your SSH key passphrase every time is good for security, but, come on — who wants to do that? I mean, I don't know about you, but I've got enough passwords to remember without constantly dealing with this nonsense.

Let's save ourselves some time and effort by getting the SSH agent to remember our keys for us. That way, you can just run your commands like the seasoned developer you are without worrying about the whole "password entering" thing every single time.

## Step 1: Start the SSH Agent

First things first — let's get the SSH agent up and running. It's like your personal SSH butler, here to remember your key so you don't have to.

Open up your terminal and type:

```bash
eval $(ssh-agent -s)
```

Boom! Now the agent is running in the background, ready to hold your keys like the responsible little daemon it is.

## Step 2: Add your key to the SSH Agent

Now that the agent is up, let's give it your key. You only need to do this once per session, and the agent will keep it ready for you.

```bash
ssh-add ~/.ssh/your_key
```

Replace `your_key` with the actual name of your private key file (you know, the one you just painstakingly created). Now, enter your passphrase *just this one time* — I promise — and you're set for the rest of your terminal session. No more typing that passphrase again and again.

## Step 3: Configure your SSH setup to be even lazier (I mean efficient)

Okay, we've got the agent running and the key added, but we can take it one step further. Why not tell SSH exactly what key to use for which server, so you never have to worry about it picking the wrong one?

To do this, we're going to set up a `~/.ssh/config` file. If you don't have this file yet, don't worry — it's as easy as creating it:

```bash
touch ~/.ssh/config
```

Now, crack open that file with your favorite text editor and set things up like this:

```bash
Host your-server-alias
    HostName your.server.com
    User your-username
    IdentityFile ~/.ssh/your_key
    IdentitiesOnly yes
```

### Breaking it down

- **Host**: You can use any alias here that makes sense to you. This is what you'll type when you want to connect to this server.
- **HostName**: The actual domain or IP address of the server.
- **User**: Your username on that server — this is where the "no more user mismatch" magic happens.
- **IdentityFile**: The path to your SSH private key.
- **IdentitiesOnly yes**: Tells SSH to use *only* this key, rather than trying every key it can find in the agent (which is how you avoid that annoying "user mismatch" issue).

## Step 4: Create a wrapper script for SSH Agent control

Alright, you want control over when your SSH agent starts up — totally understandable! Instead of running the agent automatically on login (which might feel a bit *too* autonomous), we'll create a neat little wrapper script. You can trigger it whenever you feel like starting the agent and adding your SSH key for the session.

Here's how to set that up.

### Create the wrapper script

Let's create a script that starts the SSH agent, adds your key, and gives you control over when it runs. We'll call this script `init-ssh`, and we'll stick it somewhere like `/usr/local/bin` so it's available from anywhere in your terminal.

1. **Create the script:**
   Open your terminal and create the `init-ssh` script:

    ```bash
    sudo nano /usr/local/bin/init-ssh
    ```

2. **Add the script content:**
   Paste the following content into the file:

    ```bash
    #!/bin/bash

    # Start the SSH agent
    eval $(ssh-agent -s)

    # Add the key to the agent
    ssh-add ~/.ssh/your_key

    # Optional: Display agent status for peace of mind
    ssh-add -l
    ```

3. **Make the script executable:**
   Give the script executable permissions:

   ```bash
   sudo chmod +x /usr/local/bin/init-ssh
   ```

#### How to use the script

Whenever you want to start your SSH agent for a session, just run:

```bash
. init-ssh
```

This will start the agent, add your key, and show you a list of the keys currently loaded in the agent. You've got full control — start the agent when you want, stop it when you're done, and enjoy a password-free SSH experience for the duration of that session.

### Optional: Stopping the SSH Agent

If you want to stop the SSH agent after you're done with it, you can either let it die when you close your terminal or manually kill it with:

```bash
eval $(ssh-agent -k)
```

That way, you get all the convenience of an SSH agent when you need it, without it running indefinitely in the background. You're now in complete control of your SSH setup, and you can keep things secure and efficient, exactly the way you like it.

Happy SSH'ing!
