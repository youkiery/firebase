import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./main/login/login.module').then( m => m.LoginPageModule),
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./main/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./main/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'work',
    loadChildren: () => import('./module/work/work.module').then( m => m.WorkPageModule)
  },
  {
    path: 'setting',
    loadChildren: () => import('./main/setting/setting.module').then( m => m.SettingPageModule)
  },
  {
    path: 'kaizen',
    loadChildren: () => import('./module/kaizen/kaizen.module').then( m => m.KaizenPageModule)
  },
  {
    path: 'schedule',
    loadChildren: () => import('./module/schedule/schedule.module').then( m => m.SchedulePageModule)
  },
  {
    path: 'vaccine',
    loadChildren: () => import('./module/vaccine/vaccine.module').then( m => m.VaccinePageModule)
  },
  {
    path: 'spa',
    loadChildren: () => import('./module/spa/spa.module').then( m => m.SpaPageModule)
  },
  {
    path: 'blood',
    loadChildren: () => import('./module/blood/blood.module').then( m => m.BloodPageModule)
  },
  {
    path: 'usg',
    loadChildren: () => import('./module/usg/usg.module').then( m => m.UsgPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./main/admin/admin.module').then( m => m.AdminPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./module/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'fivemin',
    loadChildren: () => import('./module/fivemin/fivemin.module').then( m => m.FiveminPageModule)
  },
  {
    path: 'gopy',
    loadChildren: () => import('./main/gopy/gopy.module').then( m => m.GopyPageModule)
  },
  {
    path: 'modal/admin',
    loadChildren: () => import('./main/admin/admin/admin.module').then( m => m.AdminPageModule)
  },
  {
    path: 'modal/suggest',
    loadChildren: () => import('./modal/suggest/suggest.module').then( m => m.SuggestPageModule)
  },
  {
    path: 'spa/insert',
    loadChildren: () => import('./module/spa/insert/insert.module').then( m => m.InsertPageModule)
  },
  {
    path: 'vaccine/insert',
    loadChildren: () => import('./module/vaccine/insert/insert.module').then( m => m.InsertPageModule)
  },
  {
    path: 'usg/insert',
    loadChildren: () => import('./module/usg/insert/insert.module').then( m => m.InsertPageModule)
  },
  {
    path: 'blood/insert',
    loadChildren: () => import('./module/blood/insert/insert.module').then( m => m.InsertPageModule)
  },
  {
    path: 'blood/statistic',
    loadChildren: () => import('./module/blood/statistic/statistic.module').then( m => m.StatisticPageModule)
  },
  {
    path: 'blood/in',
    loadChildren: () => import('./module/blood/in/in.module').then( m => m.InPageModule)
  },
  {
    path: 'blood/out',
    loadChildren: () => import('./module/blood/out/out.module').then( m => m.OutPageModule)
  },
  {
    path: 'kaizen/edit',
    loadChildren: () => import('./module/kaizen/edit/edit.module').then( m => m.EditPageModule)
  },
  {
    path: 'kaizen/notify',
    loadChildren: () => import('./module/kaizen/notify/notify.module').then( m => m.NotifyPageModule)
  },
  {
    path: 'kaizen/filter',
    loadChildren: () => import('./module/kaizen/filter/filter.module').then( m => m.FilterPageModule)
  },
  {
    path: 'spa/modal',
    loadChildren: () => import('./module/spa/modal/modal.module').then( m => m.ModalPageModule)
  },
  {
    path: 'usg/filter',
    loadChildren: () => import('./module/usg/filter/filter.module').then( m => m.FilterPageModule)
  },
  {
    path: 'usg/suggest',
    loadChildren: () => import('./module/usg/suggest/suggest.module').then( m => m.SuggestPageModule)
  },
  {
    path: 'vaccine/suggest',
    loadChildren: () => import('./module/vaccine/suggest/suggest.module').then( m => m.SuggestPageModule)
  },
  {
    path: 'vaccine/filter',
    loadChildren: () => import('./module/vaccine/filter/filter.module').then( m => m.FilterPageModule)
  },
  {
    path: 'work/insert',
    loadChildren: () => import('./module/work/insert/insert.module').then( m => m.InsertPageModule)
  },
  {
    path: 'work/edit',
    loadChildren: () => import('./module/work/edit/edit.module').then( m => m.EditPageModule)
  },
  {
    path: 'work/filter',
    loadChildren: () => import('./module/work/filter/filter.module').then( m => m.FilterPageModule)
  },
  {
    path: 'work/notify',
    loadChildren: () => import('./module/work/notify/notify.module').then( m => m.NotifyPageModule)
  },
  {
    path: 'work/detail',
    loadChildren: () => import('./module/work/detail/detail.module').then( m => m.DetailPageModule)
  },
  {
    path: 'work/print',
    loadChildren: () => import('./module/work/print/print.module').then( m => m.PrintPageModule)
  },
  {
    path: 'admin/detail',
    loadChildren: () => import('./main/admin/detail/detail.module').then( m => m.AdminDetailModule)
  },
  {
    path: 'drug/insert',
    loadChildren: () => import('./module/drug/insert/insert.module').then( m => m.InsertPageModule)
  },
  {
    path: 'drug/detail',
    loadChildren: () => import('./module/drug/detail/detail.module').then( m => m.DetailPageModule)
  },
  {
    path: 'fivemin/update',
    loadChildren: () => import('./module/fivemin/update/update.module').then( m => m.UpdatePageModule)
  },
  {
    path: 'fivemin/detail',
    loadChildren: () => import('./module/fivemin/detail/detail.module').then( m => m.DetailPageModule)
  },
  {
    path: 'fivemin/insert',
    loadChildren: () => import('./module/fivemin/insert/insert.module').then( m => m.InsertPageModule)
  },
  {
    path: 'fivemin/preview',
    loadChildren: () => import('./module/fivemin/preview/preview.module').then( m => m.PreviewPageModule)
  },
  {
    path: 'fivemin/statistic',
    loadChildren: () => import('./module/fivemin/statistic/statistic.module').then( m => m.StatisticPageModule)
  },
  {
    path: 'fivemin/image',
    loadChildren: () => import('./module/fivemin/image/image.module').then( m => m.ImagePageModule)
  },
  {
    path: 'fivemin/upload',
    loadChildren: () => import('./module/fivemin/upload/upload.module').then( m => m.UploadPageModule)
  },
  {
    path: 'fivemin/static',
    loadChildren: () => import('./module/fivemin/static/static.module').then( m => m.StaticPageModule)
  },
  {
    path: 'fivemin/rate',
    loadChildren: () => import('./module/fivemin/rate/rate.module').then( m => m.RatePageModule)
  },
  {
    path: 'drug/modal',
    loadChildren: () => import('./module/drug/modal/modal.module').then( m => m.ModalPageModule)
  },
  {
    path: 'modal',
    loadChildren: () => import('./module/drug/modal/modal.module').then( m => m.ModalPageModule)
  },
  {
    path: 'his',
    loadChildren: () => import('./module/his/his.module').then( m => m.HisPageModule)
  },
  {
    path: 'item',
    loadChildren: () => import('./module/item/item.module').then( m => m.ItemPageModule)
  },
  {
    path: 'modal/item',
    loadChildren: () => import('./modal/item/item.module').then( m => m.ItemPageModule)
  },
  {
    path: 'modal/detail',
    loadChildren: () => import('./modal/detail/detail.module').then( m => m.DetailPageModule)
  }



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
