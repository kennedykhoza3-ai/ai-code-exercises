# Getting Started with FastAPI

## Part 1: Understanding FastAPI Fundamentals

FastAPI is a modern Python web framework for building APIs.

### Key Concepts

- An endpoint is a URL path that the API responds to.
- GET requests are commonly used to retrieve information.
- POST requests are commonly used to create information.
- Path parameters are values captured from the URL.
- Query parameters are extra values added to the URL after `?`.
- Pydantic is used for data validation.
- Uvicorn is used to run the FastAPI application locally.
- FastAPI automatically generates interactive API documentation at `/docs`.

### Key Learning

I learned that FastAPI defines the routes, data requirements, and responses of an API, while Uvicorn runs the application.

## Part 2: Creating My First API

I created a FastAPI application in `main.py` and ran it locally using Uvicorn.

### Endpoints Created

- `GET /` - Returns a Hello World message.
- `GET /items/{item_id}` - Demonstrates a path parameter.
- `GET /search/` - Demonstrates query parameters.
- `POST /items/` - Accepts item data using a Pydantic model.

### Testing the API

I tested the API in the browser and used FastAPI's Swagger documentation at `/docs`.

The root endpoint returned:

`{"message":"Hello World from FastAPI!"}`

I also tested `/items/42`, which returned the item ID, and used query parameters such as `q`, `skip`, and `limit`.

### Key Learning

I learned the difference between routes, path parameters, query parameters, GET requests, and POST requests. I also learned how Swagger UI can be used to interact with and test an API.

## Part 3: Enhancing the API

### Pydantic Validation

I created an `Item` model using Pydantic:

- `name` must be a string.
- `price` must be a number.

I tested the validation by sending valid data and then deliberately sending `"not-a-number"` as the price. FastAPI rejected the invalid request with a validation error.

### Error Handling

I used `HTTPException` to handle invalid item IDs.

If an item ID is less than 1, the API returns a `400 Bad Request` response with:

`{"detail":"Item ID must be greater than zero"}`

### Organizing the Project

I moved the `Item` Pydantic model from `main.py` into `app/models.py`.

This helped me understand how a FastAPI application can be separated into multiple files instead of keeping all the code in one file.

### Key Learning

I learned that Pydantic can automatically validate incoming data and that `HTTPException` can be used to return meaningful API errors. I also learned how Python modules can help organize a FastAPI project.

## Part 4: To-Do List API Challenge

I built a simple to-do list API using FastAPI and Pydantic.

### To-Do Model

Each to-do item contains:

- An ID
- A title
- A description
- A due date
- A completed status

### Features Implemented

- `POST /todos/` - Creates a new to-do item.
- `GET /todos/` - Lists all to-do items.
- `GET /todos/?status=pending` - Lists pending items.
- `GET /todos/?status=completed` - Lists completed items.
- `PUT /todos/{todo_id}/complete` - Marks a to-do item as completed.
- `DELETE /todos/{todo_id}` - Deletes a to-do item.

### Validation and Error Handling

Pydantic validates the data sent to the API.

I also used `HTTPException` to return errors when appropriate, such as when an item cannot be found.

### Testing

I tested the endpoints using FastAPI's Swagger UI.

I successfully:

1. Created a to-do item.
2. Retrieved the to-do list.
3. Filtered the list for pending items.
4. Marked a to-do as completed.
5. Confirmed that `completed` changed from `false` to `true`.
6. Deleted the to-do item.

### What I Learned

This exercise helped me understand how FastAPI routes work and how GET, POST, PUT, and DELETE requests are used in an API.

I learned how Pydantic models define and validate data, how FastAPI automatically generates API documentation, and how error handling works with `HTTPException`.

Building the to-do API also helped me understand how several endpoints can work together to create a small CRUD-style application.