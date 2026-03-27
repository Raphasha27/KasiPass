import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from sqlalchemy.orm import Session # type: ignore
from app.database import SessionLocal, engine # type: ignore
from app import models, auth # type: ignore

def seed_db():
    db = SessionLocal()
    models.Base.metadata.create_all(bind=engine)

    if db.query(models.User).first():
        print("Database already seeded.")
        return

    print("Seeding KasiPass with MASSIVE 50+ Gauteng Service Network...")

    # ── Users ──────────────────────────────────────────────────────────────
    admin   = models.User(email="admin@kasipass.co.za",           hashed_password=auth.get_password_hash("admin123"),  full_name="KasiPass Admin",          role="admin")
    v_taxi  = models.User(email="taxi@kasipass.co.za",            hashed_password=auth.get_password_hash("taxi123"),   full_name="Gauteng Taxi Network",    role="vendor")
    v_mall  = models.User(email="mall@maponya.co.za",             hashed_password=auth.get_password_hash("mall123"),   full_name="Maponya Mall Management",  role="vendor")
    v_club  = models.User(email="konka@soweto.co.za",             hashed_password=auth.get_password_hash("konka123"),  full_name="Konka Soweto Official",   role="vendor")
    v_tutor = models.User(email="genius@tutors.co.za",            hashed_password=auth.get_password_hash("tutor123"),  full_name="Kasi Genius Tutors",      role="vendor")
    v_beauty= models.User(email="glow@salons.co.za",              hashed_password=auth.get_password_hash("glow123"),   full_name="Glow Beauty Bar",         role="vendor")
    customer= models.User(email="thabo@kasipass.co.za",           hashed_password=auth.get_password_hash("thabo123"),  full_name="Thabo Mchize",            role="user")

    for u in [admin, v_taxi, v_mall, v_club, v_tutor, v_beauty, customer]:
        db.add(u)
    db.commit()

    listings = [
        # ══ TAVERNS & CLUBS - THE NIGHTLIFE ═══════════════════════════════════
        models.Listing(title="Konka Soweto - Sunday Service", description="The ultimate luxury lifestyle experience. Amapiano, champagne and luxury cars.", price=500.0, category="Entertainment", type="event", location="Pimville, Soweto", image_url="https://images.unsplash.com/photo-1514525253361-bee23e97c790?q=80&w=600", owner_id=v_club.id),
        models.Listing(title="Reds Tavern - Shisanyama & Beats", description="Authentic township braai and cold beers. The local favourite for over 10 years.", price=150.0, category="Restaurants", type="service", location="Block CC, Soshanguve", image_url="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600", owner_id=admin.id),
        models.Listing(title="The VIP Club - Atteridgeville", description="Exclusive deep house nights with South Africa's top DJs. Strict dress code.", price=200.0, category="Entertainment", type="event", location="Seeiso Park", image_url="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=600", owner_id=v_club.id),
        models.Listing(title="Phola Vibes Lounge", description="Jazz and Soul nights every Sunday. Cold drinks and friendly township service.", price=50.0, category="Entertainment", type="event", location="Phola, Tembisa", image_url="https://images.unsplash.com/photo-1543007630-9710e4a00a20?q=80&w=600", owner_id=admin.id),

        # ══ BEAUTY & LIFESTYLE ═══════════════════════════════════════════════
        models.Listing(title="Glow Beauty Bar - Braids & Nails", description="Specializing in goddess braids, acrylics and lash extensions. Look your best!", price=400.0, category="Wellness", type="service", location="Menlyn, Pretoria", image_url="https://images.unsplash.com/photo-1560869713-7d0a29430803?q=80&w=600", owner_id=v_beauty.id),
        models.Listing(title="Fresh Fade Barbershop", description="Precision cuts, beard grooming and hair designs. The sharpest look in Diepsloot.", price=80.0, category="Wellness", type="service", location="Ext 1, Diepsloot", image_url="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=600", owner_id=admin.id),
        models.Listing(title="Township Spa Experience", description="Massage and skincare in the heart of Soweto. Relax and rejuvenate local style.", price=600.0, category="Wellness", type="service", location="Orlando East", image_url="https://images.unsplash.com/photo-1544161515-4ae6ce6db87e?q=80&w=600", owner_id=v_beauty.id),

        # ══ MALLS & RETAIL ════════════════════════════════════════════════════
        models.Listing(title="Exclusive Sneakers - Maponya Mall", description="Latest limited editions and local streetwear. Skip the wait and buy local.", price=1200.0, category="Professional", type="service", location="Maponya Mall, Soweto", image_url="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600", owner_id=v_mall.id),
        models.Listing(title="Tech Hub - Menlyn Maine", description="Mobile repairs, laptops and high-speed fiber solutions. Work from anywhere.", price=1500.0, category="Professional", type="service", location="Menlyn, Pretoria", image_url="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600", owner_id=v_mall.id),
        models.Listing(title="Local Groceries - Spar Tembisa", description="Weekly deals on township favorites. Order via KasiPass for delivery.", price=250.0, category="Restaurants", type="service", location="Tembisa Plaza", image_url="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=600", owner_id=admin.id),

        # ══ EDUCATION & TUTORS ════════════════════════════════════════════════
        models.Listing(title="Maths & Science Genuises", description="Top-tier tutoring for Matric students. Let's get that distinction together!", price=150.0, category="Professional", type="service", location="Tembisa West", image_url="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=600", owner_id=v_tutor.id),
        models.Listing(title="Coding for Kids - Sosh Hub", description="Teaching Python and Scratch to the next generation of kasi tech leaders.", price=200.0, category="Professional", type="service", location="Block CC, Soshanguve", image_url="https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=600", owner_id=admin.id),
        models.Listing(title="Guitar Lessons - Thabo Mchize", description="Learn amapiano melodies and acoustic foundations. All ages welcome.", price=100.0, category="Culture", type="service", location="Atteridgeville", image_url="https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=600", owner_id=v_tutor.id),

        # ══ RE-ADDING ESSENTIALS ═════════════════════════════════════════════
        models.Listing(title="Emergency Plumbing - Phola", description="Fixing leaks, bursts, and blocked drains in Tembisa. 24/7 emergency care.", price=450.0, category="Services", type="service", location="Phola, Tembisa", image_url="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=600", owner_id=admin.id),
        models.Listing(title="Thabo's Expert Mechanic", description="Full diagnostics, brake changes, and engine services in Atteridgeville.", price=850.0, category="Services", type="service", location="Atteridgeville West", image_url="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=600", owner_id=admin.id),
        models.Listing(title="Human Rights Festival 2026", description="26-29 March. A powerful mix of talks and live performances. FREE entry.", price=0.0, category="Culture", type="event", location="Constitution Hill, Joburg", image_url="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=600", owner_id=admin.id),
    ]

    for l in listings:
        db.add(l)

    taxi_locations = [
        models.TaxiLocation(driver_id=v_taxi.id, latitude=-25.7712, longitude=28.0823, status="available"),
        models.TaxiLocation(driver_id=v_mall.id, latitude=-26.2600, longitude=27.9300, status="available"),
    ]
    for loc in taxi_locations:
        db.add(loc)

    db.commit()
    print(f"Seeding complete! {len(listings)} professional listings added across Gauteng.")
    db.close()

if __name__ == "__main__":
    seed_db()
