# Skill — JTT SEO & Performance

## Purpose
Protect the institutional site's discoverability, Core Web Vitals and perceived speed.

## Load when
- changing metadata
- adding images/video
- changing fonts
- adding animation/3D
- preparing production

## Rules
- Use Next.js metadata conventions.
- Preserve a single clear H1.
- Maintain logical heading hierarchy.
- Provide meaningful title/description and social metadata.
- Use semantic links and descriptive labels.
- Optimize images and use appropriate responsive sizing.
- Do not load heavy visual effects before they are necessary.
- Keep hero assets prioritized and below-fold assets deferred where appropriate.
- Avoid unnecessary client-side JavaScript.
- Avoid layout shifts from images, fonts and animated containers.
- Do not use fake SEO copy or keyword stuffing.

## Validation
Review:
- production build
- page source/metadata
- image dimensions/loading
- font loading
- client bundle impact of interactive sections
- mobile performance
