from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None
    role: Optional[str] = "user"

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    is_active: bool

    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

class ListingBase(BaseModel):
    title: str
    description: str
    price: float
    category: str
    type: str # event, service, transport
    location: str
    image_url: Optional[str] = None

class ListingCreate(ListingBase):
    pass

class Listing(ListingBase):
    id: int
    owner_id: int
    created_at: datetime

    class Config:
        orm_mode = True

class BookingBase(BaseModel):
    listing_id: int

class BookingCreate(BookingBase):
    pass

class Booking(BookingBase):
    id: int
    user_id: int
    qr_code: str
    status: str
    booked_at: datetime

    class Config:
        orm_mode = True
