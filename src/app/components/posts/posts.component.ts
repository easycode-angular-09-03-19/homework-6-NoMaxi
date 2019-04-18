import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Location } from '@angular/common';

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
        private router: Router,
        private postsService: PostsService,
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
        this.router.navigate(['/']);
    }
}
