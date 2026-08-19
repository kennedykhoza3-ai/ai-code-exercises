# Contextual Learning with FastAPI

## Part 1: Framework Comparison

FastAPI uses concepts that are common across web frameworks, but implements them in a Python-focused way.

| General Concept | FastAPI Equivalent | Purpose |
|---|---|---|
| Route | `@app.get()`, `@app.post()` | Connects a URL to Python code |
| Controller/View | Route function | Handles a request |
| Input Validation | Pydantic model | Validates incoming data |
| Route Grouping | `APIRouter` | Organizes related endpoints |
| Error Handling | `HTTPException` | Returns API errors |
| Dependency Injection | `Depends()` | Provides reusable dependencies |
| API Documentation | `/docs` | Automatically generated Swagger documentation |
| Data Types | Python type hints | Describe and validate expected data |

An API route can be understood as an address that tells the API which code to run when a particular request is made.

FastAPI reduces the amount of manual validation and documentation required because it uses Python type hints and Pydantic models.

## Part 2: Understanding FastAPI Design Choices

FastAPI's design philosophy focuses on using modern Python features to make APIs easier to build, validate, document, and maintain.

### Pydantic

Pydantic provides structured data models and automatic validation. This allows FastAPI applications to validate incoming data without manually checking every field.

### Automatic Documentation

FastAPI automatically generates interactive API documentation using the application's routes and data models.

The Swagger interface is available at `/docs`.

This makes APIs easier to understand and test during development.

### Type Hints

FastAPI makes extensive use of Python type hints.

Types such as `str`, `int`, `float`, and custom Pydantic models communicate what data an endpoint expects.

FastAPI can then use this information for validation and documentation.

### Async Support

FastAPI supports `async def` directly.

This is useful for applications that perform operations where they may need to wait for databases, external APIs, files, or network resources.

## Part 3: Applied Contextual Learning — JWT Authentication

I implemented authentication in FastAPI using JWT access tokens.

The authentication flow was:

Username and Password
→ Authentication
→ JWT Access Token
→ Bearer Token
→ Protected Endpoint
→ Current User

### Endpoints

- `POST /token` authenticates the user and creates a JWT access token.
- `GET /users/me/` returns information about the authenticated user.
- `GET /users/me/items/` demonstrates another protected endpoint.

### Dependency Injection

FastAPI's `Depends()` system allows authentication logic to be reused.

For example:

`current_user: User = Depends(get_current_active_user)`

Before the protected endpoint executes, FastAPI obtains and validates the current user.

This prevents authentication code from having to be repeated inside every protected route.

### Password Security

The original exercise demonstrated Passlib and bcrypt.

During implementation, a compatibility problem occurred with the installed bcrypt version. The implementation was updated to use `pwdlib` with its recommended password hashing configuration.

This demonstrated an important real-world development lesson: library versions and framework recommendations can change, and implementations sometimes need to be adapted.

### JWT Testing

I successfully:

1. Started the FastAPI authentication application.
2. Opened Swagger at `/docs`.
3. Logged in using the sample user.
4. Received a JWT access token.
5. Used Swagger's Authorize feature.
6. Accessed the protected `/users/me/` endpoint.
7. Received the authenticated user's information.

The protected endpoint returned the username, email, full name, and account status.

## Reflection Questions

### How does FastAPI approach authentication?

FastAPI allows authentication to be constructed from reusable components rather than forcing all authentication logic into individual routes.

### What advantage does dependency injection provide?

`Depends()` allows security checks and other reusable logic to run before an endpoint executes. This makes the code easier to organize and reuse.

### How do type hints help security implementation?

Type hints make it clearer what data functions expect and what type of objects are being passed between authentication functions and routes.

They also allow FastAPI and Pydantic to perform validation automatically.

### What common authentication patterns appear in the JWT implementation?

The implementation follows a common authentication sequence: verify credentials, issue a token, send the token with later requests, validate the token, identify the user, and allow access to protected resources.

## Part 4: Mental Model Translation

My updated mental model for FastAPI is:

| Web Application Concept | FastAPI |
|---|---|
| Application | `FastAPI()` |
| URL/Route | `@app.get()`, `@app.post()`, etc. |
| Request Handler | Python function |
| Data Model | Pydantic `BaseModel` |
| Validation | Pydantic + type hints |
| Dependency | `Depends()` |
| Authentication | OAuth2/JWT dependencies |
| Error Response | `HTTPException` |
| Documentation | Swagger `/docs` |
| Asynchronous Handler | `async def` |

The most important idea is that FastAPI combines standard Python functions, type hints, Pydantic models, and dependency injection to build APIs.

## What I Learned

This exercise helped me connect FastAPI concepts to general web-framework concepts.

I learned how routes connect requests to Python functions, how Pydantic validates data, how dependency injection works, and how JWT authentication can protect API endpoints.

I also learned how to troubleshoot a real dependency compatibility problem and adapt the implementation while preserving the intended authentication design.