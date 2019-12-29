export interface ICategoryStore {
    categories: ICategory[],
    parentList: ICategory[],
}

export interface ICategory {
    _id: string;
    title: string;
    parentId?: string | null;
    isDeleted?: string;
}
