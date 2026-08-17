const {
  calculateTaskScore,
  sortTasksByImportance,
  getTopPriorityTasks
} = require("./task_priority");
const { TaskPriority, TaskStatus } = require("./models");

test("returns a base score of 20 for a medium priority task with no scoring bonuses", () => {
    const task = {
        priority: TaskPriority.MEDIUM,
        dueDate: null,
        status: TaskStatus.TODO,
        tags: [],
        updatedAt: new Date(0)
    };

    const score = calculateTaskScore(task);

    expect(score).toBe(20);
});

test("adds 30 points when a medium priority task is overdue", () => {
    jest.useFakeTimers().setSystemTime(new Date("2026-08-17T12:00:00"));

    const task = {
        priority: TaskPriority.MEDIUM,
        dueDate: new Date("2026-08-16T12:00:00"),
        status: TaskStatus.TODO,
        tags: [],
        updatedAt: new Date("2026-08-10T12:00:00")
    };

    const score = calculateTaskScore(task);

    expect(score).toBe(50);

    jest.useRealTimers();
});

test("adds 12 points when the task is assigned to the current user", () => {
    const task = {
        priority: TaskPriority.MEDIUM,
        dueDate: null,
        status: TaskStatus.TODO,
        tags: [],
        updatedAt: new Date(0),
        assignedTo: "current-user"
    };

    const score = calculateTaskScore(task, "current-user");

    expect(score).toBe(32);
});

test("does not add 5 points when the task was updated more than one day ago", () => {
    jest.useFakeTimers().setSystemTime(new Date("2026-08-17T12:00:00"));

    const task = {
        priority: TaskPriority.MEDIUM,
        dueDate: null,
        status: TaskStatus.TODO,
        tags: [],
        updatedAt: new Date("2026-08-15T12:00:00")
    };

    const score = calculateTaskScore(task);

    expect(score).toBe(20);

    jest.useRealTimers();
});

test("scores, sorts, and returns the top priority tasks correctly", () => {
    const tasks = [
        {
            title: "Low task",
            priority: TaskPriority.LOW,
            dueDate: null,
            status: TaskStatus.TODO,
            tags: [],
            updatedAt: new Date(0)
        },
        {
            title: "Urgent task",
            priority: TaskPriority.URGENT,
            dueDate: null,
            status: TaskStatus.TODO,
            tags: [],
            updatedAt: new Date(0)
        },
        {
            title: "High task",
            priority: TaskPriority.HIGH,
            dueDate: null,
            status: TaskStatus.TODO,
            tags: [],
            updatedAt: new Date(0)
        }
    ];

    const sortedTasks = sortTasksByImportance(tasks);
    const topTasks = getTopPriorityTasks(tasks, 2);

    expect(sortedTasks[0].title).toBe("Urgent task");
    expect(sortedTasks[1].title).toBe("High task");
    expect(sortedTasks[2].title).toBe("Low task");

    expect(topTasks).toHaveLength(2);
    expect(topTasks[0].title).toBe("Urgent task");
    expect(topTasks[1].title).toBe("High task");
});