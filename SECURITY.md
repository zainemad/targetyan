Security Policy — Targetyan
Scope
This repository contains a static website: HTML, CSS, JavaScript and image assets.
There is no backend, no database, no authentication, no user accounts and no server-side
code. No secrets or credentials are stored here, and none should ever be committed.

Reporting a vulnerability
Please do not open a public issue.

Email media321action@gmail.com with:

what you found and how to reproduce it
the affected page or asset
whether you have told anyone else
We aim to acknowledge reports within 3 business days.

What counts as in scope
Cross-site scripting or content injection in the served pages
A dependency or asset that is served from a source we do not control
A misconfiguration that exposes data we did not intend to publish
Anything that lets a visitor be redirected or tracked without their knowledge
What is out of scope
The content of the marketing copy itself
Findings that require write access to this repository
Social engineering of team members
Current posture
Served over HTTPS with HSTS (max-age=31556952, set by the host)
Content-Security-Policy enforced (meta tag, plus a real header via 
_headers
 on Cloudflare Pages)
Referrer-Policy: strict-origin-when-cross-origin
X-Frame-Options: DENY and frame-ancestors 'none' (Cloudflare Pages only)
Zero cookies, zero third-party trackers, self-hosted fonts
All external links carry rel="noopener noreferrer"
Two-factor authentication required on every account with write access
Last updated: 2026-09-20
