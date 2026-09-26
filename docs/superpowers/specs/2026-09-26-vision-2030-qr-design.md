# Vision 2030 QR Landing Page Design

## Source identity

The supplied, unmodified 41-page PDF is the authority. Its cover names the document **الرؤية الاستراتيجية 2030**, issued by **بلدية طرابلس المركز**, with the line **معاً لتطوير مدينة طرابلس**. The visual language is warm ivory, olive green, quiet charcoal, watercolor architecture, palms, and restrained floral ornament.

## Architecture

The website is a zero-build static GitHub Pages site. `index.html` is an Arabic RTL landing page; `download.html` is a stable download endpoint. Both use relative links, so they work at the repository subpath. A vendored QR JavaScript library draws the QR locally at runtime from `new URL('download.html', window.location.href)`; this produces the deployed public URL without hardcoding an account, hostname, or local address.

## User flow

Visitors can download the original PDF from the landing page, scan or save the QR code, or copy the download-page link. The download page creates the original PDF URL relative to itself, exposes a manual download control, and attempts an automatic click after rendering. It reports an error state if the linked PDF cannot be fetched.

## Deployment and verification

The repository includes a GitHub Pages Actions workflow using the official upload/deploy actions. Tests inspect the static structure and dynamic URL behavior through a local Node test. Post-deployment checks will use the real public URLs, inspect HTTP headers and the downloaded PDF hash, decode the generated QR, and check the workflow status.
