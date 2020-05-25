import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './Services/authguard.service';


const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate:[AuthGuardService]
  },
  {
    path: 'post/:id',
   loadChildren: () => import('./Pages/post/post.module').then( m => m.PostPageModule),
   canActivate:[AuthGuardService]
  },
  {path:'login',
  loadChildren: () => import('./Pages/login/login.module').then( m => m.LoginPageModule)
  },
  {path:'logout',
  loadChildren: () => import('./Pages/logout/logout.module').then( m => m.LogoutPageModule),
  canActivate:[AuthGuardService]
  },
  {path:'search',
  loadChildren: () => import('./Pages/search/search.module').then( m => m.SearchPageModule),
  canActivate:[AuthGuardService]
  },
  
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'user',
    loadChildren: () => import('./Pages/user/user.module').then( m => m.UserPageModule)
  },
  {
    path: 'portfolio/:id',
    loadChildren: () => import('./Pages/portfolio/portfolio.module').then( m => m.PortfolioPageModule),
    canActivate:[AuthGuardService]
  }


  



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
