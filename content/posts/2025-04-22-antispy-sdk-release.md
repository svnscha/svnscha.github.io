+++
title = "🚀 New Release: antispy SDK 2025.1.0"
date = "2025-04-22"
description = "Because shipping an antispy SDK in 2025 still makes sense."
+++

By day, I specialize in system insights and observability as part of the [uberAgent](https://uberagent.com) team at Citrix. By night, I delve into paranoia engineering with the antispy SDK. Together with [Rene Windegger](https://www.windegger.wtf/), we've been developing and maintaining this project for six years, continuously releasing updates since its inception. Today, we're thrilled to introduce version 2025.1.0.

What began as a weekend experiment to confuse disassemblers has evolved into a robust SDK for developers who care deeply about safeguarding their binaries.

## What's New?

### 📚 Comprehensive Documentation
We've documented everything-every macro, every intricate detail of the virtual machine, and even the obscure compile-time tricks. Explore it all at [antispy.xyz/docs](https://antispy.xyz/docs). Plus, you can test examples live.

### ✨ Compiler Explorer Integration
Meet [play.antispy.xyz](https://play.antispy.xyz), your in-browser playground for experimenting with the SDK. Adjust macros, tweak compile options, and analyze disassembly to your heart's content. Think of it as godbolt, but tailored for the paranoid.
#### Example

Explore the demo showcasing `libantispy::encrypted_ptr`, a feature that compiles into 22 basic blocks of obfuscated code-serious protection in action.

```cpp
#include <antispy/libantispy.h>

int main() {
    libantispy::encrypted_pointer<int> ptr;
}
```

![Demo 1](/casts/2025-04-22-antispy-sdk-release-demo1.png)

- Try it yourself: [play.antispy.xyz - libantispy::encrypted_pointer](https://play.antispy.xyz/z/E3dh9aPr93zcfjMoW5oazMfnr9o5KxEqYGabEsY8vb46fzrj1fr1)

Unlike `libantispy::encrypted_pointer`, the standard `std::shared_ptr` behaves quite differently, as demonstrated below:

After all, `std::shared_ptr` isn't designed to be obfuscated, is it?

![Demo 2](/casts/2025-04-22-antispy-sdk-release-demo2.png)

### 🧠 Constexpr Code Generation
The antispy virtual machine now supports full compile-time constexpr functionality. Transform data, encrypt logic, and generate obfuscation layers-all before runtime. Who needs CPU cycles anyway?

### ⚙️ Updated Toolchains
We've modernized everything so you don't have to:
- **Android + iOS SDKs:** ✅
- **Outdated compilers:** 🪦
- **Legacy baggage:** 🔥

If you're still using GCC 4.x, well, good luck.

## Why antispy SDK?

Whether you're building high-assurance binaries, implementing anti-reversing measures, or simply enjoy giving disassemblers a hard time, the antispy SDK is for you. It's lean, battle-tested, and unapologetically opinionated. With proper documentation and a live explorer, there's no better time to dive in.

### Platforms & Architectures

The antispy SDK is designed to work seamlessly across almost all major compiler platforms and CPU architectures, provided they support C++20. This includes:

- **Windows:** x86, x64, ARM64
- **Linux:** x86, x64, ARM64
- **macOS:** ARM and Intel
- **iOS:** Including tvOS, watchOS, visionOS
- **Android:** x86, x86_64, armeabi-v7a, armv8a
- **Bare Metal SOCs:** Fully supported

No matter your target platform, the antispy SDK ensures robust compatibility without compromising on performance or security.

**TL;DR:** If C++ metaprogramming excites you and you believe binaries should fight back, this SDK is your perfect match.

Got feedback, feature requests? Let us know-we're probably not sleeping anyway.
