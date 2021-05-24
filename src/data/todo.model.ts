export class Todo {

  constructor(
    readonly index: number,
    readonly progress: number,
    readonly title: string,
    readonly content: string,
    readonly author: string,
    readonly datePublished: string,
    readonly views: number,
    readonly imageUrl: string,
  ) {

  }

}

