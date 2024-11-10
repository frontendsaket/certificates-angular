import { Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { Notfound404Component } from './page/notfound404/notfound404.component';
import { ContactComponent } from './page/contact/contact.component';
import { CertificateComponent } from './page/certificate/certificate.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'contact', component: ContactComponent},
    {path: 'certificate', component: CertificateComponent},
    {path: '**', component: Notfound404Component}
];
