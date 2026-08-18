from fastapi import FastAPI, HTTPException
from app.models import Item
from app.todo_models import TodoItem

app = FastAPI()

todos = []


@app.get("/")
async def root():
    return {"message": "Hello World from FastAPI!"}


@app.get("/items/{item_id}")
async def read_item(item_id: int):
    if item_id < 1:
        raise HTTPException(
            status_code=400,
            detail="Item ID must be greater than zero"
        )

    return {
        "item_id": item_id,
        "message": f"You requested item {item_id}"
    }


@app.get("/search/")
async def search_items(q: str = None, skip: int = 0, limit: int = 10):
    return {
        "query": q,
        "skip": skip,
        "limit": limit,
        "message": f"Searching for '{q}' (skipping {skip}, limiting to {limit})"
    }


@app.post("/items/")
async def create_item(item: Item):
    return {
        "message": "Item created successfully",
        "item": item
    }


@app.post("/todos/")
async def create_todo(todo: TodoItem):
    todo.id = len(todos) + 1
    todos.append(todo)
    return todo


@app.get("/todos/")
async def list_todos(status: str = None):
    if status == "completed":
        return [todo for todo in todos if todo.completed]

    if status == "pending":
        return [todo for todo in todos if not todo.completed]

    return todos


@app.put("/todos/{todo_id}/complete")
async def complete_todo(todo_id: int):
    for todo in todos:
        if todo.id == todo_id:
            todo.completed = True
            return todo

    raise HTTPException(
        status_code=404,
        detail="Todo item not found"
    )


@app.delete("/todos/{todo_id}")
async def delete_todo(todo_id: int):
    for todo in todos:
        if todo.id == todo_id:
            todos.remove(todo)
            return {"message": "Todo item deleted"}

    raise HTTPException(
        status_code=404,
        detail="Todo item not found"
    )