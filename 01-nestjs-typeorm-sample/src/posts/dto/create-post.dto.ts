export class CreatePostDto {
  readonly title: string;
  readonly content: string;
  readonly author_id: number;
}

export class CreatePostOutput {
  readonly message: string;
}
