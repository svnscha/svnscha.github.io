+++
title = "Where's /etc/pve/firewall/cluster.fw in rescue images?"
date = "2024-10-04"
description = "Ah, so you've locked yourself out of your own Proxmox server. Don't worry, happens."
+++

## Why, You Ask?

So, you've gone and locked yourself out of your Proxmox server, huh? Don't worry, happens. Now you're probably scrambling for a way back in before you fully comprehend that your own firewall rules have turned against you. But hey, no worries! Let's break down this rescue operation step by step.

## Step 1: Mount the Proxmox System

First, you need to access your Proxmox filesystem. If you're using LVM (Logical Volume Management), this step is pretty straightforward:

```bash
mount /dev/mapper/vg0-root /mnt
```

With your filesystem mounted, chroot into it:

```bash
chroot /mnt/
```

Now you're inside your system, ready to work some magic.

## Step 2: Disabling the Firewall

The firewall is likely what caused you to get locked out, so we'll need to disable it temporarily. Run the following commands:

```bash
systemctl disable pve-firewall
systemctl mask pve-firewall
```

Once you've done that, reboot the server. You should now be able to reconnect to your system normally, without the firewall cutting you off.

## Step 3: Fix the Issue and Restore the Firewall

After fixing whatever issue got you locked out, it's time to re-enable the firewall. Run these commands to restore it:

```bash
systemctl unmask pve-firewall
systemctl enable pve-firewall
systemctl start pve-firewall
```

Your firewall should now be back up and running, but without the lockout problem.

## A Note About `/etc/pve/firewall/cluster.fw`

If you're hunting for `/etc/pve/firewall/cluster.fw` while in rescue mode, hoping it's a typical file you can modify directly, you're out of luck. This file is part of Proxmox's cluster-wide configuration and is not stored as a regular file on the disk. Instead, it's managed through Proxmox's internal database, which is part of the [Proxmox Cluster File System (pmxcfs)](https://pve.proxmox.com/wiki/Proxmox_Cluster_File_System_(pmxcfs)). As such, it doesn't exist as a standalone file you can access from rescue mode. To modify this configuration, you'll need to regain full access to Proxmox and make changes from within the Proxmox interface or by editing it via the proper tools once you're back online.

## Wrapping Up

And there you have it! With your system back up and running, and the firewall behaving, you can get back to managing your Proxmox server. Just be cautious next time you tweak the firewall rules — locking yourself out isn't the most fun way to spend your day!
