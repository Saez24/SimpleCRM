import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({"projectId":"simplecrm-f0832","appId":"1:1095408827637:web:31e471b5a06c4aacb599bc","storageBucket":"simplecrm-f0832.appspot.com","apiKey":"AIzaSyAKhQPWTaDe-RWUacKMRyL5SB1C3Jal9FU","authDomain":"simplecrm-f0832.firebaseapp.com","messagingSenderId":"1095408827637"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};
