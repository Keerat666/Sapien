# Sapien Contribution Guidelines

Thanks for your interest in contributing to Sapien — an open-source Prompt Management & Discovery Platform. This guide helps you contribute effectively, including steps to participate in Hacktoberfest.

Useful project links:
- UI app entry: [Sapien/ui/src/App.tsx](Sapien/ui/src/App.tsx)
- Components directory: [Sapien/ui/src/components](Sapien/ui/src/components)
- Contributors page: [Sapien/ui/src/pages/Contributors.tsx](Sapien/ui/src/pages/Contributors.tsx)
- UI setup guide: [Sapien/ui/README.md](Sapien/ui/README.md)

## How to Contribute

1) Find or file an issue
- Browse existing issues or propose a new one with a clear scope (bug, feature, doc).
- If you’re claiming an issue, comment to avoid duplicate work.

2) Set up the UI locally
- Requires Node.js 24 (via nvm). See [Sapien/ui/README.md](Sapien/ui/README.md).
- Quick start (Windows PowerShell):
  ```powershell
  nvm install 24
  nvm use 24
  cd Sapien/ui
  npm i
  npm run dev
  ```
- The app runs with Vite and Tailwind, using shadcn/ui components.

3) Make your change
- UI components live in [Sapien/ui/src/components](Sapien/ui/src/components).
- Prefer TypeScript and follow existing patterns (functional components, hooks, Tailwind utility classes).
- Reuse shadcn/ui components under [Sapien/ui/src/components/ui](Sapien/ui/src/components/ui) and utilities like cn from [Sapien/ui/src/lib/utils.ts](Sapien/ui/src/lib/utils.ts) if present.
- Keep code minimal, accessible, and consistent with current styling.

4) Test locally
- Verify routes are registered in [Sapien/ui/src/App.tsx](Sapien/ui/src/App.tsx) when adding pages.
- Check interactions (buttons, forms, toasts) and responsiveness.

5) Commit and push
- Branch name: feature/<short-name> or fix/<short-name>.
- Commit messages should be clear and scoped (e.g., feat: add RatingComponent interactions).

6) Open a Pull Request
- Link the PR to the related issue.
- Include a concise description, screenshots (if UI), and test steps.
- Be responsive to review feedback.

## Component Location

- New shared UI or page-level pieces go here:
  - Components: [Sapien/ui/src/components](Sapien/ui/src/components)
  - Page components: [Sapien/ui/src/pages](Sapien/ui/src/pages)

Keep components typed, documented (inline comments where useful), and composable.

## Add Yourself to the Contributor Wall

Add your entry to the contributors array in [Sapien/ui/src/pages/Contributors.tsx](Sapien/ui/src/pages/Contributors.tsx). Example:

````tsx
// ...existing code...
const contributors = [
  {
    name: 'Gurkeerat',
    githubId: 'keerat666',
    role: 'Maintainer',
    avatar: 'https://avatars.githubusercontent.com/u/18071315?v=4',
  },
  // Add your name below
  {
    name: "Your Name",
    githubId: "your-github-username",
    role: "Contributor",
    avatar: "https://avatars.githubusercontent.com/u/<your-id>?v=4"
  }
];
// ...existing code...
````

Commit this change in the same PR as your contribution.

## Hacktoberfest: How to Participate with Sapien

Make your contributions count for Hacktoberfest:

- Register for Hacktoberfest on the official website before submitting PRs.
- Look for issues labeled "good first issue" or "help wanted" in this repo.
- Create focused, high‑quality PRs that solve a single problem.
- Link your PR to its issue and add a clear description, screenshots (if UI), and test steps.
- If your PR is not merged quickly, you may request the maintainers to add the "hacktoberfest-accepted" label.

Your PRs should not be spammy or low‑effort; such PRs may be marked invalid and won’t count.



## Get your GitHub avatar link (find your numeric "id")

Build your avatar URL as:

- https://avatars.githubusercontent.com/u/<your-id>?v=4

Ways to find your `<your-id>`:

1) Browser (no tools)
- Open: https://api.github.com/users/<your-github-username>
- Copy the number from the "id" field.
- Example: id = 12345678 → https://avatars.githubusercontent.com/u/12345678?v=4

2) Windows PowerShell
```powershell
# Replace with your GitHub username
$u = 'your-github-username'
$id = (Invoke-RestMethod "https://api.github.com/users/$u").id
"https://avatars.githubusercontent.com/u/$id?v=4"
```

3) GitHub CLI (optional)
```bash
# Requires: https://cli.github.com/
gh api users/your-github-username --jq .id
# Then build: https://avatars.githubusercontent.com/u/<printed-id>?v=4
```

Note: You may also use https://github.com/<username>.png, but for consistency in this project prefer the id‑based URL above.