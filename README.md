## Getting Started

### 1. Clone the repository

```bash
git https://github.com/appKom/onlinefondet.git
cd onlinefondet
```

### 2. Install dependencies

```bash
npm install
```

or

```bash
yarn install
```

### 3. Set up environment variables

#### Create `.env` file:

```bash
cp .env.template .env
```

#### Fill inn environment variables:

- **NEXTAUTH_URL**: The URL where your app will run. When running locally, it will likely be http://localhost:3000/. In production, this would be your live domain.
- **NEXTAUTH_SECRET**: A secret key used to encrypt session tokens in NextAuth.js. You can generate one with the command: openssl rand -base64 32.
- **GOOGLE_CLIENT_ID**: The Client ID from the Google Developer Console. This is needed to enable Google OAuth authentication for your app.
- **GOOGLE_CLIENT_SECRET**: The Client Secret from the Google Developer Console. This is also needed to complete the Google OAuth authentication setup.
- **NEXT_SUPABASE_URL**: The URL of your Supabase project. You can find this in the Supabase dashboard under Settings -> API.
- **SUPABASE_ANEXT_SUPABASE_ANON_KEYNON_KEY**: The public anonymous key for interacting with the Supabase API. You can find this in the Supabase dashboard under Settings -> API.
- **SUPABASE_SERVICE_KEY**: The service role key for your Supabase project, which allows access to more sensitive operations like inserting or modifying data with elevated permissions.
- **DATABASE_URL**: The connection string to your database.
