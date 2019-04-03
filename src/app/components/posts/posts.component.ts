import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
// import { MessageService } from 'primeng/api';

import { PostsService } from '../../services/posts.service';
import { Post } from '../../interfaces/post';

@Component({
    selector: 'app-posts',
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
    currentUserId: string;
    posts: Post[];

    constructor(
        private route: ActivatedRoute,
        private postsService: PostsService,
        private location: Location,
        // private messageService: MessageService
    ) {}

    ngOnInit() {
        this.route.queryParamMap.subscribe((param: ParamMap) => {
            this.currentUserId = param.get('userId');

            this.postsService.getPostsByUserId(this.currentUserId).subscribe((data: Post[]) => {
                this.posts = data;
            });
        });
    }

    onBackClick() {
        // http://qaru.site/questions/16289358/angular-5-which-should-i-use-to-navigate-backward-href-or-locationback
        this.location.back();
    }
}
