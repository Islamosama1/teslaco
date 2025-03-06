- Clone and run `npm install`
- Follow the `.env.example` file to create your own `.env` file
- Set up your database by running `npx prisma migrate dev --name init` and `npx prisma generate`
- Run `npm run dev` to start the development server

When setting it up, all environment variables are optional at build-time, but required througout usage. For example, if you don't want to include Github or Google authentication, you can leave those variables blank. However, if you try to use them, it will throw an error.

## 📝 Features

- [x] Customizable links and icons
- [x] Over 9 beautiful themes
- [x] Advanced analytic engine
- [x] Use custom domains for free
- [x] Fully self-hostable and open source
- [x] Blazingly fast using SSR

## 📦 Built With

- [Next.js](https://nextjs.org/)
- [Chakra UI](https://chakra-ui.com/)
- [Prisma](https://prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Vercel](https://vercel.com/)
- [Cloudflare](https://cloudflare.com/)
