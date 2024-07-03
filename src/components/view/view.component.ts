import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../../services/company.service';

@Component({
  standalone: true,
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
  imports: [CommonModule, ReactiveFormsModule] // Import CommonModule here
})
export class ViewComponent implements OnInit {
  id: string = "";
  type: string = "";
  item: any = {};
  isDisable = true;
  adminUpdate: FormGroup;
  userUpdate: FormGroup;
  managerUpdate: FormGroup;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private companyService: CompanyService,
    private fb: FormBuilder
  ) {
    this.adminUpdate = this.fb.group({
      id: [this.item.id],
      companyname: [this.item.companyname, Validators.required],
      address: [this.item.address, Validators.required],
      adminname: [this.item.adminname, Validators.required],
      email: [this.item.email, Validators.required],
      password: [this.item.password, Validators.required],
      gst: [this.item.gst, Validators.required],
    });

    this.managerUpdate = this.fb.group({
      id: [this.item.id],
      name: [this.item.name, Validators.required],
      email: [this.item.email, [Validators.required, Validators.email]],
      password: [this.item.password, Validators.required],
      role: [this.item.role, Validators.required]
    });


  this.userUpdate = this.fb.group({
    id: [this.item.id],
    name: [this.item.name, Validators.required],
    salary: [this.item.salary, Validators.required],
    email: [this.item.email, [Validators.required, Validators.email]],
    password: [this.item.password, Validators.required],
    managerName: [this.item.managerName]  
  });



  }

  adminSubmit() {
    if (this.adminUpdate.valid) {
      const formData = this.adminUpdate.value;
      if (!formData.id) {
        formData.id = this.item.id;
      }
      console.log('Admin Update Form Data:', formData); // Log form data
      this.companyService.uAdmin(formData).subscribe(
        response => {
          console.log('Form Submitted', response);
          localStorage.setItem('user', JSON.stringify(response.data));
          console.log(response.data);
          this.router.navigate(['company']);
          this.adminUpdate.reset();
        },
        error => {
          console.error('Error:', error);
        }
      );
    }
  }

  managerSubmit() {
    if (this.managerUpdate.valid) {
      this.companyService.uManager(this.managerUpdate.value).subscribe(
        response => {
          console.log('Form Submitted', response);
          localStorage.setItem('manager', JSON.stringify(response.data));
          console.log("data", response.data);
          this.navigateToCompany();
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
          localStorage.setItem('user', JSON.stringify(response.data));
          console.log(response.data);
          this.navigateToCompany();
          this.userUpdate.reset();
        },
        error => {
          console.error('Error:', error);
        }
      );
    }
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'] || '';
      this.type = params['type'] || '';
      
      try {
        const storedData = JSON.parse(localStorage.getItem('selectedItem') || '{}');
        this.item = storedData.item || {};
      } catch (error) {
        console.error('Error parsing JSON from localStorage:', error);
        this.item = {}; // Default value if parsing fails
      }

      console.log(this.item);

     
      this.adminUpdate.patchValue(this.item);
      this.managerUpdate.patchValue(this.item);
      this.userUpdate.patchValue(this.item);
      
    });
  }

  navigateToCompany() {

    localStorage.clear();
    alert("Please Login again")
    this.router.navigate([''])
   
  }
}
