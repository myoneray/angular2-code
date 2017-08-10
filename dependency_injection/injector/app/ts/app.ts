/*
 * Angular
 */
import {
  Component,
  ReflectiveInjector,
} from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

/*
 * Webpack
 */
require('css/styles.css');

/*
 * The injectable service
 */
class MyService {
  getValue(): string {
    return 'hi 麦子';
  }
}

@Component({
  selector: 'di-sample-app',
  template: `
  <button (click)="invokeService()">Get Value</button>
  `
})
class DiSampleApp {

  constructor(private myService :MyService) {
    let injector: any = ReflectiveInjector.resolveAndCreate([MyService]);
    this.myService = injector.get(MyService);
    console.log('Same instance?', this.myService === injector.get(MyService));
  }

  invokeService(): void {
    console.log('MyService returned:', this.myService.getValue());
  }
}

// no need to add injectables here
@NgModule({
  declarations: [ DiSampleApp ],
  imports: [ BrowserModule ],
  bootstrap: [ DiSampleApp ],
  providers: [MyService],
})
class DiSampleAppModule {}

platformBrowserDynamic().bootstrapModule(DiSampleAppModule);
