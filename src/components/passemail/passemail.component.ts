import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CompanyService } from '../../services/company.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-passemail',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './passemail.component.html',
  styleUrl: './passemail.component.css'
})
export class PassemailComponent {
  resetForm:FormGroup;
  constructor(private fb:FormBuilder,private router:Router,private companyService:CompanyService){
    this.resetForm=this.fb.group({
      email:['',[Validators.required,Validators.email]],
     
    })
  }
  onSubmit(){
    console.log("out")
    if(this.resetForm.valid)
      console.log("first")
      {
        console.log('Form Value:', this.resetForm.value);
        this.companyService.rPass(this.resetForm.value).subscribe(response=>{
          console.log("data submit",response)
          alert("check your email")
          this.router.navigate(['']);

        })
      }
  }
}
