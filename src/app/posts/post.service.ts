import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post [] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

  getPosts() {
    this.http.get<{message: String, posts: any}>(
      'http://localhost:3000/api/posts'
    )
    .pipe(map((postData) => {
      return postData.posts.map(post => {
        return{
          title: post.title,
          content: post.content,
          id: post._id
        };
      });
    }))
    .subscribe( (transformedpostData) => {
        this.posts = transformedpostData;
        this.postsUpdated.next([...this.posts]);
      } );
  }

  getPostsUpdateListner() {
    return this.postsUpdated.asObservable();
  }

  addPosts(title: String, content: String) {
    const post: Post = {id: null, title: title, content: content};
    this.http.post<{message: String, postid: String}>('http://localhost:3000/api/posts', post)
      .subscribe((resposeData) => {
        console.log(resposeData.message);
        const post_with_id: Post = {id: resposeData.postid , title: title, content: content};
        this.posts.push(post_with_id);
        this.postsUpdated.next([...this.posts]);
      });
  }

  deletePost(postID: string) {
    this.http.delete('http://localhost:3000/api/posts/' + postID)
    .subscribe(() => {
      const updatedPosts = this.posts.filter(post => post.id !== postID);
      this.posts = updatedPosts;
      this.postsUpdated.next([...this.posts]);
    });
  }
}
