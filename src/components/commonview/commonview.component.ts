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
  
  manager:any;
  user:any;
  result:any[]=[];
  
  constructor(private route: ActivatedRoute,private router:Router,private companyService:CompanyService,private fb:FormBuilder) {
    this.manager = JSON.parse(localStorage.getItem('manager') || '{}');
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    

  
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
        
    this.companyService.getUsers().subscribe(
      data => {
        this.result = data.user;
        console.log('Fetched users:', this.result);
      },
      error => console.error('Error fetching admins', error)
    );
  
   
    
  }
  navigateToCompany(){
    localStorage.clear();
    this.router.navigate([''])
  }
  
}
