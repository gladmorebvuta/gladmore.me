# Admin Upload Setup Guide

## 🔧 Setup Instructions

### 1. Enable Routing

To enable the admin upload functionality, you need to use the router version of the app:

**Option A: Quick Test (Development)**
- Navigate to `/admin/upload` directly in your browser
- You can modify the `Router.tsx` component to handle this

**Option B: Proper Setup**
- Update your main entry point to use `AppWithRouter` instead of `App`
- If using Vite/React, update your `main.tsx`:
  ```tsx
  import AppWithRouter from './AppWithRouter'
  
  root.render(<AppWithRouter />)
  ```

### 2. Firebase Configuration

Update the Firebase config in `/pages/AdminUpload.tsx`:

```typescript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

**To get your config:**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing
3. Go to Project Settings > General
4. Scroll to "Your apps" and click the web icon (</>)
5. Copy the firebaseConfig object

### 3. Enable Firebase Services

In Firebase Console:

**Firestore Database:**
1. Build > Firestore Database > Create Database
2. Start in test mode (or set security rules)
3. Collection will be auto-created as `projects`

**Storage:**
1. Build > Storage > Get Started
2. Start in test mode (or set security rules)
3. Images will be stored in `projects/` folder

### 4. Security Rules (Production)

**Firestore Rules** (`firestore.rules`):
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /projects/{project} {
      allow read: if true;  // Public read
      allow write: if request.auth != null;  // Authenticated write only
    }
  }
}
```

**Storage Rules** (`storage.rules`):
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /projects/{allPaths=**} {
      allow read: if true;  // Public read
      allow write: if request.auth != null;  // Authenticated write only
    }
  }
}
```

### 5. Authentication Setup

**Current Implementation:**
- Simple password protection (sessionStorage)
- Default password: `admin123`

**Change the password in** `/components/ProtectedRoute.tsx`:
```typescript
const ADMIN_PASSWORD = 'your-secure-password';
```

**For Production:**
- Replace with Firebase Authentication
- Use Firebase Admin SDK for server-side verification
- Implement proper OAuth/Email authentication

### 6. Update Main Portfolio to Load from Firebase

To fetch projects from Firebase instead of hardcoded data, update `/App.tsx`:

```typescript
import { getFirestore, collection, getDocs } from 'firebase/firestore';

// Inside your component
useEffect(() => {
  const fetchProjects = async () => {
    const db = getFirestore();
    const querySnapshot = await getDocs(collection(db, 'projects'));
    const projects = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setFeaturedProjects(projects);
  };
  
  fetchProjects();
}, []);
```

## 🎨 Admin Upload Features

### Form Fields

1. **Basic Information**
   - Title (auto-uppercase)
   - Category (Identity/Editorial/Digital)
   - Grid Size (Wide/Tall) - Critical for Bento layout
   - Tech Stack (comma-separated tags)

2. **Project Narrative**
   - The Challenge (textarea)
   - The Solution (textarea)

3. **System Specifications**
   - Dynamic key-value pairs
   - Displays in "Terminal" style on project modal
   - Default fields: primaryColor, typography, grid, deliverables
   - Add/remove custom specs

4. **Image Upload**
   - Drag & drop or click to browse
   - First image = Hero thumbnail (grid display)
   - Remaining images = Gallery (project modal)
   - Preview thumbnails with remove option

### Upload Process

1. Form validation
2. Images uploaded to Firebase Storage → URLs generated
3. Project document created in Firestore with:
   - All form data
   - Image URLs (hero + gallery)
   - Auto-generated: createdAt timestamp, year
4. Success message & form reset

## 🔐 Access the Admin Panel

- **URL:** `/admin/upload`
- **Password:** See `ProtectedRoute.tsx` (default: `admin123`)

## 📝 Data Structure

Projects are stored in Firestore with this schema:

```typescript
{
  title: string;           // "BLUEICON TECHNOLOGIES"
  label: string;           // "VISUAL IDENTITY"
  category: string;        // "Brand Systems"
  tech: string;            // "Figma, React, TypeScript"
  image: string;           // Hero image URL
  size: "wide" | "tall";   // Bento grid layout
  description: string;     // Combined challenge + solution
  role: string;            // "Lead Architect"
  year: string;            // "2024"
  tags: string[];          // ["Figma", "React", "TypeScript"]
  challenge: string;       // Full challenge text
  solution: string;        // Full solution text
  specs: {                 // System specs object
    primaryColor: string;
    typography: string;
    grid: string;
    deliverables: string;
    // ... custom specs
  };
  gallery: string[];       // Gallery image URLs
  createdAt: string;       // ISO timestamp
}
```

## 🚀 Going to Production

1. **Replace password auth with Firebase Authentication**
2. **Set proper security rules** (see above)
3. **Enable CORS** for your domain in Firebase Storage
4. **Consider image optimization** (Firebase Extensions: Resize Images)
5. **Add rate limiting** to prevent abuse
6. **Backup strategy** for Firestore data

## 💡 Tips

- Test uploads in Firebase Console first
- Monitor Storage usage (free tier: 5GB)
- Optimize images before upload (< 2MB recommended)
- Use environment variables for sensitive config
- Consider adding image compression
