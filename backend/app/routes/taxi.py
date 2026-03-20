from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from .. import models, schemas, auth, database

router = APIRouter()

@router.post("/update-location", response_model=schemas.TaxiLocation)
def update_location(
    location: schemas.TaxiLocationUpdate,
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    if current_user.role != "vendor" and current_user.role != "driver":
        raise HTTPException(status_code=403, detail="Only drivers can update location")
    
    db_location = db.query(models.TaxiLocation).filter(models.TaxiLocation.driver_id == current_user.id).first()
    if db_location:
        db_location.latitude = location.latitude
        db_location.longitude = location.longitude
        db_location.status = location.status
    else:
        db_location = models.TaxiLocation(
            driver_id=current_user.id,
            latitude=location.latitude,
            longitude=location.longitude,
            status=location.status
        )
        db.add(db_location)
    
    db.commit()
    db.refresh(db_location)
    return db_location

@router.get("/nearby", response_model=List[schemas.TaxiLocation])
def get_nearby_taxis(
    db: Session = Depends(database.get_db)
):
    # For now, just return all active taxis. In production, add radius filtering.
    return db.query(models.TaxiLocation).filter(models.TaxiLocation.status == "available").all()
