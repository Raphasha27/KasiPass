from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from .. import models, schemas, auth, database

router = APIRouter()

@router.get("/", response_model=List[schemas.Listing])
def get_listings(
    category: Optional[str] = None,
    type: Optional[str] = None,
    db: Session = Depends(database.get_db)
):
    query = db.query(models.Listing)
    if category:
        query = query.filter(models.Listing.category == category)
    if type:
        query = query.filter(models.Listing.type == type)
    return query.all()

@router.post("/", response_model=schemas.Listing)
def create_listing(
    listing: schemas.ListingCreate,
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    if current_user.role not in ["vendor", "admin"]:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to create listings")
    
    db_listing = models.Listing(**listing.dict(), owner_id=current_user.id)
    db.add(db_listing)
    db.commit()
    db.refresh(db_listing)
    return db_listing

@router.get("/{listing_id}", response_model=schemas.Listing)
def get_listing(listing_id: int, db: Session = Depends(database.get_db)):
    db_listing = db.query(models.Listing).filter(models.Listing.id == listing_id).first()
    if not db_listing:
        raise HTTPException(status_code=404, detail="Listing not found")
    return db_listing
