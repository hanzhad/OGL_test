export interface IRecipeStore {
    recipes: IRecipe[];
    recipe?: IRecipe;
}

export interface IRecipe {
    _id: string;
    title: string;
    text: string;
    categoryId: string | null;
    isDeleted?: string;
}
