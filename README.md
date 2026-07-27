This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## API Documentation (Swagger UI)

Interactive API docs are served at **[http://localhost:3000/docs](http://localhost:3000/docs)** using `swagger-ui-express` and the OpenAPI spec in [`openapi.json`](./openapi.json).

Protected routes (`/protected/*` and `POST /auth/logout`) show a lock icon in Swagger UI because they require Bearer JWT auth.

### Try it out

1. Open [http://localhost:3000/docs](http://localhost:3000/docs)
2. Call `POST /auth/login` with your email and password
3. Copy the `access_token` from the response
4. Click **Authorize**, paste the token (no `Bearer ` prefix), and click **Authorize**
5. Use **Try it out** on `GET /protected/profile`

### Screenshot

![Swagger UI API routes](./docs/swagger-ui-screenshot.png)

> Add a screenshot of `/docs` showing your routes and lock icons, then save it as `docs/swagger-ui-screenshot.png`.

## API Routes

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `POST` | `/auth/signup` | No | Register a new user |
| `POST` | `/auth/login` | No | Log in and receive JWT tokens |
| `POST` | `/auth/logout` | Bearer | Sign out the current session |
| `GET` | `/public/info` | No | Public information |
| `GET` | `/protected/profile` | Bearer | Authenticated user profile |
| `GET` | `/protected/dashboard` | Bearer | Protected dashboard greeting |

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Auth](https://supabase.com/docs/guides/auth)
