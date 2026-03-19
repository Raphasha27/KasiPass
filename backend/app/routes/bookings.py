from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from .. import models, schemas, auth, database
from ..utils.qr import generate_qr_data

router = APIRouter()

@router.post("/", response_model=schemas.Booking)
def create_booking(
    booking_in: schemas.BookingCreate,
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    listing = db.query(models.Listing).filter(models.Listing.id == booking_in.listing_id).first()
    if not listing:
        raise HTTPException(status_code=404, detail="Listing not found")
    
    # Simple booking logic for MVP
    qr_data = generate_qr_data(booking_id=999) # Temp ID for preview
    
    db_booking = models.Booking(
        user_id=current_user.id,
        listing_id=booking_in.listing_id,
        qr_code=qr_data,
        status="active"
    )
    db.add(db_booking)
    db.commit()
    db.refresh(db_booking)
    
    # Update QR code with real ID
    db_booking.qr_code = generate_qr_data(db_booking.id)
    db.commit()
    db.refresh(db_booking)
    
    return db_booking

@router.get("/my", response_model=List[schemas.Booking])
def get_my_bookings(
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    return db.query(models.Booking).filter(models.Booking.user_id == current_user.id).all()

@router.post("/validate/{qr_code}")
def validate_booking(
    qr_code: str,
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    # Only vendors can validate bookings for their own listings
    booking = db.query(models.Booking).filter(models.Booking.qr_code == qr_code).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Invalid ticket")
    
    if booking.status != "active":
        return {"status": "failed", "message": f"Ticket is {booking.status}"}
    
    listing = db.query(models.Listing).filter(models.Listing.id == booking.listing_id).first()
    if listing.owner_id != current_user.id and current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized to validate this ticket")
    
    booking.status = "used"
    db.commit()
    return {"status": "success", "message": "Ticket validated successfully", "listing": listing.title}
