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
  },
  {
    path: 'vaccine',
    loadChildren: () => import('./page/vaccine/vaccine.module').then( m => m.VaccinePageModule)
  },
  {
    path: 'spa',
    loadChildren: () => import('./page/spa/spa.module').then( m => m.SpaPageModule)
  },
  {
    path: 'expire',
    loadChildren: () => import('./page/expire/expire.module').then( m => m.ExpirePageModule)
  },
  {
    path: 'ride',
    loadChildren: () => import('./page/ride/ride.module').then( m => m.RidePageModule)
  },
  {
    path: 'blood',
    loadChildren: () => import('./page/blood/blood.module').then( m => m.BloodPageModule)
  },
  {
    path: 'usg',
    loadChildren: () => import('./page/usg/usg.module').then( m => m.UsgPageModule)
  },
  {
    path: 'drug',
    loadChildren: () => import('./drug/drug.module').then( m => m.DrugPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then( m => m.AdminPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },  {
    path: 'fivemin',
    loadChildren: () => import('./fivemin/fivemin.module').then( m => m.FiveminPageModule)
  },
  {
    path: 'kaimin',
    loadChildren: () => import('./page/kaimin/kaimin.module').then( m => m.KaiminPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
