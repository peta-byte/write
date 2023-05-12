import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { WriteContentComponent } from './write/write-content.component';

const routes: Routes = [
  {
    path: 'write',
    component: WriteContentComponent,
    title: 'Write'
  },
  {
    path: '',
    redirectTo: 'write',
    pathMatch: 'full',
    title: ''
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
