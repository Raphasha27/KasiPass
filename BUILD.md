# 🚀 KasiPass Production Build Guide (Android/iOS)

This guide provides the definitive steps to build the **KasiPass Community OS** for production deployment. Since we are using **Expo (EAS)**, you can build for both Android and iOS from any machine (Windows/Linux/Mac).

---

### 1. 🏗️ Prerequisites
Before building, ensure you have the **EAS CLI** installed globally and you are logged into your Expo account.

```powershell
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login
```

---

### 2. 📱 Android APK (Downloadable)
To generate a `.apk` for testing on real Android devices (South African market standard):

```powershell
cd frontend
eas build -p android --profile preview
```
*   **Output**: A download link to the APK will be provided once the cloud build is complete.

---

### 3. 🍎 iOS Build (Sim or Device)
Since we are on Windows, we use the EAS cloud for iOS:

```powershell
eas build -p ios --profile production
```
*   **Note**: Requires an Apple Developer Program membership.

---

### 4. 🌐 Production API Migration
Before building for production, ensure the `frontend/services/api.js` is updated to point to your live backend (e.g., Heroku/DigitalOcean), as `localhost` will not work on real devices.

```javascript
// Change in frontend/services/api.js
const api = axios.create({
  baseURL: 'https://your-production-backend.com', // Update this!
});
```

---

### 🏛️ Backend Deployment
The backend uses **FastAPI**. For production:
1.  **DB**: Migrate from `sqlite` to `PostgreSQL`.
2.  **Server**: Use `gunicorn` with `uvicorn` workers.
3.  **Command**: `gunicorn -w 4 -k uvicorn.workers.UvicornWorker app.main:app`

---

**Happy Building! 🇿🇦📱**
