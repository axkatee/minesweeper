import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartPageComponent } from '@component/start-page/start-page.component';
import { MinesweeperComponent } from '@component/minesweeper/minesweeper.component';
import { Guard } from '@guard';

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
