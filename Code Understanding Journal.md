# Code Understanding Journal

## Project Overview

I am investigating the Java implementation of the Task Manager as if I have just joined the development team and need to understand the existing codebase before contributing.

### Initial Understanding

The application appears to be a command-line Task Manager for creating, organizing, updating, and tracking tasks.

## Project Structure

The main Java source code is under `src/main/java`.

The project also has a separate `src/test/java` directory for tests.            

The main packages identified are:

* `app` — application-level functionality
* `cli` — command-line interface
* `model` — task-related data/model classes
* `storage` — storing and retrieving task information
* `util` — utility/helper functionality

## Technologies Identified

* Java
* Gradle
* Gradle Kotlin DSL (`build.gradle.kts`)
* Apache Commons CLI
* Gson
* JUnit 5
* Mockito
* AssertJ

The application entry point identified in `build.gradle.kts` is:

`za.co.wethinkcode.taskmanager.cli.TaskManagerCli`

## Initial Discoveries

`TaskManager.java` appears to be a central class for managing tasks.

It contains functionality for:

* Creating tasks
* Listing tasks
* Updating task status
* Updating task priority
* Updating due dates
* Deleting tasks
* Retrieving task details
* Adding and removing tags
* Calculating statistics

`TaskManager` uses `TaskStorage` and works with model classes such as `Task`, `TaskPriority`, and `TaskStatus`.

## Questions to Investigate

* How does `TaskManagerCli` pass commands to `TaskManager`?
* How does `TaskStorage` save and retrieve tasks?
* How is a `Task` represented?
* What task statuses and priority levels are available?
* What happens when a task's status changes?

## AI-Assisted Understanding.
### Exercise Part 1 — Initial Understanding

The feature being investigated is task creation and status updates.

The main components involved are:

- `TaskManager` — coordinates task creation and status updates.
- `Task` — represents the task and contains its state and business methods.
- `TaskStatus` — defines the available task statuses.
- `TaskStorage` — stores and retrieves tasks using a JSON file.

### Initial Execution Flow

When a task is created, `TaskManager.createTask()` processes the priority and due date, creates a new `Task`, and sends it to `TaskStorage.addTask()`.

The `Task` constructor automatically generates an ID, sets the initial status to `TODO`, and records the creation time.

`TaskStorage` stores tasks in a `HashMap` and saves them to a JSON file using Gson.

When a task status is updated, `TaskManager.updateTaskStatus()` converts the supplied status value into a `TaskStatus`, retrieves the task from storage, and changes its status.

If the new status is `DONE`, `Task.markAsDone()` is called. This records the completion time and updates the task's `updatedAt` value.

Finally, the storage is saved so that the changes persist in the JSON file.

### Initial Questions

- How exactly does the command-line interface call `TaskManager.createTask()` and `updateTaskStatus()`?
- Why does the application use both `setStatus()` and `markAsDone()` when completing a task?
- How does Gson convert the `Task` objects to and from JSON?
- What happens if the storage file cannot be read or written?

## AI-Assisted Understanding

This section will be updated throughout the exercise with findings, corrections, and insights from the AI prompts.


## Exercise Part 1 — Understanding a Specific Feature

### Feature Investigated
Task creation and status updates.

### Main Components Involved

- `TaskManager.java` — coordinates task creation and status updates.
- `Task.java` — represents an individual task and manages its state.
- `TaskStatus.java` — defines the valid task statuses.
- `TaskStorage.java` — stores, retrieves, and persists tasks.

### Task Creation Flow

1. `TaskManager.createTask()` receives the task information.
2. The priority value is converted into a `TaskPriority`.
3. The due date is parsed if one is provided.
4. A new `Task` object is created.
5. The `Task` constructor generates a unique ID and sets the initial status to `TODO`.
6. `TaskStorage.addTask()` puts the task into the in-memory `HashMap`.
7. `TaskStorage.save()` persists the tasks to a JSON file using Gson.
8. The task ID is returned.

