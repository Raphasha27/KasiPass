from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime, Boolean
from sqlalchemy.orm import relationship
from .database import Base
from datetime import datetime

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    full_name = Column(String)
    role = Column(String, default="user") # user, vendor, admin
    is_active = Column(Boolean, default=True)

class Listing(Base):
    __tablename__ = "listings"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    description = Column(String)
    price = Column(Float)
    category = Column(String) # Party, Study, Church, Travel, Barber, etc.
    type = Column(String) # event, service, transport
    location = Column(String)
    image_url = Column(String, nullable=True)
    owner_id = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime, default=datetime.utcnow)

    owner = relationship("User")

class Booking(Base):
    __tablename__ = "bookings"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    listing_id = Column(Integer, ForeignKey("listings.id"))
    qr_code = Column(String, unique=True)
    status = Column(String, default="active") # active, used, cancelled
    booked_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User")
    listing = relationship("Listing")

class DeliveryRequest(Base):
    __tablename__ = "delivery_requests"
    id = Column(Integer, primary_key=True, index=True)
    booking_id = Column(Integer, ForeignKey("bookings.id"))
    driver_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    status = Column(String, default="pending") # pending, assigned, in_transit, delivered
    pickup_location = Column(String)
    dropoff_location = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

    booking = relationship("Booking")
