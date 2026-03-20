from sqlalchemy.orm import Session
from app.database import SessionLocal, engine
from app import models, auth
from datetime import datetime

def seed_db():
    db = SessionLocal()
    
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

    # 2. Create Listings
    listings = [
        models.Listing(
            title="Kwesta Live in Soweto",
            description="Experience the best of South African hip hop live at Orlando Stadium. Special guest appearances!",
            price=80.0,
            category="Events",
            type="event",
            location="Orlando Stadium, Soweto",
            image_url="https://images.unsplash.com/photo-1459749411177-042180ce673c?q=80&w=600",
            owner_id=vendor1.id
        ),
        models.Listing(
            title="Soweto Derby Ticket",
            description="Chiefs vs Pirates. The biggest match in SA football.",
            price=150.0,
            category="Events",
            type="event",
            location="FNB Stadium",
            image_url="https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=600",
            owner_id=vendor1.id
        ),
        models.Listing(
            title="Local Taxi Service",
            description="Safe and reliable transport within Soweto and surrounding areas.",
            price=20.0,
            category="Transport",
            type="transport",
            location="Soweto",
            image_url="https://images.unsplash.com/photo-1556122071-e404be745773?q=80&w=600",
            owner_id=vendor2.id
        ),
        models.Listing(
            title="Fresh Haircut - Kasi Style",
            description="Get the freshest fades and patterns in the township.",
            price=50.0,
            category="Services",
            type="service",
            location="Diepkloof",
            image_url="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=600",
            owner_id=vendor1.id
        ),
    ]

    for listing in listings:
        db.add(listing)

    db.commit()
    print("Seeding complete!")
    db.close()

if __name__ == "__main__":
    seed_db()