### Status Update Flow

1. `TaskManager.updateTaskStatus()` receives a task ID and new status.
2. `TaskStatus.fromValue()` converts the text value into a valid `TaskStatus`.
3. `TaskStorage.getTask()` retrieves the task.
4. The task status is changed.
5. If the new status is `DONE`, `Task.markAsDone()` records the completion time and updates the timestamp.
6. `TaskStorage.save()` persists the changes to the JSON file.
7. The method returns `true` when the update succeeds.

### Data Storage and Retrieval

Tasks are kept in memory using a `HashMap`, with the task ID used as the key.

Gson is used to convert the tasks into JSON when they are saved. This allows the task information to persist between application runs.

### Interesting Design Approach

The `Task` class contains business methods such as `markAsDone()` rather than requiring other parts of the application to manually update all completion-related fields.

`TaskManager` acts as a coordinator between the task objects and the storage layer.

### Initial Understanding vs Discovery

Initially, I understood that `TaskManager` was responsible for creating and updating tasks, but I was not completely sure how the other classes worked together.

After examining the code, I discovered that:

- `TaskManager` coordinates the operations.
- `Task` owns the task's state and business behaviour.
- `TaskStatus` controls the valid status values.
- `TaskStorage` manages persistence.
- Gson is responsible for converting Java task objects to JSON.
- Completing a task involves more than changing its status because `completedAt` and `updatedAt` are also updated.

### Questions Clarified

- How the four main classes interact during task creation and status updates.
- How task changes are persisted to the JSON file.
- Why `markAsDone()` is used when a task becomes `DONE`.
- How status text is converted into the appropriate Java enum.

### Validation Requirements

1. Add functionality that changes the default status assigned to a newly created task.
2. Add support for recognising and storing an additional valid task status.
3. Add a requirement for recording an additional timestamp when a task's status changes.


## Exercise Part 2 — Deepen Understanding Through Guided Questions

### Feature Investigated
Task prioritization.

### Initial Understanding

The task manager uses four priority levels:

- LOW = 1
- MEDIUM = 2
- HIGH = 3
- URGENT = 4

I initially understood that entering priority value 3 would create a task with HIGH priority. I also understood that an enum provides a fixed set of valid priority options and helps prevent invalid values.

I expected an invalid value such as 5 to be rejected.

### Discoveries Through Guided Questions

The numeric priority supplied by the user is converted into a `TaskPriority` enum using `TaskPriority.fromValue()`.

For example:

3 → TaskPriority.HIGH

The `Task` object stores the priority as a `TaskPriority` field rather than simply storing the number.

The `TaskStorage.getTasksByPriority()` method compares the task's `TaskPriority` value when filtering tasks by priority.

If an invalid priority such as 5 is supplied, `TaskPriority.fromValue()` throws an `IllegalArgumentException`. This happens before the new `Task` object is created.

Changing the priority of an existing task is different from creating a new task. The existing task is updated rather than creating a new task.

### Key Insights From Guided Questions

- `TaskPriority` acts as the central definition of valid priority levels.
- The numeric value is used as an input to find the corresponding enum value.
- The `Task` stores the resulting `TaskPriority`.
- Invalid priority values are rejected through an exception.
- Priority can be assigned during task creation or changed later on an existing task.
- The storage layer can filter tasks using their `TaskPriority`.

### Misconceptions Clarified

I initially thought of the priority mainly as a numeric value. The code showed that the number is actually converted into a `TaskPriority` enum and the task stores that enum value.

I also clarified the difference between assigning a priority during task creation and updating the priority of an existing task.

### Practical Application

A possible extension would be to add a new priority level such as `CRITICAL = 5`. The priority definition would need to be updated so that the application recognises the new valid priority.

## Exercise Part 3 — Mapping Data Flow

### Feature Investigated
Task completion — marking an existing task as `DONE`.

### Entry Point

The process begins when a user requests that an existing task's status be changed. The relevant method is:

