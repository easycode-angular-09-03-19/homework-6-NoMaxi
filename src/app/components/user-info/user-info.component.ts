import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MessageService } from 'primeng/api';

import { UsersService } from '../../services/users.service';
import { User } from '../../interfaces/user';

@Component({
    selector: 'app-user-info',
    templateUrl: './user-info.component.html',
    styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
    user: User;
    isBeingEdited = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private location: Location,
        private userService: UsersService,
        private messageService: MessageService
    ) {}

    ngOnInit() {
        const id = this.route.snapshot.params['id'];
        this.userService.getUserById(id).subscribe((data: User) => {
            this.user = data;
        }, (err) => {
            console.log(err);
            this.messageService.add({
                severity: 'error',
                summary: 'Error notification',
                detail: err.message,
                key: 'error'
            });
        });
    }

    onEditUserInfoClick() {
        this.isBeingEdited = true;
    }

    onFormSubmit() {
        this.isBeingEdited = false;
        this.userService.editUserInfo(this.user).subscribe((data: User) => {
            this.messageService.add({
                severity: 'success',
                summary: 'Success notification',
                detail: `User with id ${this.user.id} info has been successfully edited`,
                key: 'success'
            });
            setTimeout(() => {
                this.router.navigate(['']);
            }, 2000);
        }, (err) => {
            console.log(err);
            this.messageService.add({
                severity: 'error',
                summary: 'Error notification',
                detail: err.message,
                key: 'error'
            });
        });
    }

    onBackClick() {
        // http://qaru.site/questions/16289358/angular-5-which-should-i-use-to-navigate-backward-href-or-locationback
        this.location.back();
    }
}
