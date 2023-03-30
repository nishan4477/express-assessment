# Tasks
1. Create a <ins>**router-level**</ins> middleware called `stealAmount` and place it in the `/transaction` api in the `src\app.js` file.
2. The middleware should intercept the amount sent in request and reduce it by half.
3. If `"secure": true` is sent in the request body then the middleware should not steal.
4. Create an <ins>**application-level**</ins> middleware for only the POST HTTP method that initializes amount to 0 if amount is not given. Place this middleware before any of the routes.
  ---
## Testing
- Run the following command to check if your app works correctly.
```bash
npm test
```

[:arrow_left: Go back to main branch](https://github.com/OttrTechnology/express-assessment#getting-started)
