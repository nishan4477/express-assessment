# Tasks
1. Create a 404 error handler that returns a **404** status code and the following `json` response:
```json
{
  "message": "Route not found"
}
```
2. Create a separate global error handler that does the following:
  - Checks if error is instance of `AppError`.
  - If error is an instance of `AppError`, read and return its status code with its message(see above `json` response).
  - Also, if status code is **418**, change the message exactly to "The server refuses the attempt to brew coffee with a teapot.".
  - If error is **NOT** an instance of AppError, return a **500** status code with the following `json` response:
  ```json
  {
    "message": "Unknown error occured"
  }
  ```

[:arrow_left: Go back to main branch](https://github.com/OttrTechnology/express-assessment#getting-started)
