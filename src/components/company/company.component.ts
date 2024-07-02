import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ViewComponent } from '../view/view.component';


@Component({
  selector: 'app-company',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule,CommonModule],
  templateUrl: './company.component.html',
  styleUrl: './company.component.css'
})
export class CompanyComponent  implements OnInit {
  admins:any[]=[];
  managers:any[]=[];
  users:any[]=[];
  user:string="user"
  company:string="company"
  manager:string="manager"
  constructor( private companyService: CompanyService,private router:Router){}

  ngOnInit(): void {
    this.companyService.getAdmins().subscribe(
      data =>{ this.admins = data.admin
        console.log(this.admins)
      },
      error => console.error('Error fetching admins', error)
    );
    this.companyService.getMangers().subscribe(
      data =>{ this.managers = data.manager
        console.log(this.managers)
      },
      error => console.error('Error fetching admins', error)
    );
    this.companyService.getUsers().subscribe(
      data =>{ this.users = data.user
        console.log(this.users)
      },
      error => console.error('Error fetching admins', error)
    );
    
  }

  deleteAdmin(id:any) {
    this.companyService.dAdmin(id).subscribe(
      data => {
        console.log('Admin deleted', data.message);
        this.admins = this.admins.filter(admin => admin.id !== id);
      },
      error => {
        console.error('Error deleting user', error);
      }
    );
  }
  deleteManager(id:any) {
    this.companyService.dManager(id).subscribe(
      data => {
        console.log('User deleted', data);
        this.managers = this.managers.filter(manager => manager.id !== id);
      },
      error => {
        console.error('Error deleting user', error);
      }
    );
  }
  deleteUser(id:any) {
    this.companyService.dUser(id).subscribe(
      data => {
        console.log('User deleted', data.message);
        this.users = this.users.filter(user => user.id !== id);
      },
      error => {
        console.error('Error deleting user', error);
      }
    );
  }
  
  navigateToView(item: any, type: string) {
    localStorage.setItem('selectedItem', JSON.stringify({ item, type }));
    this.router.navigate(['/view'], { queryParams: {  type: type } });
  }
  whoIn(): void {
    if (localStorage.getItem('admin')) {
     localStorage.removeItem('manager');
     localStorage.removeItem('user')
    } else if (localStorage.getItem('manager')) {
      localStorage.removeItem('admin');
      localStorage.removeItem('user')
    } else if (localStorage.getItem('user')) {
      localStorage.removeItem('manager');
      localStorage.removeItem('admin')
    } else {
      // Handle case when none of the items are present
      console.log('No valid user found in localStorage');
    }
  }
}
