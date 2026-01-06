
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component';
import { TcoCalculatorComponent } from './components/tco-calculator.component';
import { TechSpecsComponent } from './components/tech-specs.component';
import { ServicesComponent } from './components/services.component';
import { DevOpsAssistantComponent } from './components/devops-assistant.component';
import { BlueprintDownloadComponent } from './components/blueprint-download.component';
import { ContactComponent } from './pages/contact.component';
import { LegalComponent } from './pages/legal.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'calculator', component: TcoCalculatorComponent },
  { path: 'architecture', component: TechSpecsComponent },
  { path: 'pricing', component: ServicesComponent },
  { path: 'assistant', component: DevOpsAssistantComponent },
  { path: 'resources', component: BlueprintDownloadComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'managed', component: ContactComponent },
  
  // Legal Routes
  { path: 'legal/privacy', component: LegalComponent, data: { type: 'privacy-policy'} },
  { path: 'legal/terms', component: LegalComponent, data: { type: 'terms-of-service'} },
  
  { path: '**', redirectTo: '' }
];
