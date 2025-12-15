# Security Headers Configuration

This project includes security headers to protect against common web vulnerabilities. The headers are configured for multiple deployment platforms.

## Configured Headers

### X-Frame-Options: SAMEORIGIN

Prevents clickjacking attacks by only allowing the site to be embedded in iframes from the same origin.

### X-Content-Type-Options: nosniff

Prevents MIME type sniffing, which could lead to security vulnerabilities. Browsers will respect the Content-Type header.

### X-XSS-Protection: 1; mode=block

Enables the browser's built-in XSS filter and blocks the page if an attack is detected (for older browsers).

### Referrer-Policy: strict-origin-when-cross-origin

Controls how much referrer information is shared. Sends origin only when the protocol security level stays the same.

### Strict-Transport-Security: max-age=63072000; includeSubDomains; preload

Forces browsers to use HTTPS for two years (including subdomains) and signals intent to preload.

### Permissions-Policy

Disables unnecessary browser features:

- `camera=()` - Disables camera access
- `microphone=()` - Disables microphone access
- `geolocation=()` - Disables geolocation access
- `interest-cohort=()` - Disables FLoC tracking

### Content-Security-Policy (CSP)

Defines trusted sources for content:

- `default-src 'self'` - Only load resources from same origin by default
- `script-src 'self'` - Allow same-origin scripts (inline scripts are blocked)
- `style-src 'self' 'unsafe-inline'` - Allow same-origin and inline styles (needed for inline style attributes/Tailwind)
- `img-src 'self' data: https:` - Allow same-origin, data URIs, and HTTPS images
- `font-src 'self' data:` - Allow same-origin and data URI fonts
- `connect-src 'self'` - Only allow same-origin API calls
- `frame-src 'self'` - Only allow same-origin iframes (for embedded Launch Console)
- `base-uri 'self'` - Restrict base tag to same origin
- `form-action 'self'` - Only allow form submissions to same origin

## Deployment Platform Support

### Vercel

Headers configured in `vercel.json`

### Netlify

Headers configured in `netlify.toml`

### Other Platforms (Cloudflare Pages, GitHub Pages, etc.)

Generic headers file in `public/_headers`

## Testing Security Headers

After deployment, you can verify headers are correctly set using:

1. **Browser DevTools**: Network tab → Select any resource → View Response Headers
2. **curl**: `curl -I https://your-domain.com`
3. **Online Tools**:
   - [Security Headers](https://securityheaders.com/)
   - [Mozilla Observatory](https://observatory.mozilla.org/)

## Notes

- Inline scripts are disallowed by default. If you introduce one, prefer nonces/hashes; use `'unsafe-inline'` only if you must.
- Inline styles are allowed to support React/Tailwind style attributes.
- If you need to load external resources or call third-party APIs, update the relevant CSP directives and `connect-src`.
- **frame-src 'self'** allows embedding the Launch Console iframe from `public/legacy/landingpage/`
