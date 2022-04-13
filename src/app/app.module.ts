import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartPageComponent } from './components/start-page/start-page.component';
import { MinesweeperComponent } from './components/minesweeper/minesweeper.component';

@NgModule({
  declarations: [
    AppComponent,
    StartPageComponent,
    MinesweeperComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
