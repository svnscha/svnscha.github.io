+++
title = "Vibe Coding is So Damn Real"
date = "2025-04-27"
description = "Because watching GitHub Copilot refactor files with a single prompt is the most satisfying thing you'll see today."
+++

## Why, You Ask?

Ever had that moment when your coding flow is so perfect it feels like you and your tools are in some kind of cosmic alignment? That's vibe coding. It's when the friction between thought and implementation practically disappears. And let me tell you, with GitHub Copilot and VS Code, this isn't just a fleeting sensation-it's a consistent reality.

**I'm tired of writing about theoretical capabilities. Let me show you something concrete.**

## A Childhood Dream Come True

Let me share something personal: since I first started coding, I've had this recurring dream. A dream where I could simply talk to my computer, tell it what I want in plain language, and watch as it translates my intentions into working code. No syntax gymnastics. No hunting for semicolons. Just pure, frictionless creation.

- "Hey computer, refactor this module to use dependency injection instead of globals."
- "Computer, optimize this database query, it's running too slow."
- "Add translation support to all user-facing strings in this module."

For decades, this remained firmly in the realm of science fiction-something for Star Trek episodes where they casually ask the computer to "reconfigure the deflector dish" and it just... happens.

**DAMN, we're just there now.** Not in some distant future, not as a tech demo, but as a practical, everyday reality in my development workflow.

## Real-World Context: Nofidoc

