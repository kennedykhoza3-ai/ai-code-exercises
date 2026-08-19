from fastapi import FastAPI, HTTPException, Query
from pydantic import BaseModel

app = FastAPI(title="FastAPI Blog API")

# Temporary in-memory storage
users = []
posts = []
comments = []


# -------------------------
# Pydantic Models
# -------------------------

class UserCreate(BaseModel):
    username: str
    password: str


class PostCreate(BaseModel):
    title: str
    content: str


class CommentCreate(BaseModel):
    content: str


# -------------------------
# Root
# -------------------------

@app.get("/")
async def root():
    return {"message": "FastAPI Blog API is running"}


# -------------------------
# User Registration
# -------------------------

@app.post("/users/register")
async def register_user(user: UserCreate):
    for existing_user in users:
        if existing_user["username"] == user.username:
            raise HTTPException(
                status_code=400,
                detail="Username already exists"
            )

    new_user = {
        "id": len(users) + 1,
        "username": user.username,
        "password": user.password
    }

    users.append(new_user)

    return {
        "message": "User registered successfully",
        "user_id": new_user["id"],
        "username": new_user["username"]
    }


# -------------------------
# User Authentication
# -------------------------

@app.post("/users/login")
async def login_user(user: UserCreate):
    for existing_user in users:
        if (
            existing_user["username"] == user.username
            and existing_user["password"] == user.password
        ):
            return {
                "message": "Login successful",
                "username": user.username
            }

    raise HTTPException(
        status_code=401,
        detail="Invalid username or password"
    )


# -------------------------
# Create Blog Post
# -------------------------

@app.post("/posts/")
async def create_post(post: PostCreate):
    new_post = {
        "id": len(posts) + 1,
        "title": post.title,
        "content": post.content
    }

    posts.append(new_post)

    return new_post


# -------------------------
# List Blog Posts
# -------------------------

@app.get("/posts/")
async def list_posts():
    return posts


# -------------------------
# Get One Blog Post
# -------------------------

@app.get("/posts/{post_id}")
async def get_post(post_id: int):
    for post in posts:
        if post["id"] == post_id:
            return post

    raise HTTPException(
        status_code=404,
        detail="Post not found"
    )


# -------------------------
# Update Blog Post
# -------------------------

@app.put("/posts/{post_id}")
async def update_post(
    post_id: int,
    updated_post: PostCreate
):
    for post in posts:
        if post["id"] == post_id:
            post["title"] = updated_post.title
            post["content"] = updated_post.content

            return post

    raise HTTPException(
        status_code=404,
        detail="Post not found"
    )


# -------------------------
# Delete Blog Post
# -------------------------

@app.delete("/posts/{post_id}")
async def delete_post(post_id: int):
    for post in posts:
        if post["id"] == post_id:
            posts.remove(post)

            return {
                "message": "Post deleted successfully"
            }

    raise HTTPException(
        status_code=404,
        detail="Post not found"
    )


# -------------------------
# Create Comment
# -------------------------

@app.post("/posts/{post_id}/comments")
async def create_comment(
    post_id: int,
    comment: CommentCreate
):
    post_exists = any(
        post["id"] == post_id
        for post in posts
    )

    if not post_exists:
        raise HTTPException(
            status_code=404,
            detail="Post not found"
        )

    new_comment = {
        "id": len(comments) + 1,
        "post_id": post_id,
        "content": comment.content
    }

    comments.append(new_comment)

    return new_comment


# -------------------------
# List Comments
# -------------------------

@app.get("/posts/{post_id}/comments")
async def list_comments(post_id: int):
    post_exists = any(
        post["id"] == post_id
        for post in posts
    )

@app.get("/search/")
async def search_posts(
    q: str = Query(..., min_length=1)
):
    query = q.lower()

    results = [
        post
        for post in posts
        if query in post["title"].lower()
        or query in post["content"].lower()
    ]

    return {
        "query": q,
        "results": results
    }