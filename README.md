# Devsper Registry (archived)

**Archived — see [ARCHIVE.md](./ARCHIVE.md).** The open-source CLI no longer ships `devsper reg`; plugins are distributed via PyPI (or other standard Python indexes) and Devsper Cloud is separate.

---

Python package registry with API (Go) + Web UI (React/TypeScript) + Better Auth.

Previously live at: registry.devsper.com (may be offline or redirected).

## Architecture

- **API**: Go (port 8080) - Package management, user management, PEP-compatible `/simple/` endpoint
- **Web**: React + TypeScript + Bun (port 3000) - UI + Better Auth integration
- **Database**: PostgreSQL
- **Auth**: Better Auth (GitHub, Google OAuth + email/password)
- **Deployment**: AWS Lambda + API Gateway + CloudFront

## Local Development

```bash
cp .env.example .env    # Configure DATABASE_URL, GITHUB_CLIENT_ID/SECRET, etc.
just deps               # Start Postgres in Docker
just db-migrate         # Create Go API tables (packages, orgs, etc.)
just auth-migrate       # Create Better Auth tables (user, session, jwks, etc.)
just dev                # Start API (air) + Web (Vite); Ctrl+C kills both
```

### Endpoints

- **Web UI**: http://localhost:3000
- **Auth**: http://localhost:3000/auth
- **API**: http://localhost:8080 (proxied at `/api` and `/simple` from web)

## Project Structure

```
registry/
├── api/              # Go API server
│   ├── cmd/         # Main entry point
│   ├── internal/    # Internal packages
│   └── Dockerfile.lambda
├── web/              # React frontend
│   ├── src/         # Source files
│   └── Dockerfile.lambda
├── migrations/       # Database migrations
├── .env.example     # Environment template
├── justfile         # Development commands
└── docker-compose.*.yml
```

## Deployment

### AWS Lambda (Production)

The registry runs on AWS Lambda with API Gateway:

- **API Gateway**: `iyrvbekp4e.execute-api.us-east-1.amazonaws.com`
- **Lambda Functions**: `devsper-registry-api`, `devsper-registry-web`
- **ECR Images**: `devsper-registry-api`, `devsper-registry-web`
- **CloudFront**: `E1OSV9Y9DPR3CY` → registry.devsper.com
- **Database**: PostgreSQL on EC2 (44.219.173.39:5432)

### Manual Deploy

Build and push Docker images:

```bash
# API
docker buildx build --provenance=false --platform linux/arm64 \
  -t {AWS_ACCOUNT}.dkr.ecr.us-east-1.amazonaws.com/devsper-registry-api:latest \
  -f api/Dockerfile.lambda .
docker push {AWS_ACCOUNT}.dkr.ecr.us-east-1.amazonaws.com/devsper-registry-api:latest
aws lambda update-function-code --function-name devsper-registry-api \
  --image-uri {AWS_ACCOUNT}.dkr.ecr.us-east-1.amazonaws.com/devsper-registry-api:latest

# Web
docker buildx build --provenance=false --platform linux/arm64 \
  -t {AWS_ACCOUNT}.dkr.ecr.us-east-1.amazonaws.com/devsper-registry-web:latest \
  -f web/Dockerfile.lambda .
docker push {AWS_ACCOUNT}.dkr.ecr.us-east-1.amazonaws.com/devsper-registry-web:latest
aws lambda update-function-code --function-name devsper-registry-web \
  --image-uri {AWS_ACCOUNT}.dkr.ecr.us-east-1.amazonaws.com/devsper-registry-web:latest
```

## OAuth Setup

See [docs/oauth-setup.md](docs/oauth-setup.md) for GitHub and Google OAuth configuration.

## Docker Development

See [README.docker.md](README.docker.md) for containerized development workflow.

## PEP 503 / 691 Compatibility

The `/simple/` endpoint implements PEP 503 (Simple Repository API) and PEP 691 (JSON API for PyPI), making it compatible with `pip`, `uv`, and other Python package managers:

```bash
pip install --index-url https://registry.devsper.com/simple/ devsper-plugin-example
```

## License

GPL-3.0-or-later