`TaskManager.updateTaskStatus()`

### Data Flow

```text
User requests task to be marked as DONE
                ↓
        TaskManager
                ↓
Convert "done" into TaskStatus.DONE
                ↓
       Find task by its ID
                ↓
        Does the task exist?
          /             \
        YES              NO
         ↓                ↓
Update task status     Return false
         ↓
If status is DONE:
         ↓
status = DONE
completedAt = current time
updatedAt = current time
         ↓
      TaskStorage.save()
         ↓
Gson converts tasks to JSON
         ↓
       JSON file


## Exercise Part 4 — Practical Application and Reflection

### Practical Scenario

The team needs to implement the following business rule:

> Tasks that are overdue for more than 7 days should be automatically marked as abandoned unless they are marked as high priority.

### Files to Investigate

Based on my understanding of the codebase, I would investigate the following files:

1. `Task.java`
   - Contains the task's state and business methods.
   - I would investigate how overdue tasks are identified and where the logic for changing task state should be placed.

2. `TaskStatus.java`
   - Defines the valid task statuses.
   - I would investigate adding an `ABANDONED` status if this is confirmed as the required business status.

3. `TaskPriority.java`
   - Defines the available priority levels.
   - I would use this to determine whether a task has HIGH priority and should be excluded from the automatic abandonment rule.

4. `TaskStorage.java`
   - Handles storing and retrieving tasks.
   - It already contains functionality for finding overdue tasks, so I would investigate whether it can support identifying tasks overdue by more than seven days.

5. `TaskManager.java`
   - Coordinates task operations.
   - I would investigate whether this is the appropriate place to coordinate the new automatic business rule.

### Planned Implementation

Before making changes, I would first understand how the application currently determines whether a task is overdue and how dates and priorities are represented.

I would then plan to:

1. Add an `ABANDONED` status if the team confirms that this is the correct status.
2. Identify tasks whose due dates are more than seven days in the past.
3. Exclude tasks that have HIGH priority.
4. Determine how tasks should be automatically changed to `ABANDONED`.
5. Persist the changed task state using the existing storage mechanism.
6. Check existing tests and add appropriate tests for the new business rule.

### Questions for the Team

Before implementing the rule, I would ask:

1. Should URGENT priority tasks also be protected, or only HIGH priority tasks?
2. What does "automatically" mean in this application? Should the rule run when the application starts, when tasks are listed, or through a scheduled process?
3. Should tasks without a due date ever become abandoned?
4. Can a task that is already DONE become ABANDONED?
5. Does "more than 7 days" mean exactly 7 × 24 hours or seven calendar days?
6. Should tasks in REVIEW or IN_PROGRESS be treated differently from TODO tasks?

### Reflection — How AI Prompts Helped

The AI prompts helped me understand the code systematically instead of trying to understand the entire application at once.

Prompt 1 helped me trace task creation and status updates and understand how `TaskManager`, `Task`, `TaskStatus`, and `TaskStorage` interact.

Prompt 2 helped me investigate the task prioritization system through guided questions. This helped me form my own understanding and then check it against the code.

Prompt 3 helped me map the data flow when a task is marked as complete. I was able to follow the task from the status update request through `TaskManager`, into the `Task` object, and finally to `TaskStorage` and the JSON file.

### What I Am Still Unsure About

I still need a deeper understanding of how the CLI connects user commands to `TaskManager`.

I also need to understand when automatic operations are triggered, how the storage path is configured, and how the application lifecycle affects loading and saving tasks.

### Next Steps to Deepen My Understanding

My next steps would be:

1. Examine `TaskManagerCli.java` to understand the application's entry point and how user commands reach the application logic.
2. Examine the tests to understand the expected behaviour of the application.
3. Investigate how the storage file and storage path are configured.
4. Trace a complete user interaction from the CLI through `TaskManager` and `TaskStorage`.
5. Use AI prompts to validate my understanding of any remaining unfamiliar components.

### Overall Reflection

The exercise showed me that understanding an unfamiliar codebase is easier when I break the investigation into smaller features.

I learned to identify the responsibilities of different classes, follow data between components, examine how state changes, and use AI to validate my understanding rather than relying only on direct explanations.

I also learned that before implementing a new business rule, I should understand the existing architecture and clarify ambiguous requirements with the development team.

## Exercise: Code Documentation

## 1. Original Code Selected

I selected the `calculateTaskScore(Task task)` method from the Task Priority Sorting Algorithm.

The method calculates an importance score for a task using several factors:

* Task priority
* Due date
* Task status
* Important tags
* How recently the task was updated

The resulting score can be used to compare and sort tasks by importance.

## 2. Documentation Generated Using Prompt 1

```java
/**
 * Calculates an importance score for a task based on its priority, due date,
 * current status, tags, and how recently it was updated.
 *
 * <p>Higher priority tasks receive higher base scores. Additional points
 * are added for overdue or approaching due dates and for tasks containing
 * important tags. Completed and review tasks receive score reductions.
 * Recently updated tasks receive a small score increase.</p>
 *
 * @param task the task for which the importance score is calculated
 * @return the calculated integer importance score
 *
 * @throws NullPointerException if the task is null or if required task
 *         properties are null when accessed
 *
 * @apiNote The scoring system uses fixed weights for priority, due dates,
 *          status, tags, and recent updates. The method does not modify
 *          the task itself.
 *
 * @implNote An overdue task receives 30 additional points. A task due today
 *           receives 20 points, a task due within two days receives 15 points,
 *           and a task due within seven days receives 10 points.
 */
