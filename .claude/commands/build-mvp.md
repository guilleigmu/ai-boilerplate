---
description: Research, plan, and build a complete MVP dashboard from a product description
argument-hint: "<product-description>"
---

# Build MVP Command

You will orchestrate the complete MVP creation process for: **$ARGUMENTS**

## CRITICAL: Ask Questions First

**BEFORE starting any work**, ask clarifying questions to ensure you understand the requirements. It is MUCH better to ask many questions upfront than to rewrite code later.

Use the `AskUserQuestion` tool to clarify:

1. **Core Features**: What are the 3-5 most important features for the MVP?
2. **Data Model**: What are the main entities/objects to track?
3. **User Workflow**: What's the primary user journey through the dashboard?
4. **Visual Style**: Any preference for theme/colors? (modern, minimal, bold, dark, etc.)
5. **Specific Requirements**: Any must-have integrations, specific fields, or business rules?

Example questions to ask:
- "What are the key metrics you want to see on the main dashboard?"
- "Should [entity] have a relationship with [other entity]?"
- "Do you need bulk operations (import/export) for any data?"
- "Any specific chart types or visualizations needed?"

**Only proceed once you have enough clarity to build confidently.**

---

## Process Overview

This command runs these steps in sequence:

1. **Ask clarifying questions** - Understand requirements fully
2. **Create feature branch** - Keep main clean
3. **mvp-product-researcher** - Research and planning phase
4. **mvp-implementer** - Implementation phase

---

## Step 1: Extract Product Name

First, derive a kebab-case product name from the description for file naming:

Example: "inventory management dashboard" → `inventory-management`

Store this as `{product_name}` for use in file paths.

---

## Step 2: Create Feature Branch

Before making any changes, create a new git branch to keep the main branch clean:

```bash
# Ensure we're on main and it's clean
git checkout main
git pull origin main 2>/dev/null || true

# Create and switch to new feature branch
git checkout -b mvp/{product_name}
```

**Branch naming:** `mvp/{product_name}` (e.g., `mvp/inventory-management`)

If the branch already exists, ask the user if they want to:
1. Continue on the existing branch
2. Delete and recreate the branch
3. Use a different branch name

**Report to user:** "Created branch `mvp/{product_name}` - all changes will be isolated from main."

---

## Step 3: Launch Research Agent

Use the Task tool to launch the `mvp-product-researcher` agent with `subagent_type: "mvp-product-researcher"`:

```
Task: mvp-product-researcher

Prompt:
Research and plan an MVP for the following product:

**Product Description:**
$ARGUMENTS

**Requirements:**
1. Search for UI/UX inspiration on Dribbble, Behance, and similar sites
2. Research common features and best practices for this type of dashboard
3. Design a comprehensive database schema (NO auth tables, NO payment tables)
4. Create a detailed implementation plan

**Output:**
Save the complete plan to: `.claude/doc/{product_name}/mvp_plan.md`

**Product Name for files:** {product_name}
```

**WAIT** for the research agent to complete before proceeding.

---

## Step 4: Verify Research Output

After the research agent completes:

1. Confirm the plan file exists at `.claude/doc/{product_name}/mvp_plan.md`
2. Read the plan to verify it contains:
   - Design research findings
   - Database schema
   - Implementation roadmap
   - File checklist

If the plan is incomplete or missing, report the issue and stop.

---

## Step 5: Launch Implementation Agent

Use the Task tool to launch the `mvp-implementer` agent with `subagent_type: "mvp-implementer"`:

```
Task: mvp-implementer

Prompt:
Implement the MVP based on the research plan.

**Product Name:** {product_name}
**Plan Location:** `.claude/doc/{product_name}/mvp_plan.md`

**Instructions:**
1. Read the implementation plan thoroughly
2. Select an appropriate theme from @tweakcn based on the design recommendations
3. Implement the database schema with proper relations and indexes
4. Create the data access layer for all entities
5. Install required shadcn components
6. Build all pages under /admin/{product_name}/
7. Create server actions with Zod validation
8. Add seed data for demonstration
9. Run the audit checklist

**Goal:** A functional, deployable MVP that can be demonstrated immediately.
```

**WAIT** for the implementation agent to complete.

---

## Step 6: Commit Changes

After implementation is complete, commit all changes to the feature branch:

```bash
git add -A
git commit -m "feat({product_name}): implement MVP dashboard

- Add database schema with Drizzle ORM
- Create data access layer
- Implement admin pages and components
- Add server actions with validation
- Include seed data for demonstration

🤖 Generated with Claude Code (https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Step 7: Final Report

After both agents complete, provide a summary to the user:

```
## MVP Build Complete! 🚀

**Product:** {product_name}
**Branch:** `mvp/{product_name}`

### Git Status ✓
- Created branch: `mvp/{product_name}`
- All changes committed
- Main branch untouched

### Research Phase ✓
- Plan saved to: `.claude/doc/{product_name}/mvp_plan.md`
- [Summary of research findings]

### Implementation Phase ✓
- Theme applied: [theme name]
- Database tables: [list]
- Pages created: [list]
- Components installed: [list]

### Next Steps
1. Start the dev server: `pnpm dev`
2. Run migrations: `pnpm db:push`
3. Seed the database: `pnpm db:seed`
4. Access the dashboard at: http://localhost:3000/admin/{product_name}
   (Use ADMIN_USERNAME and ADMIN_PASSWORD from .env for HTTP Basic Auth)

### When Ready to Merge
```bash
git checkout main
git merge mvp/{product_name}
```

### Files Created
[List of all new files]
```

---

## Error Handling

If either agent fails:

1. Report which phase failed
2. Show any error messages
3. Suggest how to retry (e.g., run individual agent manually)

---

## Notes

- Both agents use the Opus model for thorough work
- The research phase typically takes longer due to web searches
- Implementation follows existing boilerplate patterns exactly
- All routes are protected under `/admin/*` via proxy.ts
- No auth or payment systems are included (MVP focus)
