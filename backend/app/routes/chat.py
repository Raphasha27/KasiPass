from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from .. import models, schemas, auth, database

router = APIRouter()

@router.post("/", response_model=schemas.Message)
def send_message(
    message: schemas.MessageCreate,
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    db_message = models.Message(
        sender_id=current_user.id,
        receiver_id=message.receiver_id,
        content=message.content
    )
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    return db_message

@router.get("/my", response_model=List[schemas.Message])
def get_my_messages(
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    return db.query(models.Message).filter(
        (models.Message.sender_id == current_user.id) | 
        (models.Message.receiver_id == current_user.id)
    ).order_by(models.Message.timestamp.desc()).all()

@router.get("/conversation/{user_id}", response_model=List[schemas.Message])
def get_conversation(
    user_id: int,
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    return db.query(models.Message).filter(
        ((models.Message.sender_id == current_user.id) & (models.Message.receiver_id == user_id)) |
        ((models.Message.sender_id == user_id) & (models.Message.receiver_id == current_user.id))
    ).order_by(models.Message.timestamp.asc()).all()
