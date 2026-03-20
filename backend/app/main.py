from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from . import models, schemas, auth, database
from .routes import users, listings, bookings, chat, taxi
from .database import engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="KasiPass API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to KasiPass Community OS API"}

app.include_router(users.router, prefix="/users", tags=["users"])
app.include_router(listings.router, prefix="/listings", tags=["listings"])
app.include_router(bookings.router, prefix="/bookings", tags=["bookings"])
app.include_router(chat.router, prefix="/chat", tags=["chat"])
app.include_router(taxi.router, prefix="/taxi", tags=["taxi"])
