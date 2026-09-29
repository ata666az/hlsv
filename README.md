# Hostless HTTP Forwarder

Node.js HTTP service adapted from the original Cloudflare Worker pattern.

## Configuration

Set `BACKENDS` as a comma-separated list of HTTPS hostnames that you own or are authorized to proxy.

Example:

`BACKENDS=backend1.example.com,backend2.example.com`

Hostless supplies `PORT`; the service listens on `0.0.0.0`.

## Deploy

1. Push this directory to a Git repository.
2. In Hostless, create a new App from that repository.
3. Hostless reads `hostless.yaml`.
4. Add `BACKENDS` as an environment variable.
5. Deploy and check `/health`.

The service preserves the incoming HTTP method, path, query string, request body, and request headers (except `Host`) when forwarding to the selected HTTPS backend.
