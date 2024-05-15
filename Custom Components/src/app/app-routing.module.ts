import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { DemoComponent } from './pages/demo/demo.component';
import { BrowserModule } from '@angular/platform-browser';

const routes: Routes = [
  { path: 'demo', component: DemoComponent },
  {
    path: '**',
    redirectTo: '/demo',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: "reload"}), BrowserModule],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
