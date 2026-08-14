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
