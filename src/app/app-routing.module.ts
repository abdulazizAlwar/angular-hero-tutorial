import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'

import { CharactersComponent } from './characters/characters.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { CharacterDetailsComponent } from './character-details/character-details.component'

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  { path: 'characters', component: CharactersComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: CharacterDetailsComponent },
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
})
export class AppRoutingModule { }