public static int calculateTaskScore(Task task)
```

## 3. Insights From Prompt 2

The method is designed to convert several task properties into a single numerical score so that tasks can be compared and prioritized.

### Logic identified

1. The task's priority is converted into a base score:

   * LOW = 10
   * MEDIUM = 20
   * HIGH = 30
   * URGENT = 40

2. The due date can increase the score:

   * Overdue = +30
   * Due today = +20
   * Due within 2 days = +15
   * Due within 7 days = +10

3. The task status can reduce the score:

   * DONE = -50
   * REVIEW = -15

4. Important tags such as `blocker`, `critical`, or `urgent` add +8.

5. A task updated within the last day receives an additional +5.

6. The final score is returned as an integer.

### Assumptions and Edge Cases

* The method assumes that the supplied `Task` object is not null.
* A task without a due date does not receive any due-date points.
* The scoring system assumes the priority values defined by `TaskPriority`.
* The method depends on the current system time, so the score can change as time passes.
* The calculation uses fixed scoring weights that are part of the business logic.
* A completed task can receive other positive points before the -50 status adjustment is applied.

## 4. Suggested Inline Comments

Useful comments could explain the major scoring sections rather than every individual line.

Examples:

```java
// Calculate the base score from the task's priority.
```

```java
// Increase the score when the task is overdue or approaching its due date.
```

```java
// Reduce the score for tasks that are already completed or under review.
```

```java
// Give additional importance to tasks with critical or blocking tags.
```

```java
// Give a small boost to tasks that were recently updated.
```

## 5. Potential Improvements

The existing functionality can be maintained while improving the implementation by:

* Moving the scoring weights into named constants so they are easier to understand and maintain.
* Avoiding repeated creation of the important-tag list.
* Adding validation for a null `Task`.
* Adding unit tests for each scoring condition.
* Documenting the overall scoring formula so developers understand why each weight exists.
* Considering whether time-based calculations should use a consistent clock when testing.

## 6. Final Combined Documentation

### Purpose

`calculateTaskScore()` calculates a numerical importance score for a task. The score combines task priority, due-date urgency, completion status, important tags, and recent activity.

### Data Flow

The method receives a `Task` object, reads its properties, applies the appropriate scoring rules, and returns one integer representing the task's calculated importance.

### Scoring Model

| Factor        | Condition               | Score Change |
| ------------- | ----------------------- | -----------: |
| Priority      | LOW                     |          +10 |
| Priority      | MEDIUM                  |          +20 |
| Priority      | HIGH                    |          +30 |
| Priority      | URGENT                  |          +40 |
| Due date      | Overdue                 |          +30 |
| Due date      | Today                   |          +20 |
| Due date      | Within 2 days           |          +15 |
| Due date      | Within 7 days           |          +10 |
| Status        | DONE                    |          -50 |
| Status        | REVIEW                  |          -15 |
| Tags          | blocker/critical/urgent |           +8 |
| Recent update | Less than 1 day         |           +5 |

### Final Understanding

The method does not change the task. It only reads the task's current information and calculates a score. That score can then be used by `sortTasksByImportance()` to place the most important tasks first.

This exercise showed me that AI can help generate documentation, but the generated documentation still needs to be checked against the actual code. I also learned that good documentation should explain not only what the code does, but also its assumptions, edge cases, and business logic.

## Exercise: API Documentation

# Prompt 1: Endpoint Documentation Generation

## Endpoint

**GET `/products`**

## Purpose

The `GET /products` endpoint retrieves a list of products from the database.

It supports:

* Filtering by category
* Filtering by minimum and maximum price
* Filtering products that are in stock
* Sorting products
* Pagination

The endpoint returns the matching products together with pagination information.

## Query Parameters

| Parameter  | Type           | Default     | Description                                                                                             |
| ---------- | -------------- | ----------- | ------------------------------------------------------------------------------------------------------- |
| `category` | string         | None        | Filters products by category.                                                                           |
| `minPrice` | number         | None        | Returns products with a price greater than or equal to this value.                                      |
| `maxPrice` | number         | None        | Returns products with a price less than or equal to this value.                                         |
| `sort`     | string         | `createdAt` | Specifies the field used to sort the products.                                                          |
| `order`    | string         | `desc`      | Specifies the sorting direction. `asc` sorts ascending and any other value results in descending order. |
| `page`     | integer        | `1`         | Specifies which page of results to return.                                                              |
| `limit`    | integer        | `20`        | Specifies the maximum number of products returned per page.                                             |
| `inStock`  | boolean/string | None        | When set to `true`, only products with stock greater than zero are returned.                            |

## Request Body

No request body is required because this is a `GET` request.

## Successful Response

### HTTP 200 — OK

A successful response contains a `products` array and a `pagination` object.

Example:

```json
{
  "products": [
    {
      "_id": "65abc123",
      "name": "Laptop",
      "category": "Electronics",
      "price": 899.99,
      "stockQuantity": 12
    },
    {
      "_id": "65abc456",
      "name": "Wireless Mouse",
      "category": "Electronics",
      "price": 29.99,
      "stockQuantity": 35
    }
  ],
  "pagination": {
    "total": 45,
    "page": 1,
    "limit": 20,
    "pages": 3
  }
}
```

## Error Response

### HTTP 500 — Server Error

If an unexpected error occurs while retrieving the products, the endpoint returns:

```json
{
  "error": "Server error",
  "message": "Failed to fetch products"
}
```

## Authentication

Authentication requirements cannot be determined from the provided endpoint implementation.

The code does not show authentication or authorization middleware being applied to this route.

## Example Request 1

Retrieve the first 20 products using the default sorting:

```text
GET /products
```

Example response:

```json
{
  "products": [
    {
      "_id": "65abc123",
      "name": "Laptop",
      "category": "Electronics",
      "price": 899.99,
      "stockQuantity": 12
    }
  ],
  "pagination": {
    "total": 45,
    "page": 1,
    "limit": 20,
    "pages": 3
  }
}
```

## Example Request 2

Retrieve electronics products costing between 100 and 1000, showing only products in stock, sorted by price from lowest to highest:

```text
GET /products?category=Electronics&minPrice=100&maxPrice=1000&sort=price&order=asc&inStock=true&page=1&limit=10
```

Example response:

```json
{
  "products": [
    {
      "_id": "65abc123",
      "name": "Laptop",
      "category": "Electronics",
      "price": 899.99,
      "stockQuantity": 12
    }
  ],
  "pagination": {
    "total": 8,
    "page": 1,
    "limit": 10,
    "pages": 1
  }
}
```

## Rate Limiting and Special Considerations

Rate limiting cannot be determined from the provided implementation because no rate-limiting middleware or configuration is shown.

Other considerations include:

* Price parameters are converted using `parseFloat()`.
* Page and limit values are converted using `parseInt()`.
* The endpoint calculates the number of pages using the total number of matching products.
* The `inStock` filter is applied only when the value is exactly `"true"`.
* The implementation does not show validation for invalid or negative page and limit values.
* The allowed values for the `sort` field are not explicitly restricted in the provided code.
* The exact product schema is not included, so the complete structure of a product cannot be determined from this endpoint alone.

## What I Learned

I learned that API documentation should describe not only what an endpoint does, but also how another developer can interact with it.

The implementation code allowed me to identify the query parameters, default values, filtering behaviour, sorting, pagination, successful response, and server-error response.

I also learned not to invent information that is not visible in the code. For example, authentication and rate-limiting requirements cannot be confirmed from this endpoint alone.

## Prompt 2: API Reference Conversion

### OpenAPI YAML

I converted the `GET /products` endpoint documentation into an OpenAPI 3.0 YAML format.

```yaml
openapi: 3.0.0

