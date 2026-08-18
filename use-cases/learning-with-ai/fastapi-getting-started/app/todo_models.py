from pydantic import BaseModel
from datetime import date


class TodoItem(BaseModel):
    id: int
    title: str
    description: str
    due_date: date
    completed: bool = False