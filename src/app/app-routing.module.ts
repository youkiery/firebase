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
  },
  {
    path: 'fivemin',
    loadChildren: () => import('./fivemin/fivemin.module').then( m => m.FiveminPageModule)
  },
  {
    path: 'kaimin',
    loadChildren: () => import('./page/kaimin/kaimin.module').then( m => m.KaiminPageModule)
  },
  {
    path: 'gopy',
    loadChildren: () => import('./gopy/gopy.module').then( m => m.GopyPageModule)
  },
  {
    path: 'modal/admin',
    loadChildren: () => import('./modal/admin/admin.module').then( m => m.AdminPageModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.module').then( m => m.CartPageModule)
  },
  {
    path: 'modal/suggest',
    loadChildren: () => import('./modal/suggest/suggest.module').then( m => m.SuggestPageModule)
  },
  {
    path: 'spa/insert',
    loadChildren: () => import('./page/spa/insert/insert.module').then( m => m.InsertPageModule)
  },
  {
    path: 'vaccine/insert',
    loadChildren: () => import('./page/vaccine/insert/insert.module').then( m => m.InsertPageModule)
  },
  {
    path: 'expire/insert',
    loadChildren: () => import('./page/expire/insert/insert.module').then( m => m.InsertPageModule)
  },
  {
    path: 'usg/insert',
    loadChildren: () => import('./page/usg/insert/insert.module').then( m => m.InsertPageModule)
  },
  {
    path: 'blood/insert',
    loadChildren: () => import('./page/blood/insert/insert.module').then( m => m.InsertPageModule)
  },
  {
    path: 'blood/statistic',
    loadChildren: () => import('./page/blood/statistic/statistic.module').then( m => m.StatisticPageModule)
  },
  {
    path: 'blood/in',
    loadChildren: () => import('./page/blood/in/in.module').then( m => m.InPageModule)
  },
  {
    path: 'blood/out',
    loadChildren: () => import('./page/blood/out/out.module').then( m => m.OutPageModule)
  },
  {
    path: 'expire/suggest',
    loadChildren: () => import('./page/expire/suggest/suggest.module').then( m => m.SuggestPageModule)
  },
  {
    path: 'expire/insert-item',
    loadChildren: () => import('./page/expire/insert-item/insert-item.module').then( m => m.InsertItemPageModule)
  },
  {
    path: 'kaizen/edit',
    loadChildren: () => import('./page/kaizen/edit/edit.module').then( m => m.EditPageModule)
  },
  {
    path: 'kaizen/notify',
    loadChildren: () => import('./page/kaizen/notify/notify.module').then( m => m.NotifyPageModule)
  },
  {
    path: 'kaizen/filter',
    loadChildren: () => import('./page/kaizen/filter/filter.module').then( m => m.FilterPageModule)
  },
  {
    path: 'spa/modal',
    loadChildren: () => import('./page/spa/modal/modal.module').then( m => m.ModalPageModule)
  },
  {
    path: 'usg/filter',
    loadChildren: () => import('./page/usg/filter/filter.module').then( m => m.FilterPageModule)
  },
  {
    path: 'usg/suggest',
    loadChildren: () => import('./page/usg/suggest/suggest.module').then( m => m.SuggestPageModule)
  },
  {
    path: 'vaccine/suggest',
    loadChildren: () => import('./page/vaccine/suggest/suggest.module').then( m => m.SuggestPageModule)
  },
  {
    path: 'vaccine/filter',
    loadChildren: () => import('./page/vaccine/filter/filter.module').then( m => m.FilterPageModule)
  },
  {
    path: 'work/insert',
    loadChildren: () => import('./page/work/insert/insert.module').then( m => m.InsertPageModule)
  },
  {
    path: 'work/edit',
    loadChildren: () => import('./page/work/edit/edit.module').then( m => m.EditPageModule)
  },
  {
    path: 'work/filter',
    loadChildren: () => import('./page/work/filter/filter.module').then( m => m.FilterPageModule)
  },
  {
    path: 'work/notify',
    loadChildren: () => import('./page/work/notify/notify.module').then( m => m.NotifyPageModule)
  },
  {
    path: 'work/detail',
    loadChildren: () => import('./page/work/detail/detail.module').then( m => m.DetailPageModule)
  },
  {
    path: 'work/print',
    loadChildren: () => import('./page/work/print/print.module').then( m => m.PrintPageModule)
  },
  {
    path: 'admin/detail',
    loadChildren: () => import('./admin/detail/detail.module').then( m => m.AdminDetailModule)
  },
  {
    path: 'drug/insert',
    loadChildren: () => import('./drug/insert/insert.module').then( m => m.InsertPageModule)
  },
  {
    path: 'drug/detail',
    loadChildren: () => import('./drug/detail/detail.module').then( m => m.DetailPageModule)
  },
  {
    path: 'fivemin/update',
    loadChildren: () => import('./fivemin/update/update.module').then( m => m.UpdatePageModule)
  },
  {
    path: 'fivemin/detail',
    loadChildren: () => import('./fivemin/detail/detail.module').then( m => m.DetailPageModule)
  },
  {
    path: 'fivemin/insert',
    loadChildren: () => import('./fivemin/insert/insert.module').then( m => m.InsertPageModule)
  },
  {
    path: 'fivemin/preview',
    loadChildren: () => import('./fivemin/preview/preview.module').then( m => m.PreviewPageModule)
  },
  {
    path: 'fivemin/statistic',
    loadChildren: () => import('./fivemin/statistic/statistic.module').then( m => m.StatisticPageModule)
  },
  {
    path: 'fivemin/image',
    loadChildren: () => import('./fivemin/image/image.module').then( m => m.ImagePageModule)
  },
  {
    path: 'fivemin/upload',
    loadChildren: () => import('./fivemin/upload/upload.module').then( m => m.UploadPageModule)
  },
  {
    path: 'fivemin/static',
    loadChildren: () => import('./fivemin/static/static.module').then( m => m.StaticPageModule)
  },
  {
    path: 'fivemin/rate',
    loadChildren: () => import('./fivemin/rate/rate.module').then( m => m.RatePageModule)
  },
  {
    path: 'drug/modal',
    loadChildren: () => import('./drug/modal/modal.module').then( m => m.ModalPageModule)
  },  {
    path: 'modal',
    loadChildren: () => import('./page/drug/modal/modal.module').then( m => m.ModalPageModule)
  },
  {
    path: 'his',
    loadChildren: () => import('./page/his/his.module').then( m => m.HisPageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
