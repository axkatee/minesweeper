import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartPageComponent } from '@component/start-page/start-page.component';
import { GameConfigComponent } from '@component/game-config/game-config.component';
import { MinesweeperComponent } from '@component/minesweeper/minesweeper.component';
import { PlayFieldComponent } from '@component/play-field/play-field.component';
import { PlayFieldCellDirective } from '@directive/play-field-cell.directive';

@NgModule({
  declarations: [
    AppComponent,
    StartPageComponent,
    GameConfigComponent,
    MinesweeperComponent,
    PlayFieldComponent,
    PlayFieldCellDirective
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
