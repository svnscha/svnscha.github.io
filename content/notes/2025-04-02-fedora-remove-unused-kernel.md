+++
title = "Fedora: Remove old kernel versions"
date = "2025-04-02"
+++

Sometimes, kernel updates pile up like empty pizza boxes on a lazy Sunday. If you're running a Fedora or RHEL-based system, here's how you can check which kernels are installed and clean up the old ones - keeping only the one you're currently using.

### Step 1: List all installed kernels

To see which `kernel-core` packages are installed:

```bash
rpm -q kernel-core
```

This will output a list of all installed kernel versions. You'll likely see several if you've been updating your system regularly without cleaning up.

### Step 2: Check the currently running kernel

Before we start nuking kernels, let's make sure we know which one we're actually running:

```bash
uname -a
```

The version string (e.g., `6.13.8-200.fc41.x86_64`) should match one of the installed kernels you saw in the previous step. Don't delete this one unless you're aiming for chaos.

### Step 3: Remove old kernels

Now it's cleanup time. For every kernel version except the currently running one, run:

```bash
sudo dnf remove kernel-core-<version>
```

That's it.
