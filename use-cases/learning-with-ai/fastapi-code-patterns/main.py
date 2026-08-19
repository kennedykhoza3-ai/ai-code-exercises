from datetime import datetime
from typing import List

from fastapi import Depends, FastAPI
from pydantic import BaseModel

app = FastAPI(title="FastAPI Code Patterns Demo")


# -------------------------
# Models
# -------------------------

class ActionLog(BaseModel):
    username: str
    action: str
    timestamp: datetime


# -------------------------
# Repository Pattern
# -------------------------

class LogRepository:
    def __init__(self):
        self.logs = []

    def add(self, log: ActionLog):
        self.logs.append(log)
        return log

    def list(self) -> List[ActionLog]:
        return self.logs


log_repository = LogRepository()


# -------------------------
# Dependency Injection
# -------------------------

def get_log_repository():
    return log_repository


# -------------------------
# Service Layer
# -------------------------

class LogService:
    def __init__(self, repository: LogRepository):
        self.repository = repository

    def record_action(self, username: str, action: str):
        log = ActionLog(
            username=username,
            action=action,
            timestamp=datetime.now()
        )

        return self.repository.add(log)

    def get_logs(self):
        return self.repository.list()


# -------------------------
# Routes
# -------------------------

@app.get("/")
async def root():
    return {
        "message": "FastAPI Code Patterns Demo is running"
    }


@app.post("/login-action")
async def record_login(
    username: str,
    repository: LogRepository = Depends(get_log_repository)
):
    service = LogService(repository)

    return service.record_action(
        username=username,
        action="User logged in"
    )


@app.post("/admin-action")
async def record_admin_action(
    username: str,
    repository: LogRepository = Depends(get_log_repository)
):
    service = LogService(repository)

    return service.record_action(
        username=username,
        action="Admin viewed user list"
    )


@app.get("/logs/")
async def list_logs(
    repository: LogRepository = Depends(get_log_repository)
):
    service = LogService(repository)

    return service.get_logs()