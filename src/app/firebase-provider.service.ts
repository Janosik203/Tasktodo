import { Injectable } from '@angular/core';
import {initializeApp, type FirebaseApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

@Injectable({
  providedIn: 'root'
})
export class FirebaseProviderService {
  private readonly app: FirebaseApp;

  constructor() {
    const firebaseConfig = {
      apiKey: "AIzaSyDzuoXzv94qEasfWnudEA8hky4cOM-C0gk",
      authDomain: "janosik-8f2e0.firebaseapp.com",
      projectId: "janosik-8f2e0",
      storageBucket: "janosik-8f2e0.appspot.com",
      messagingSenderId: "231866952448",
      appId: "1:231866952448:web:3da38a8782ef67e05121e5",
      measurementId: "G-S945JLZW25"
    };

// Initialize Firebase
    this.app = initializeApp(firebaseConfig);
    // const analytics = getAnalytics(app);
  }

  getDb() {
    return getFirestore(this.app);
  }
}
