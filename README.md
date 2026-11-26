# Mega Safe Security Services Sdn Bhd

A responsive static corporate website for GitHub Pages. Built with plain HTML, CSS and JavaScript; no framework, package installation or build step is required.

## Homepage and corporate pages

- `index.html` — main homepage, About Mega Safe, Director's Message, Company Information, sectors, media, licences and proposal request.
- `pages/vision-mission.html` — Vision & Mission.
- `pages/our-company.html` — Company introduction and company goals.
- `pages/management-organisation.html` — management and organisation chart.
- `pages/our-services.html` — detailed security services.
- `pages/our-office.html` — office information.
- `pages/projects-experience.html` — projects and experience.

The Explore menu opens these detailed corporate pages separately, keeping the homepage focused and uncluttered.

## Assets

All original supplied Mega Safe assets are retained in `assets/mega-safe/`, including the logo, director portrait, organisation chart, company profile PDF, company reference image and media photographs.

## Edit and preview

Open this folder in VS Code and open `index.html` in a browser. Keep the folder structure intact because asset paths are relative.

## Publish on GitHub Pages

Upload the contents of this folder to the repository root, then enable **Settings → Pages → Deploy from a branch** and select the `main` branch and `/ (root)` folder.

## Quotation form

The form validates required customer details and opens WhatsApp with the request prepared. Email and Google Form actions remain available.


## Security notes

- This website is a static GitHub Pages site. Anything placed in `index.html`, CSS, or browser JavaScript is public and can be inspected by visitors.
- Never place API keys, private tokens, bot tokens, passwords, signing secrets, or database credentials in frontend files or commit them to this repository.
- Keep confidential credentials in a server-side environment variable or secret manager, and call the backend through an authenticated HTTPS endpoint.
- GitHub Pages cannot run private server-side code. Use a backend such as a Cloudflare Worker or another serverless/server application for operations that require secrets.
- Public contact details and public website content are not secret credentials.
- Removing credentials from the page does not by itself guarantee that a website cannot be hacked. Use HTTPS, least-privilege credentials, input validation, access controls, dependency updates, and monitoring.
