import { BrowserModule } from '@angular/platform-browser'
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { APP_INITIALIZER } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { appStoreProviders } from './store/store'

import * as Init from './services/appload.service'
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { CorrelationInterceptor } from './services/corrleation.interceptor'
import { DxDataGridModule, DxSelectBoxModule, DxTextAreaModule, DxFormModule } from 'devextreme-angular'
import { ListTnstodayComponent } from './components/grid/list-tnstoday.component'
import { DetailedTnstodayComponent } from './components/form/detailed-tnstoday.component'

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

@NgModule({
    declarations: [AppComponent, ListTnstodayComponent, DetailedTnstodayComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        BrowserAnimationsModule,
        DxDataGridModule,
        DxSelectBoxModule,
        DxTextAreaModule,
        DxFormModule,
        FontAwesomeModule,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    providers: [
        appStoreProviders,
        Init.AppLoadService,
        Init.AppConfig,
        {
            provide: APP_INITIALIZER,
            useFactory: Init.get_settings,
            deps: [Init.AppLoadService],
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: CorrelationInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
