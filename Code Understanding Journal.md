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

## AI-Assisted Understanding

This section will be updated throughout the exercise with findings, corrections, and insights from the AI prompts.
