# Preamble — Why These Rules Exist

---

Bad software is built in a hurry.  
Great software is built with a system.

These rules enforce:

- **Structure** so clear, a new developer understands it in 5 minutes
- **Performance** so fast, users never see a loading screen
- **UI** so polished, it feels alive with micro-interactions
- **Code** so modular, any feature can be changed without fear
- **UX** so thoughtful, users never feel lost or confused

---

## The Core Belief

Every decision in software has a cost. The cost of a bad decision compounds over time. The cost of a good decision also compounds — but in your favor.

These rules are the result of accumulated good decisions. They exist because:

1. **Consistency beats cleverness.** A predictable codebase is faster to navigate, easier to debug, and safer to change than a clever one.

2. **Constraints enable speed.** When you don't have to decide where a file goes, what to name a variable, or how to handle a loading state — you move faster. These rules make those decisions for you.

3. **The user is always watching.** Every blank screen, every janky animation, every vague error message is a broken promise to the person using your software.

4. **Technical debt is a choice.** Every shortcut you take today is a tax you pay tomorrow — with interest.

---

## How to Use These Rules

These rules apply to **EVERY project, EVERY time.**  
No exceptions. No "just this once."  
The moment you break one rule, technical debt begins.

**For AI assistants:** Paste `full-rules-single-file.md` as your system instruction.  
**For teams:** Use the checklists in `/checklists` during code review and project setup.  
**For new projects:** Start with `checklists/new-project.checklist.md`.

---

## Rule Priority

When rules conflict (they rarely do), this is the priority order:

1. **Security** — Never compromise user data or system integrity
2. **Accessibility** — Every user must be able to use the product
3. **Iron Laws** — The 5 supreme architectural laws
4. **Performance** — Users must see content instantly
5. **Everything else** — Design system, naming, animation, etc.

---

*"The best code is code that doesn't need to be explained."*
