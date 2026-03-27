from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from .. import models, schemas, auth

router = APIRouter()

@router.post("/panic", response_model=schemas.PanicAlert)
def trigger_panic(
    alert_in: schemas.PanicAlertCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    panic_alert = models.PanicAlert(
        user_id=current_user.id,
        latitude=alert_in.latitude,
        longitude=alert_in.longitude,
        description=alert_in.description,
        severity=alert_in.severity or "high",
        status="active"
    )
    db.add(panic_alert)
    db.commit()
    db.refresh(panic_alert)
    return panic_alert

@router.get("/active-alerts", response_model=List[schemas.PanicAlert])
def get_active_alerts(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Only admins can view all alerts")
    return db.query(models.PanicAlert).filter(models.PanicAlert.status == "active").all()
