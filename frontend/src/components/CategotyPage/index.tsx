import {Container} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import {Theme, withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {RouteComponentProps} from 'react-router';
import {Dispatch} from 'redux';
import * as actions from '../../store/actions';
import {IStores} from '../../store/reducers';
import {IArticle} from '../../store/reducers/articleReducer';
import {ICategory} from '../../store/reducers/categoryReducer';
import {IRecipe} from '../../store/reducers/recipeReducer';
import CollapsedBreadcrumbs from '../ui/CollapsedBreadcrumbs';
import PageColumn from './PageColumn';

interface IProps extends RouteComponentProps<any> {
    categories: ICategory[];
    articles: IArticle[];
    recipes: IRecipe[];
    classes: any;
    getArticles: (id: ICategory['_id']) => any;
    getAllArticles: () => any;
    getRecipes: (id: ICategory['_id']) => any;
    getAllRecipes: () => any;
}

const styles = (theme: Theme) => ({
    container: {
        margin: theme.spacing(1, 0),
    },
    content: {
        display: 'flex',
    },
    block: {
        flex: 1,
        padding: theme.spacing(1),
    },
    card: {
        margin: theme.spacing(2, 0),
    },
    cardHeader: {
        display: 'flex',
        alignItems: 'flex-end',
        margin: theme.spacing(1)
    },
});

class CategoryPage extends Component<IProps> {

    public async componentDidMount() {
        const {match, getArticles, getAllArticles, getRecipes, getAllRecipes} = this.props;
        const currentCategoryId = _.get(match, 'params.id');
        if (currentCategoryId) {
            await getArticles(currentCategoryId);
            await getRecipes(currentCategoryId);
        } else {
            await getAllArticles();
            await getAllRecipes();
        }

    }

    public async componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<{}>, snapshot?: any) {
        const {match, getArticles, getAllArticles, getRecipes, getAllRecipes} = this.props;
        const currentCategoryId = _.get(match, 'params.id');
        const prevCategoryId = _.get(prevProps, 'match.params.id');
        if (prevCategoryId !== currentCategoryId) {
            if (currentCategoryId) {
                await getArticles(currentCategoryId);
                await getRecipes(currentCategoryId);
            } else {
                await getAllArticles();
                await getAllRecipes();
            }
        }
    }

    public render = () => {
        const {match, history, location, staticContext, categories, classes, articles, recipes} = this.props;
        const currentCategoryId = _.get(match, 'params.id');
        const currentCategory = _.find(categories, ['_id', currentCategoryId]);

        return (
            <Container className={classes.container}>
                <Typography variant='h4'>{_.get(currentCategory, 'title', 'All Categories')}</Typography>
                <Divider />
                <CollapsedBreadcrumbs
                    className={classes.container}
                    match={match}
                    history={history}
                    location={location}
                    staticContext={staticContext}
                />
                <div className={classes.content}>
                    <PageColumn
                        header='Articles'
                        fields={articles}
                        actionButton={{
                            disabled: _.isNil(currentCategoryId),
                            onClick: _.noop,
                        }}
                        fieldsMap={[
                            {
                                key: 'title',
                                name: 'Title',
                            },
                            {
                                key: 'description',
                                name: 'Description',
                            },
                        ]}
                    />
                    <PageColumn
                        header='Recipes'
                        fields={recipes}
                        actionButton={{
                            disabled: _.isNil(currentCategoryId),
                            onClick: _.noop,
                        }}
                        fieldsMap={ [
                            {
                                key: 'title',
                                name: 'Title',
                            },
                        ]}
                    />
                </div>
            </Container>
        )
    }
}

const mapStateToProps = (store: IStores) => ({
    articles: store.articleStore.articles,
    recipes: store.recipeStore.recipes,
    categories: store.categoryStore.categories,
    categoriesParentList: store.categoryStore.parentList,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    getArticles: (id: ICategory['_id']) => dispatch(actions.getArticleByCategoryIdAction(id)),
    getAllArticles: () => dispatch(actions.getArticleAction()),
    createArticle: (body: IArticle) => dispatch(actions.createArticleAction(body)),
    deleteArticle: (id: IArticle['_id']) => dispatch(actions.deleteArticleAction(id)),

    getAllRecipes: () => dispatch(actions.getRecipeAction()),
    getRecipes: (id: ICategory['_id']) => dispatch(actions.getRecipeByCategoryIdAction(id)),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(CategoryPage));
