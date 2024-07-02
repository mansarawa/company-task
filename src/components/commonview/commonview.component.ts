import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../../services/company.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-commonview',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './commonview.component.html',
  styleUrl: './commonview.component.css'
})
export class CommonviewComponent {
  id: string = "";
  type: string = "";
  item: any = {};
  
  name:string='';
  isDisable=true;
  userUpdate:FormGroup;
  managerUpdate:FormGroup;
  
  manager:any;
  user:any;
  
  constructor(private route: ActivatedRoute,private router:Router,private companyService:CompanyService,private fb:FormBuilder) {
    this.manager = JSON.parse(localStorage.getItem('manager') || '{}');
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    console.log(this.manager)
    console.log(this.user)
    this.managerUpdate = this.fb.group({
      id: [this.manager.id], 
      name: [this.manager.name, Validators.required],
      email: [this.manager.email, [Validators.required, Validators.email]],
      password: [this.manager.password, Validators.required],
      role:[this.manager.role,Validators.required]
    });
  
    this.userUpdate = this.fb.group({
      id: [this.user.id], 
      name: [this.user.name, Validators.required],
      salary: [this.user.salary, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      password: [this.user.password, Validators.required],
      managerId:[this.user.managerId,Validators.required]
    });
  }
  
 
  
  managerSubmit() {
    if (this.managerUpdate.valid) {
      this.companyService.uManager(this.managerUpdate.value).subscribe(
        response => {
          console.log('Form Submitted', response);
          localStorage.setItem('manager',JSON.stringify(response.data))
          console.log("data"+response.data)
          this.router.navigate(['/view']);
          this.managerUpdate.reset();
        },
        error => {
          console.error('Error:', error);
        }
      );
    }
  }

  userSubmit() {
    if (this.userUpdate.valid) {
      this.companyService.uUser(this.userUpdate.value).subscribe(
        response => {
          console.log('Form Submitted', response);
          localStorage.setItem('user',JSON.stringify(response.data))
          console.log(response.data)
          this.router.navigate(['/view']);
          this.userUpdate.reset();
        },
        error => {
          console.error('Error:', error);
        }
      );
    }
  }
  navigateToView(item: any, type: string) {
    localStorage.setItem('selectedItem', JSON.stringify({ item, type }));
    this.router.navigate(['/view'], { queryParams: {  type: type } });
  }
 
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
          const name = params['type'];
        this.name = name !== null ? name : '';
        });
   
    this.managerUpdate.patchValue({
      id: this.manager.id,
      name: this.manager.name,
      email: this.manager.email,
      role: this.manager.role,
      password: this.manager.password,
    });

    this.userUpdate.patchValue({
      id: this.user.id,
      name: this.user.name,
      salary: this.user.salary,
      email: this.user.email,
      password: this.user.password,
      managerId:this.user.managerId
    });
    
  }
  navigateToCompany(){
    this.router.navigate(['company'])
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
