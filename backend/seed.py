import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from sqlalchemy.orm import Session
from app.database import SessionLocal, engine
from app import models, auth
from datetime import datetime

def seed_db():
    db = SessionLocal()
    
    # Ensure tables are created
    models.Base.metadata.create_all(bind=engine)
    
    # Check if we already have users
    if db.query(models.User).first():
        print("Database already seeded.")
        return

    print("Seeding database...")

    # 1. Create Users
    # Admin
    admin_user = models.User(
        email="admin@kasipass.co.za",
        hashed_password=auth.get_password_hash("admin123"),
        full_name="KasiPass Admin",
        role="admin"
    )
    db.add(admin_user)

    # Vendors
    vendor1 = models.User(
        email="vendor@grillhouse.co.za",
        hashed_password=auth.get_password_hash("vendor123"),
        full_name="Soweto Grillhouse",
        role="vendor"
    )
    vendor2 = models.User(
        email="thabo@taxi.co.za",
        hashed_password=auth.get_password_hash("thabo123"),
        full_name="Thabo Taxi Services",
        role="vendor"
    )
    db.add(vendor1)
    db.add(vendor2)

    # Standard User
    customer = models.User(
        email="thabo@kasipass.co.za",
        hashed_password=auth.get_password_hash("thabo123"),
        full_name="Thabo Mchize",
        role="user"
    )
    db.add(customer)
    
    db.commit()
    db.refresh(vendor1)
    db.refresh(vendor2)

    # 2. Create Listings focusing on Atteridgeville (-25.77, 28.08)
    listings = [
        models.Listing(
            title="Ama-Piano Night Atteridgeville",
            description="The hottest beats in Atteridgeville! Join us for an exclusive night with local DJs.",
            price=120.0,
            category="Events",
            type="event",
            location="Atteridgeville Sports Ground",
            image_url="https://images.unsplash.com/photo-1514525253361-bee23e97c790?q=80&w=600",
            owner_id=vendor1.id
        ),
        models.Listing(
            title="Shisanyama Weekend Jeffersville",
            description="Best braai in the west. Free drink with every platter buy.",
            price=250.0,
            category="Restaurants",
            type="service",
            location="Jeffersville Braai Hub",
            image_url="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600",
            owner_id=vendor1.id
        ),
        models.Listing(
            title="Taxi to Pretoria CBD",
            description="Fast and safe commute from Atteridgeville to Pretoria CBD.",
            price=25.0,
            category="Transport",
            type="transport",
            location="Atteridgeville Taxi Rank",
            image_url="https://images.unsplash.com/photo-1556122071-e404be74549b?q=80&w=600",
            owner_id=vendor2.id
        ),
        models.Listing(
            title="Vergenoeg Hair Studio",
            description="Get the freshest fade in Vergenoeg. Quality cuts only.",
            price=80.0,
            category="Services",
            type="service",
            location="Vergenoeg Main St",
            image_url="https://images.unsplash.com/photo-1503951914875-43212f71f08f?q=80&w=600",
            owner_id=vendor1.id
        ),
    ]

    for listing in listings:
        db.add(listing)

    # 3. Seed Taxi Locations in Atteridgeville area
    taxi_locations = [
        models.TaxiLocation(driver_id=vendor2.id, latitude=-25.7712, longitude=28.0823, status="available"), # Near Seeiso Park
        models.TaxiLocation(driver_id=admin_user.id, latitude=-25.7750, longitude=28.0780, status="available") # Near Jeffersville
    ]
    for loc in taxi_locations:
        db.add(loc)

    db.commit()
    print("Seeding complete with Atteridgeville focus!")
    db.close()

if __name__ == "__main__":
    seed_db()
