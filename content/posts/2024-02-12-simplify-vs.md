+++
title = "Simplify Visual Studio Installation"
date = "2024-02-12"
+++

## Why, You Ask?
Every year, like clockwork, I find myself setting up my local dev environment from scratch. And every time, it's the same old song and dance: downloading, installing, configuring.

**It's time-consuming and frustrating. I'm tired of it.**

## Can It Be Easier?
What if setting up a new machine, rolling it back, or tweaking it could be as simple as running a build on a server? What if I told you we could apply the same principles of automation to our local setups?

## Let's Find A Solution
Creating a new development environment shouldn't be a chore. It should be quick, painless, and even a little bit fun. To turn this dream into reality, I need two things: the right software and the perfect setup. That's where `winget` and `.vsconfig` come in.

With a list of essential software and some PowerShell tricks, I began to make boring tasks automatic. I picked each program, from 7Zip to Visual Studio, for its important use. But the adventure of automating everything is a story for another time.

### Streamlining Visual Studio Installation
My main event? Automating Visual Studio installation. Using `winget`, I can install Visual Studio with just a line:

```powershell
winget install -e --id Microsoft.VisualStudio.2022.Enterprise --silent
```

But I didn't stop there. With the `--override` flag, I tailored the installation to include specific workloads, like this:

```powershell
winget install -e --id Microsoft.VisualStudio.2022.Enterprise --silent --override "--wait --quiet --addProductLang En-us --config C:\vs2022.vsconfig"
```

This method sets up Visual Studio with the workload I need without having to manually select each package.

#### What's `.vsconfig`?
`.vsconfig` helps me easily replicate my development environment wherever I am. It's a JSON file that, with just a few clicks in the Visual Studio Installer, allows me to compress my environment workloads into a neat package. This approach is not only perfect for keeping **build servers** and **personal development environments in sync** with identical workloads, but it also simplifies sharing updates and changes with teammates.

**Example: vs2022.vsconfig**

```json
{
  "version": "1.0",
  "components": [
    "Microsoft.VisualStudio.Component.Roslyn.Compiler",
    "Microsoft.Component.MSBuild",
    "Microsoft.VisualStudio.Component.Roslyn.LanguageServices",
    "Microsoft.VisualStudio.Component.SQL.LocalDB.Runtime",
    "Microsoft.VisualStudio.Component.CoreEditor",
    "Microsoft.VisualStudio.Workload.CoreEditor",
    "Microsoft.VisualStudio.Component.TypeScript.TSServer",
    "Microsoft.VisualStudio.ComponentGroup.WebToolsExtensions",
    "Microsoft.VisualStudio.Component.JavaScript.TypeScript",
    "Microsoft.VisualStudio.Component.TextTemplating",
    "Microsoft.VisualStudio.Component.NuGet",
    "Microsoft.VisualStudio.Component.IntelliTrace.FrontEnd",
    "Microsoft.VisualStudio.Component.Debugger.JustInTime",
    "Component.Microsoft.VisualStudio.LiveShare.2022",
    "Microsoft.VisualStudio.Component.IntelliCode",
    "Microsoft.VisualStudio.Component.ClassDesigner",
    "Microsoft.VisualStudio.Component.GraphDocument",
    "Microsoft.VisualStudio.Component.CodeMap",
    "Microsoft.VisualStudio.Component.VC.CoreIde",
    "Microsoft.VisualStudio.Component.VC.Tools.x86.x64",
    "Microsoft.VisualStudio.Component.Graphics.Tools",
    "Microsoft.VisualStudio.Component.VC.DiagnosticTools",
    "Microsoft.VisualStudio.Component.Windows11SDK.22621",
    "Microsoft.VisualStudio.Component.VC.ATL",
    "Microsoft.VisualStudio.Component.SecurityIssueAnalysis",
    "Microsoft.VisualStudio.ComponentGroup.ArchitectureTools.Native",
    "Microsoft.VisualStudio.Component.VC.Redist.14.Latest",
    "Microsoft.VisualStudio.ComponentGroup.NativeDesktop.Core",
    "Microsoft.VisualStudio.Component.Windows11Sdk.WindowsPerformanceToolkit",
    "Microsoft.VisualStudio.Component.CppBuildInsights",
    "Microsoft.VisualStudio.ComponentGroup.WebToolsExtensions.CMake",
    "Microsoft.VisualStudio.Component.VC.CMake.Project",
    "Microsoft.VisualStudio.Component.VC.TestAdapterForBoostTest",
    "Microsoft.VisualStudio.Component.VC.TestAdapterForGoogleTest",
    "Microsoft.VisualStudio.Component.VC.ASAN",
    "Microsoft.VisualStudio.Component.Vcpkg",
    "Microsoft.VisualStudio.Component.VC.Tools.ARM64EC",
    "Microsoft.VisualStudio.Workload.NativeDesktop",
    "Microsoft.VisualStudio.Component.VC.Runtimes.ARM64EC.Spectre"
  ]
}
```

You can create a .vsconfig file with these easy steps:

1. Launch the Visual Studio Installer and choose to modify your setup.
2. Hit More and then select the option to Export your settings into a .vsconfig file.

That's it!

### Why Bother With All This?
I'm all about making life easier, not harder. Thanks to `winget` and Visual Studio's `.vsconfig`, what used to eat up a lot of time now takes no time at all.

Setting up a fresh development environment is now a piece of cake - and I mean the kind of delicious cake you can buy ready-made but tastes as good as anything you'd bake yourself. So here's to spending less time on setup and more on the fun stuff: coding.
