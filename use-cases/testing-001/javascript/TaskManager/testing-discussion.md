# Using AI to Help with Testing – Exercise Discussion

## Part 1: Test Plan

The purpose of the testing plan was to verify the behavior of `calculateTaskScore`, `sortTasksByImportance`, and `getTopPriorityTasks`.

### High-Priority Tests

* Verify that task priority produces the correct base score.

  * LOW = 10
  * MEDIUM = 20
  * HIGH = 30
  * URGENT = 40
* Verify that an overdue task receives an additional 30 points.
* Verify that a task with `DONE` status has 50 points deducted.
* Verify that `sortTasksByImportance` places the highest-scoring task first.
* Verify that `getTopPriorityTasks` returns the correct number of highest-priority tasks.

### Medium-Priority Tests

* Verify that a task with a `blocker`, `critical`, or `urgent` tag receives an 8-point boost.
* Verify the recent-update scoring behavior.
* Verify the three functions work together correctly.

### Edge Cases

* A task with no due date should receive no due-date bonus.
* A task due more than seven days away should receive no due-date bonus.
* A task updated more than one day ago should not receive the 5-point recent-update bonus.

Unit tests are appropriate for testing the individual scoring and sorting behaviors. Integration testing is used to verify that the scoring, sorting, and top-priority selection functions work correctly together.

## Part 2: Improved Unit Tests

I first created a simple test for a MEDIUM-priority task. The test verifies that a MEDIUM task with no additional scoring bonuses receives a base score of 20.

I improved the test name so that its purpose was clearer:

`returns a base score of 20 for a medium priority task with no scoring bonuses`

I then added a due-date test. I controlled the system time using Jest and created a MEDIUM-priority task that was overdue.

The expected result was:

`20 base score + 30 overdue bonus = 50`

Both unit tests passed successfully.

## Part 3: Test-Driven Development

### New Feature

The new feature required tasks assigned to the current user to receive a score boost of 12 points.

I followed the Red-Green-Refactor approach.

**Red:** I first wrote a test for a MEDIUM task assigned to the current user. The expected score was 32, but the test returned 20 because the feature had not been implemented.

**Green:** I updated `calculateTaskScore` to accept the current user and added the 12-point boost.

During testing, I discovered a regression. Tasks without an assigned user were also receiving the 12-point boost because both `task.assignedTo` and `currentUser` could be `undefined`.

I corrected the condition to:

```javascript
if (currentUser && task.assignedTo === currentUser) {
  score += 12;
}
```

After the correction, all existing tests and the new feature test passed.

### Regression Test

I also added a test to verify that a task updated more than one day ago does not receive the 5-point recent-update bonus.

This test protects the days-since-update behavior from future regressions.

## Part 4: Integration Testing

I created an integration test using LOW, HIGH, and URGENT tasks.

The test verified that `sortTasksByImportance` ordered the tasks as:

1. Urgent task
2. High task
3. Low task

I then used `getTopPriorityTasks(tasks, 2)` and verified that only the Urgent and High tasks were returned.

This demonstrated that task scoring, sorting, and top-priority selection work correctly together.

## Final Test Results

The completed Jest test suite produced:

```text
Test Suites: 1 passed, 1 total
Tests:       5 passed, 5 total
```

All five tests passed successfully.

## Reflection

This exercise helped me understand that testing is not only about checking whether code runs. Good tests should verify specific behaviors and make the expected result clear.

I learned how to isolate individual behaviors, consider edge cases, use precise assertions, and control dates when testing time-dependent functionality.

The TDD exercise was particularly useful because I wrote a failing test before implementing the feature. I also learned that adding a new feature can accidentally break existing behavior. The existing tests helped identify this regression.

The integration test helped me understand the difference between testing one function individually and testing several related functions working together.

Using AI as a guide was helpful because it supported my reasoning about what should be tested while I could still run the tests, observe the results, identify failures, and verify that the final implementation worked correctly.
