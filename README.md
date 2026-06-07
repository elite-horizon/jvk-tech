# JVK Technologies GitHub Pages Site

Static redesign of `jvktech.com` for GitHub Pages.

## Files

- `index.html` - redesigned home page
- `about.html` - company overview
- `privacy-policy.html` - terms and privacy content
- `contact.html` - static contact page using `mailto:admin@jvktech.com`
- `CNAME` - custom domain for GitHub Pages

## GitHub Pages Setup

1. Push this folder to the GitHub repository.
2. In GitHub, open `Settings > Pages`.
3. Set source to `Deploy from a branch`.
4. Select the branch, usually `main`, and folder `/root`.
5. Confirm the custom domain is `jvktech.com`.

## DNS Setup

For apex domain `jvktech.com`, add these A records at the domain DNS provider:

```text
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

For `www.jvktech.com`, add a CNAME record:

```text
www -> <github-username>.github.io
```

After DNS updates, return to GitHub Pages settings and enable `Enforce HTTPS` once available.