info:
  title: Product API
  description: API for retrieving products with filtering, sorting, and pagination.
  version: 1.0.0

paths:
  /products:
    get:
      summary: Get products
      description: Retrieves a list of products with optional filtering, sorting, and pagination.

      parameters:
        - name: category
          in: query
          required: false
          schema:
            type: string
          description: Filters products by category.

        - name: minPrice
          in: query
          required: false
          schema:
            type: number
            format: float
          description: Returns products with a price greater than or equal to this value.

        - name: maxPrice
          in: query
          required: false
          schema:
            type: number
            format: float
          description: Returns products with a price less than or equal to this value.

        - name: sort
          in: query
          required: false
          schema:
            type: string
            default: createdAt
          description: Specifies the product field used for sorting.

        - name: order
          in: query
          required: false
          schema:
            type: string
            enum:
              - asc
              - desc
            default: desc
          description: Specifies the sorting direction.

        - name: page
          in: query
          required: false
          schema:
            type: integer
            default: 1
          description: Specifies the page number to return.

        - name: limit
          in: query
          required: false
          schema:
            type: integer
            default: 20
          description: Specifies the maximum number of products returned per page.

        - name: inStock
          in: query
          required: false
          schema:
            type: boolean
          description: When true, only products with stock greater than zero are returned.

      responses:
        '200':
          description: Products successfully retrieved.
          content:
            application/json:
              schema:
                type: object
                properties:
                  products:
                    type: array
                    items:
                      type: object
                      properties:
                        _id:
                          type: string
                        name:
                          type: string
                        category:
                          type: string
                        price:
                          type: number
                          format: float
                        stockQuantity:
                          type: integer

                  pagination:
                    type: object
                    properties:
                      total:
                        type: integer
                      page:
                        type: integer
                      limit:
                        type: integer
                      pages:
                        type: integer

        '500':
          description: Server error while fetching products.
          content:
            application/json:
              schema:
                type: object
                properties:
                  error:
                    type: string
                  message:
                    type: string

              example:
                error: "Server error"
                message: "Failed to fetch products"

