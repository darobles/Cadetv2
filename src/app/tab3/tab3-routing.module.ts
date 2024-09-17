import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab3Page } from './tab3.page';
import { ConnectionComponent } from '../components/connection/connection.component';

const routes: Routes = [
  {
    path: 'config',
    component: Tab3Page,
    children: [
      {
        path: 'connection',
        loadChildren: () => import('../components/connection/connection.module').then(m => m.ConnectionModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab3PageRoutingModule {}
