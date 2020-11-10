import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./page/login/login.module').then( m => m.LoginPageModule),
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./page/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./page/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'work',
    loadChildren: () => import('./page/work/work.module').then( m => m.WorkPageModule)
  },
  {
    path: 'setting',
    loadChildren: () => import('./page/setting/setting.module').then( m => m.SettingPageModule)
  },
  {
    path: 'update',
    loadChildren: () => import('./page/update/update.module').then( m => m.UpdatePageModule)
  },
  {
    path: 'kaizen',
    loadChildren: () => import('./page/kaizen/kaizen.module').then( m => m.KaizenPageModule)
  },
  {
    path: 'schedule',
    loadChildren: () => import('./page/schedule/schedule.module').then( m => m.SchedulePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
