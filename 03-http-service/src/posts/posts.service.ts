import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { forkJoin, from, map, Observable, switchMap, toArray } from 'rxjs';

@Injectable()
export class PostsService {
  constructor(private readonly http: HttpService) {}

  /**
   * 각 게시물 번호에 맞는 게시물들을 가져온다.
   * @returns {Observable<string[]>} 게시물 목록
   */
  getPosts(): Observable<string[]> {
    return from([1, 2, 3, 4, 5]).pipe(
      map((postId) => this.getPost(postId)),
      toArray(),
      switchMap((requests) => forkJoin(requests)),
      map((responses) => responses.map((response) => response.data)),
    );
  }

  /**
   * 게시물 번호에 맞는 게시물을 가져온다.
   * @param postId 게시물 번호
   * @returns {Observable<AxiosResponse<string>>} 게시물 내용
   */
  getPost(postId: number): Observable<AxiosResponse<string>> {
    return this.http.get<string>(`http://localhost:3000/posts/${postId}`, {
      params: { postId },
    });
  }
}
