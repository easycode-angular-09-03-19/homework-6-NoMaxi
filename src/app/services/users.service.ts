import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { User } from '../interfaces/user';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    private apiUrl: string = environment.apiUrl;

    constructor(
        private http: HttpClient
    ) {}

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${this.apiUrl}/users`);
    }

    getUserById(id: string): Observable<User> {
        return this.http.get<User>(`${this.apiUrl}/users/${id}`);
    }

    editUserInfo(user: User): Observable<User>  {
        return this.http.put<User>(`${this.apiUrl}/users/${user.id}`, user);
    }
}
