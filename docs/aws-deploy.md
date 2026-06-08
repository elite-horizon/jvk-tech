# AWS Deployment Setup

This repository deploys the static site to S3 and refreshes CloudFront through GitHub Actions.

## Current Production Values

The GitHub Actions workflow already contains the production deploy values:

```text
AWS_REGION=us-east-1
AWS_ROLE_ARN=arn:aws:iam::167898699288:role/GitHubDeployRole
S3_BUCKET=jvktech-site
CLOUDFRONT_DISTRIBUTION_ID=E3JPGRYROLPTW0
```

The ACM certificate used by CloudFront is also in `us-east-1`, which is required for CloudFront.

## IAM Role For GitHub Actions

The IAM role is named:

```text
GitHubDeployRole
```

Use a Web identity trust relationship for GitHub Actions OIDC.

Trust policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::<AWS_ACCOUNT_ID>:oidc-provider/token.actions.githubusercontent.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "token.actions.githubusercontent.com:aud": "sts.amazonaws.com"
        },
        "StringLike": {
          "token.actions.githubusercontent.com:sub": "repo:elite-horizon/jvk-tech:ref:refs/heads/main"
        }
      }
    }
  ]
}
```

Replace `<AWS_ACCOUNT_ID>`.

Permissions policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "S3DeployAccess",
      "Effect": "Allow",
      "Action": [
        "s3:ListBucket"
      ],
      "Resource": "arn:aws:s3:::<your-s3-bucket-name>"
    },
    {
      "Sid": "S3ObjectDeployAccess",
      "Effect": "Allow",
      "Action": [
        "s3:DeleteObject",
        "s3:GetObject",
        "s3:PutObject"
      ],
      "Resource": "arn:aws:s3:::<your-s3-bucket-name>/*"
    },
    {
      "Sid": "CloudFrontInvalidationAccess",
      "Effect": "Allow",
      "Action": [
        "cloudfront:CreateInvalidation"
      ],
      "Resource": "arn:aws:cloudfront::<AWS_ACCOUNT_ID>:distribution/<your-cloudfront-distribution-id>"
    }
  ]
}
```

Replace:

```text
<AWS_ACCOUNT_ID>
<your-s3-bucket-name>
<your-cloudfront-distribution-id>
```

For the current site, these values are:

```text
<AWS_ACCOUNT_ID> = 167898699288
<your-s3-bucket-name> = jvktech-site
<your-cloudfront-distribution-id> = E3JPGRYROLPTW0
```

## Deployment Flow

After setup, every push to `main` deploys automatically:

```text
git push origin main
```

You can also deploy manually from:

`GitHub -> Actions -> Deploy static site to AWS -> Run workflow`
