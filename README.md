# JVK Technologies Static Site

Static redesign of `jvktech.com`.

## Files

- `index.html` - redesigned home page
- `about.html` - company overview
- `privacy-policy.html` - terms and privacy content
- `contact.html` - static contact page using `mailto:admin@jvktech.com`

## AWS Hosting

Recommended hosting:

```text
Route 53 -> CloudFront -> private S3 bucket
```

See [docs/aws-deploy.md](docs/aws-deploy.md) for GitHub Actions deployment setup.
