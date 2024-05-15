import { CUSTOM_ELEMENTS_SCHEMA, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ClickOutsideDirective } from "./directives/click-outside.directive";
import { ScrollRevealDirective } from './directives/scroll-reveal.directive';
import { CommonHttpRequestInterceptor } from './clients/CommonHttpRequestInterceptor';
import { SpinnerInterceptorService } from './services/spinner-interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { DemoComponent } from './pages/demo/demo.component';
import { SpinnerComponent } from './animation/spinner-animation/spinner.component';
import { ColorfulCanvasComponent } from './animation/colorful-canvas/colorful-canvas.component';
import { SvgLoadMorphComponent } from './animation/svg-load-morph-animation/svg-load-morph.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MaterialModule } from './common/material.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule,} from '@angular/material/slide-toggle';
import { GenericModalComponent } from './components/generic-modal/generic-modal.component';
import { SwipeableModalComponent } from './components/generic-modal/swipeable-modal/swipeable-modal.component';
import { GenericSideModalComponent } from './components/generic-side-modal/generic-side-modal.component';
import { GenericSideModalContainerComponent } from './components/generic-side-modal/generic-side-modal-container/generic-side-modal-container.component';
import { ModalContainerComponent } from './components/generic-modal/generic-modal-container/generic-modal-container.component';

@NgModule({
  declarations: [
    AppComponent,
    ClickOutsideDirective,
    ScrollRevealDirective,
    ClickOutsideDirective,
    SpinnerComponent,
    ColorfulCanvasComponent,
    SvgLoadMorphComponent,
    DemoComponent,
    GenericModalComponent,
    ModalContainerComponent,
    SwipeableModalComponent,
    GenericSideModalComponent,
    GenericSideModalContainerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatExpansionModule,
    MatIconModule,
    MaterialModule,
    MatTooltipModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatTabsModule,
    MatRadioModule,
    ModalModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }, defaultLanguage: 'mk'
    }),
    BrowserAnimationsModule
  ],
  providers: [
    [
      { provide: HTTP_INTERCEPTORS, useClass: CommonHttpRequestInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptorService, multi: true },
    ]
  ],
  exports: [
    MaterialModule,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { 

}
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/assets/i18n/');
}
