# 🚀 KasiPass: Community OS

Welcome to **KasiPass**, a comprehensive Community OS designed to empower local communities with a digital ecosystem. Built for the South African market standard, it offers seamless integration of services directly on your mobile device.

## 📱 Architecture

This project is a full-stack mobile application structured into two main components:

*   **Frontend (Mobile App)**: Built using React Native and Expo. It delivers a fast, responsive, and native-like experience on both Android and iOS devices.
*   **Backend (API Server)**: Powered by FastAPI (Python), offering high performance, automatic interactive documentation, and robust data handling.

## 🌟 Key Features

*   **Cross-Platform Delivery**: Write once, deploy to both Android (APK) and iOS through Expo Application Services (EAS).
*   **High Performance**: FastAPI backend with asynchronous endpoint processing.
*   **Scalable Deployment**: Ready for transition from SQLite to PostgreSQL for production environments.

## 🛠️ Quick Start

### Backend (FastAPI)
```bash
cd backend
python -m venv venv
# activate venv
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend (Expo)
```bash
cd frontend
npm install
npx expo start
```

## 🏗️ Production Build

Refer to `BUILD.md` for detailed instructions on generating Android APKs and iOS production builds using the EAS CLI.

---
*Developed by Kirov Dynamics Technology.*