# Authentication and rate limiting are not specified
# in the provided endpoint implementation.
```

### What I Learned

Converting the API documentation into OpenAPI YAML helped me understand how an API endpoint can be represented in a standard machine-readable format.

I learned that the endpoint's HTTP method, path, query parameters, response status codes, response structure, and examples can all be described in a structured document.

I also learned that documentation should only include information supported by the implementation. Authentication and rate-limiting details were not included because they could not be determined from the provided code.

## Prompt 3: API Usage Guide Creation

### Developer Guide: Using the Product API

#### 1. Overview

The Product API provides an endpoint for retrieving products from the application.

The `GET /products` endpoint allows developers to retrieve products and optionally filter, sort, and paginate the results.

**Endpoint:**

`GET /products`

#### 2. Authentication

Authentication requirements cannot be determined from the provided implementation.

The endpoint code does not show authentication or authorization middleware, so developers should check the wider application configuration before assuming that the endpoint is publicly accessible.

#### 3. Basic Usage

To retrieve products using the default settings:

```text
GET /products
```

The default behaviour is:

* Sort by `createdAt`
* Sort in descending order
* Return page 1
* Return up to 20 products

#### 4. Filtering Products

Products can be filtered using query parameters.

##### Filter by Category

```text
GET /products?category=Electronics
```

##### Filter by Price

```text
GET /products?minPrice=100&maxPrice=1000
```

This returns products with prices between 100 and 1000.

##### Filter by Stock

```text
GET /products?inStock=true
```

This returns products where the stock quantity is greater than zero.

Filters can also be combined:

```text
GET /products?category=Electronics&minPrice=100&maxPrice=1000&inStock=true
```

#### 5. Sorting Products

The `sort` parameter specifies the field used for sorting.

The `order` parameter specifies the direction.

Example:

```text
GET /products?sort=price&order=asc
```

This requests products sorted by price from lowest to highest.

For descending order:

```text
GET /products?sort=price&order=desc
```

#### 6. Pagination

The API supports pagination using the `page` and `limit` parameters.

Example:

```text
GET /products?page=2&limit=10
```

This requests the second page with up to 10 products.

The response includes pagination information:

```json
{
  "pagination": {
    "total": 45,
    "page": 2,
    "limit": 10,
    "pages": 5
  }
}
```

#### 7. Complete Example

A developer can combine filtering, sorting, and pagination in one request:

```text
GET /products?category=Electronics&minPrice=100&maxPrice=1000&sort=price&order=asc&inStock=true&page=1&limit=10
```

The API returns a response containing the matching products and pagination information.

#### 8. Handling Errors

If the server encounters an unexpected problem while retrieving products, it returns HTTP `500`.

Example:

```json
{
  "error": "Server error",
  "message": "Failed to fetch products"
}
```

Developers should handle this response appropriately and avoid assuming that the request was successful.

#### 9. Important Considerations

Developers using this endpoint should consider the following:

* `page` and `limit` are converted to integers by the server.
* `minPrice` and `maxPrice` are converted to floating-point numbers.
* The stock filter is activated when `inStock=true`.
* The default page is `1`.
* The default limit is `20`.
* The default sort field is `createdAt`.
* The default sort order is descending.
* Authentication requirements are not visible in the provided code.
* Rate limiting is not visible in the provided code.
* The complete product schema is not available from this endpoint alone.

#### 10. Best Practices

When integrating with the Product API:

1. Use pagination rather than requesting unnecessarily large result sets.
2. Apply filters when possible to reduce the amount of data returned.
3. Handle HTTP errors appropriately.
4. Do not assume authentication or rate-limiting behaviour without checking the wider application.
5. Validate user-provided query parameters before constructing requests.
6. Use sorting and filtering together when the application requires a specific result set.

#### What I Learned

Creating the usage guide helped me understand the difference between technical API documentation and a developer guide.

The endpoint documentation describes what the API does and how it is structured, while the usage guide focuses more on how another developer would actually use the endpoint.

I also learned that examples are important because they show developers how query parameters can be combined to perform realistic operations.

The exercise reinforced the importance of checking the actual implementation before documenting assumptions about authentication, rate limiting, validation, or other behaviour.
