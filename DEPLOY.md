# Deployment Guide

## Architecture

The devsper project deploys two services to a single EC2 instance:

- **Registry** (`registry.devsper.com`) — Go API + Node.js web app + Postgres, running via Docker Compose behind Caddy
- **Docs** (`docs.devsper.com`) — Static Docusaurus site served by the same Caddy instance

## CI/CD Workflows

### `registry-deploy.yml` — Registry Deploy

Triggers on push to `main` touching `registry/**`, or manual dispatch.

| Job | Description |
|-----|-------------|
| `test-api` | Go tests with Postgres service container (skipped on force deploy) |
| `test-web` | Bun typecheck (skipped on force deploy) |
| `build-and-push` | Build arm64 Docker images, push to ECR with `:latest` + `:sha` tags |
| `deploy` | SSH via Instance Connect, pull images, rolling restart (web → api) |

Manual dispatch supports a `force` boolean to skip tests.

### Docs deploy

Docs site and its deploy live in the **docs** repo. Push to `main` there builds Docusaurus and rsyncs `build/` to EC2 `/opt/devsper-docs/` (see `docs/.github/workflows/deploy-ec2.yml`). Versioning (if used) is also handled in the docs repo.

## GitHub Configuration

### Repository Variables (`vars.*`)

| Variable | Description | Example |
|----------|-------------|---------|
| `AWS_ACCOUNT_ID` | AWS account ID | `935761084809` |
| `REGISTRY_EC2_HOST` | EC2 public IP/hostname | `44.219.173.39` |
| `REGISTRY_EC2_INSTANCE_ID` | EC2 instance ID | `i-0ad1fdc8775243aee` |

### IAM Role (OIDC)

All workflows authenticate to AWS via OIDC federation — no static AWS keys are stored in GitHub.

- **Role**: `arn:aws:iam::<account-id>:role/devsper-deploy`
- **Trust policy**: Allows `sts:AssumeRoleWithWebIdentity` from the GitHub OIDC provider for this repository
- **Permissions**: ECR push/pull, EC2 Instance Connect `SendSSHPublicKey`, S3 (for package storage)

### Environment Secrets (on EC2)

The file `/opt/devsper-registry/.env.prod` contains production secrets:

```
ECR_REGISTRY=<account-id>.dkr.ecr.us-east-1.amazonaws.com
POSTGRES_USER=registry
POSTGRES_PASSWORD=<password>
POSTGRES_DB=registry
JWT_SECRET=<secret>
INTERNAL_SECRET=<secret>
BASE_URL=https://registry.devsper.com
AWS_REGION=us-east-1
BUCKET_NAME=<s3-bucket>
GITHUB_CLIENT_ID=<id>
GITHUB_CLIENT_SECRET=<secret>
GOOGLE_CLIENT_ID=<id>
GOOGLE_CLIENT_SECRET=<secret>
```

## EC2 Setup (One-Time)

### Prerequisites

- Ubuntu 24.04 ARM64 (`t4g.small`)
- Docker + Docker Compose installed
- AWS CLI installed (for ECR login from the instance itself)
- IAM instance profile with ECR pull access

### Registry Setup

```bash
sudo mkdir -p /opt/devsper-registry
sudo chown ubuntu:ubuntu /opt/devsper-registry
cd /opt/devsper-registry

# Copy docker-compose.prod.yml and Caddyfile from the repo
# Create .env.prod with all required secrets (see above)

# Start the stack
docker compose -f docker-compose.prod.yml --env-file .env.prod up -d
```

### Docs Setup

```bash
sudo mkdir -p /opt/devsper-docs
sudo chown ubuntu:ubuntu /opt/devsper-docs
```

The docs-deploy workflow will rsync the built Docusaurus site to `/opt/devsper-docs/`. Caddy serves it via the `docs.devsper.com` server block in the Caddyfile.

### Caddyfile

The Caddyfile at `/opt/devsper-registry/Caddyfile` serves both domains:

- `registry.devsper.com` → reverse proxy to API (`:8080`) and Web (`:3000`)
- `docs.devsper.com` → static files from `/srv/docs` (host bind-mount from `/opt/devsper-docs`)

After updating the Caddyfile, reload Caddy:

```bash
cd /opt/devsper-registry
docker compose -f docker-compose.prod.yml --env-file .env.prod exec caddy caddy reload --config /etc/caddy/Caddyfile
```

### Database Migrations

Migrations are embedded in the API binary and run automatically on startup. If you need to run them manually:

```bash
cd /opt/devsper-registry
docker compose -f docker-compose.prod.yml --env-file .env.prod exec api /registry migrate
```

## Manual Deploy

### Registry

Trigger via GitHub Actions → "Registry Deploy" → Run workflow (optionally check "Force deploy").

Or SSH to EC2 and pull/restart manually:

```bash
cd /opt/devsper-registry
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <ecr-registry>
docker compose -f docker-compose.prod.yml --env-file .env.prod pull api web
docker compose -f docker-compose.prod.yml --env-file .env.prod up -d --no-deps web
docker compose -f docker-compose.prod.yml --env-file .env.prod up -d --no-deps api
docker image prune -f
```

### Docs

Trigger via GitHub Actions → "Docs Deploy" → Run workflow.

Or build locally and rsync:

```bash
# From the docs repo root:
npm ci && npm run build
rsync -azP --delete build/ ubuntu@<ec2-host>:/opt/devsper-docs/
```