A little context: In my free time, I've been pushing the boundaries of what's possible with AI-assisted coding-well beyond just casual experiments. While I also use these workflows at work, Nofidoc has become my personal playground for exploring how far I can take this technology. It's a space where I can try things that aren't always ready for the spotlight, but the results have been too compelling not to share (even if I'm keeping things a bit low-key for now).

The codebase uses Qt for the UI components, has a wizard-based document import flow, and handles various document formats with a focus on PDFs. It's exactly the kind of mid-sized C++ project where refactoring used to be tedious and error-prone.

## The Perfect Pairing

VS Code with GitHub Copilot doesn't just assist your coding-it transforms it. No more wasting precious brain cycles on trivial tasks. No more tedious refactoring operations that make you question your career choices at 2 AM.

I recently needed to refactor the document import workflow to remove direct database dependencies in the wizard component. Why having that in the first place? Well, getting something proof-of-concept-ish is the answer. Anyways, this is a classic case of improving architecture by decoupling components, but it typically requires careful changes across multiple files and understanding the entire call hierarchy.

## See The Entire Workflow In Action

I've recorded a full ~6-minute video showing the entire refactoring process from start to finish. You'll see me:

1. Prompt Copilot with my refactoring requirements
2. Watch the initial code changes being proposed
3. Hit compilation errors (because real-world code is messy!)
4. Provide additional guidance to Copilot
5. Get a complete, working solution

<video class="cast" src="/casts/2025-04-27-vibe.webm" controls>
  Your browser does not support the video tag.
</video>

What's remarkable here is not just that Copilot could make the changes, but how the entire interaction feels like working with a senior developer who deeply understands your codebase.

## The Real Example: DocumentImportWizard Refactoring

Here's a snapshot of what happened in the video. I needed to update the DatabaseWidget class to use the new API of our DocumentImportWizard that we had refactored to remove direct database dependencies. 

Copilot analyzed the code and came up with this solution:

```cpp
// Before refactoring, direct database dependency:
void DatabaseWidget::onDocumentImportWizard()
{
    auto importWizard = new DocumentImportWizard(_database, this);
    importWizard->exec();
}

// After refactoring, using callback approach:
void DatabaseWidget::onDocumentImportWizard()
{
    auto importWizard = new DocumentImportWizard(this);
    importWizard->setGetDocumentTypesCallback([this]() {
        if (!_database)
            return QList<DocumentType>();
            
        auto docTypeService = _database->getDocumentTypeService();
        if (!docTypeService)
            return QList<DocumentType>();
            
        return docTypeService->getDocumentTypes();
    });
    importWizard->exec();
}
```

Copilot explained its reasoning:

> *"I've updated the onDocumentImportWizard() method in DatabaseWidget to use the new refactored API of our DocumentImportWizard class. The key changes were:*
> 
> *1. Removed passing the _database parameter directly to the DocumentImportWizard constructor*
> *2. Added a call to setGetDocumentTypesCallback() with a lambda that:*
> - Checks if _database is valid
> - Gets the document type service from the database
> - Returns the document types list from the service
> - Returns an empty list if any step fails
> 
> *This completes the refactoring work by updating all the calling code to use the new API. The change maintains the same functionality but with a cleaner design that removes direct dependencies on the database pointer.*
> 
> *The implementation follows modern C++ practices by using a lambda to encapsulate the specific functionality needed (getting document types) while keeping the rest of the database access logic out of the wizard class. This makes the code more maintainable and easier to test."*

This is exactly the kind of architectural improvement that typically takes deep understanding of both the codebase and software design principles. Yet Copilot produced it in seconds.

## The Key Lesson: Human-AI Collaboration

Here's the most important takeaway from my experience: **AI tools are most powerful when paired with your domain expertise.**

Just before that, I was debugging a frustrating issue with field registration in that document import wizard. The fields weren't passing values between pages correctly. I asked Copilot to help fix the bug and it initially proposed an overly complex workaround that would have been a maintenance nightmare.

So I gave it a hint:

"I think there's an issue with the registerField calls for 'importSuccessCount' and 'importErrorCount'. The implementation doesn't specify the property name correctly."

And just like that, it had an "aha!" moment. It immediately identified the real issue:

```cpp
// Before (buggy implementation):
registerField("importSuccessCount", this);

// After (Copilot's correct fix):
registerField("importSuccessCount", this, "importSuccessCount");
```

This simple fix resolved the entire issue. The fix works because it properly uses the Qt property system (third parameter) as the remaining code and pages expected, whereas Copilot's initial workaround was mega ugly - setting properties directly with setProperty() calls. With just a small hint about the actual problem, we were back on track. This perfectly illustrates why domain expertise remains critical - AI tools can suggest solutions, but knowing which ones make sense in your framework requires human judgment.

Sometimes AI tools need a gentle nudge in the right direction, and then they're off to the races again.

## Not Always Perfect Magic

Let me be real with you - it's not all sunshine and rainbows. AI assistance sometimes misses the mark, and when it does, you need to steer it in the right direction. But I've found that:

1. The initial attempt is usually close
2. AI is exceptionally good at understanding feedback
3. With the right hints, it can quickly recover and find the optimal solution

The collaboration workflow is what makes all the difference. Instead of wrestling with a tool, it feels like having a junior developer who's eager to learn and quick to adapt.

## Why This Matters

This isn't just about saving time (though I saved HOURS). It's about changing how we think about coding. When you can express your intent in natural language and have it accurately translated into code changes, you're no longer programming computers-you're conversing with them.

The barrier between thinking and implementing just got so much thinner.

## Getting This Setup Yourself

Want this superpower? Here's what you need:

1. **VS Code**
2. **GitHub Copilot**
3. **A clear understanding of your codebase** - To craft effective prompts

That's it! No complex configuration, no elaborate plugin chains.

Oh, which model? Right now I am using Claude 3.7 - it's so good.

## The Future Is Already Here

You know that saying about technology and magic? This is it. We're witnessing the early days of a transformation in how software gets built. The tools are evolving to understand not just the syntax of our code, but the intent behind it.

Could I have written a complex bash script to do some of this refactoring? Maybe.
Could I have used search-and-replace with regex? Probably.
Would either approach have understood the semantic meaning of my code well enough to know which strings need translation? Absolutely not.

## Wrapping Up

Vibe coding isn't just some feel-good developer term. It's that perfect state where you and your tools are in sync, where expressing your intent feels natural and immediate. With GitHub Copilot and VS Code, I'm experiencing this daily while building Nofidoc.

If you're still doing manual refactoring in 2025, you're not just missing out on productivity-you're missing out on the pure joy of frictionless development.

Try it. Feel it. Vibe code.