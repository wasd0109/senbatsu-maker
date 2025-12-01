import * as admin from 'firebase-admin';
import * as fs from 'fs';
import * as path from 'path';

let firebaseApp: admin.app.App | null = null;

export function initializeFirebaseAdmin() {
  if (firebaseApp) {
    return firebaseApp;
  }

  try {
    let serviceAccount;

    // Check if FIREBASE_SERVICE_ACCOUNT_JSON is provided as a JSON string (for Vercel)
    if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
      serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
    } else {
      // Fall back to file path (for local development)
      const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH || './firebase-service-account.json';
      const absolutePath = path.resolve(serviceAccountPath);

      if (!fs.existsSync(absolutePath)) {
        throw new Error(`Firebase service account file not found at: ${absolutePath}`);
      }

      serviceAccount = JSON.parse(fs.readFileSync(absolutePath, 'utf8'));
    }

    firebaseApp = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });

    console.log('Firebase Admin initialized successfully');
    return firebaseApp;
  } catch (error) {
    console.error('Error initializing Firebase Admin:', error);
    throw error;
  }
}

export function getFirestore() {
  if (!firebaseApp) {
    initializeFirebaseAdmin();
  }
  return admin.firestore();
}

export { admin };
