import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartPageComponent } from '@component/start-page/start-page.component';
import { MinesweeperComponent } from '@component/minesweeper/minesweeper.component';

@NgModule({
  declarations: [
    AppComponent,
    StartPageComponent,
    MinesweeperComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
