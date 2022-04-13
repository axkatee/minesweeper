import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Guard } from './guard';
import { MinesweeperComponent } from './components/minesweeper/minesweeper.component';
import { StartPageComponent } from './components/start-page/start-page.component';

const routes: Routes = [
  {
    path: 'start',
    component: StartPageComponent
  },
  {
    path: 'main',
    component: MinesweeperComponent,
    canActivate: [Guard],
  },
  {
    path: '**',
    redirectTo: 'start'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
