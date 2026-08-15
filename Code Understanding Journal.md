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
