### How to run

1. First clone the repo locally
2. Make sure you `cd` into the directory
3. Run the following command to install dependencies 
```
npm i
```
4. If it gives you error, force it
```
npm i --force
```
5. The above should work.
6. Create a .env file
7. At the root of the project
8. And put the following variables
```
NEXT_PUBLIC_SUPABASE_URL=your-projects-url-from-supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SITE_URL=http://localhost:3000
NEXT_PUBLIC_PREPROD_BLOCKFROST_PROVIDER_ID=your-blockfrost-key
```
9. In production, change the SITE_URL accordingly
10. Make sure you have created account in Supabase, in order to have all the variables needed to run.
11. Once you are done run ``` npm run dev ``` to run the project locally.
12. For doing all the related configurations for supabase, check my other template which explains everything in detail: https://github.com/adaOctopus/nextjs-auth-supabase
13. Make sure you create an API key in Blockfrost for the network in order to integrate the wallets. You add the ID in the env file as shown earlier.
