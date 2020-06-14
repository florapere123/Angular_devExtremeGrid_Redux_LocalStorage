import { Component, ViewChild } from '@angular/core';
import { AppStore } from './store/store';
import { RateItemActions } from './api/rateitem.actions';
import { DxFormComponent } from 'devextreme-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-app';
  @ViewChild(DxFormComponent, { static: false }) myform: DxFormComponent;

  constructor(private store: AppStore) {}

  get state() {
    return this.store.getState();
  }

}
