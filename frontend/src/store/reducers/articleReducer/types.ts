export interface IArticleStore {
    articles: IArticle[],
    article?: IArticle,
}

export interface IArticle {
    _id: string;
    title: string;
    description: string;
    text: string;
    categoryId: string | null;
    isDeleted?: string;
}