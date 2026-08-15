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
