import { Component, OnInit} from '@angular/core';
import { Post } from '../post.model';
import { NgForm } from '@angular/forms';
import { PostsService } from '../post.service';

@Component({
  selector: 'app-posts-create',
  templateUrl: './posts-create.component.html',
  styleUrls: ['./posts-create.component.css']
})
export class PostsCreateComponent implements OnInit {
  enteredContent = ' ';
  enteredTitle = '';

  constructor(public postsService: PostsService) { }

  ngOnInit() {

  }

  onAddPosts(postForm: NgForm) {
    if (postForm.invalid) {
      return;
    }
    this.postsService.addPosts(postForm.value.title, postForm.value.content);
    postForm.resetForm();
  }
}
