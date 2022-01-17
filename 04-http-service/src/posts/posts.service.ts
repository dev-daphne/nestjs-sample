import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse, AxiosError } from 'axios';
import { catchError, forkJoin, lastValueFrom, map, Observable, of } from 'rxjs';

@Injectable()
export class PostsService {
  constructor(private readonly http: HttpService) {}

  getPosts() {
    return this.test(0).pipe(map((res) => res.data));
  }

  public test(num: number): Observable<AxiosResponse<string>> {
    return this.http.get<string>('http://localhost:3000/posts/test', {
      params: { num },
    });
  }
}
