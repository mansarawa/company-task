import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { RegisterComponent } from '../components/register/register.component';
import { LoginComponent } from '../components/login/login.component';

import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CompanyComponent } from '../components/company/company.component';
import { ViewComponent } from '../components/view/view.component';
import { CommonviewComponent } from '../components/commonview/commonview.component';
import { PassemailComponent } from '../components/passemail/passemail.component';


export const routes: Routes = [
    {path:'',component:HomeComponent,pathMatch:"full"},
    {path:'register',component:RegisterComponent,pathMatch:"full"},
    {path:'login',component:LoginComponent,pathMatch:"full"},
    {path:'forgetpassword',component:PassemailComponent,pathMatch:"full"},
    {path:'company',component:CompanyComponent,pathMatch:"full"},
    {path:'view',component:ViewComponent,pathMatch:"full"},
    {path:'commonview',component:CommonviewComponent,pathMatch:"full"}
];
