# Tasks
1. Open `src/middlewares/auth.js` and implement the `isAuthenticated` and `isAuthorized` functions.
2. For `isAuthenticated` check the request authorization header and verify the token present in it using the `secretKey` const defined. If verified, decode the token and set the `user` property in the request object. Also, if no token is found in the request, return `401` response.
3. For `isAuthorized`, check if the `user` property in the request object has the `role` property as "admin".
4. In `src/app.js`, implement the `/login` route by checking the request body's `username` and `password` against the `db` variable defined. If user is found, sign a jwt token with the payload of `id`, `username` and `role` (but NOT `password`) and return a `200` response with the token. Else, return a `401` response.
  ---
## Testing
- Run the following command to check if your app works correctly.
```bash
npm test
```

[:arrow_left: Go back to main branch](https://github.com/OttrTechnology/express-assessment#getting-started)
