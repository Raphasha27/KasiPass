import qrcode
import uuid
import os

QR_DIR = "static/qrcodes"

def generate_qr_data(booking_id: int):
    # Unique identifier for the QR code
    data = f"KASIPASS-{booking_id}-{uuid.uuid4().hex[:8]}"
    return data

def save_qr_image(data: str):
    if not os.path.exists(QR_DIR):
        os.makedirs(QR_DIR)
    
    img = qrcode.make(data)
    filename = f"{data}.png"
    filepath = os.path.join(QR_DIR, filename)
    img.save(filepath)
    return filepath
