
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private apiUrl = 'http://localhost:1000'; 

  constructor(private http: HttpClient) { }

  createAdmin(adminData: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/createadmin`, adminData, { headers });
  }
  lAdmin(adminData:any):Observable<any>{
    // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/adminlogin`, adminData);
  }
  getAdmins(): Observable<any> {
    // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<any>(`${this.apiUrl}/getadmin`);
  }
  
  uAdmin(user:any):Observable<any>{
    const headers=new HttpHeaders({'Content-Type':'application/json'})
    return this.http.put<any>(`${this.apiUrl}/updateadmin`,user,{headers})
  }
  
  dAdmin(id:any):Observable<any>{
    
    return this.http.delete<any>(`${this.apiUrl}/deleteadmin`,{body:{id:id}})
  }
  getMangers(): Observable<any> {
    // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<any>(`${this.apiUrl}/getmanager`);
  }
  lManager(managerData:any):Observable<any>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/managerlogin`, managerData, { headers });
  }
  createManager(managerData: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/createmanager`, managerData, { headers });
  }
  
  uManager(user:any):Observable<any>{
    const headers=new HttpHeaders({'Content-Type':'application/json'})
    return this.http.put<any>(`${this.apiUrl}/updatemanager`,user,{headers})
  }
  dManager(id:any):Observable<any>{
   
    return this.http.delete<any>(`${this.apiUrl}/deletemanager`,{body:{id:id}})
  }
  createUser(userData: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/createuser`, userData, { headers });
  }
  uUser(user:any):Observable<any>{
    const headers=new HttpHeaders({'Content-Type':'application/json'})
    return this.http.put<any>(`${this.apiUrl}/updateuser`,user,{headers})
  }
  getUsers(): Observable<any> {
    // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<any>(`${this.apiUrl}/getuser`);
  }
  
  dUser(id:any):Observable<any>{
    
    return this.http.delete<any>(`${this.apiUrl}/deleteuser`,{body:{id:id}});
  }
  lUser(userData:any):Observable<any>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/userlogin`, userData, { headers });
  }
  rPass(userData:any):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/sendMail`, userData);
  }
}
