import {Container} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import {Theme, withStyles} from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
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
import FormModal, {IField} from '../ui/FormModal';
import PageColumn from './PageColumn';

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

interface IProps extends RouteComponentProps<any> {
    categories: ICategory[];
    articles: IArticle[];
    recipes: IRecipe[];
    classes: any;
    getArticles: (id: ICategory['_id']) => any;
    getAllArticles: () => any;
    createArticle: (data: IArticle) => any;
    getRecipes: (id: ICategory['_id']) => any;
    getAllRecipes: () => any;
    createRecipe: (body: IRecipe) => any;
}

interface IState {
    activeTabId: number;
    modalData: {
        isActive: boolean;
        onSave?: (data?: any) => any;
        onClose?: () => any;
        header?: string;
        data?: any;
        fields?: IField[];
    }
}

class CategoryPage extends Component<IProps> {
    public state = {
        activeTabId: 0,
        modalData: {
            isActive: false,
        }
    };

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

    public setModalData = (data: IState['modalData']) => {
        this.setState((state) => ({...state, modalData: data}))
    };

    public onModalFormFieldChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {modalData} = this.state;
        const name = _.get(event, 'target.name');
        const value =  _.get(event, 'target.value');

        this.setModalData({
            ...modalData, data: {
                ..._.get(modalData, 'data'),
                [name]: value
            }
        })
    };

    public renderArticleColumn = () => {
        const {match, articles, history, createArticle} = this.props;
        const currentCategoryId = _.get(match, 'params.id');

        return (
            <PageColumn
                header='Articles'
                fields={articles}
                onDetailsClick={(item) => history.push(`/article/${_.get(item, '_id')}`)}
                actionButton={{
                    disabled: _.isNil(currentCategoryId),
                    onClick: () => this.setModalData({
                        isActive: true,
                        onClose: () => this.setModalData({isActive: false}),
                        onSave: createArticle,
                        header: 'Create new Article',
                        data: {
                            title: 'name',
                            categoryId: currentCategoryId,
                        },
                        fields: [
                            {
                                id: 'title',
                                label: 'Article Name',
                                autoFocus: true,
                                onChange: this.onModalFormFieldChange,
                            },
                            {
                                id: 'description',
                                label: 'Description',
                                onChange: this.onModalFormFieldChange,
                            },
                            {
                                id: 'text',
                                label: 'Text',
                                multiline: true,
                                onChange: this.onModalFormFieldChange,
                            },
                        ],
                    }),
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
        )
    };

    public renderRecipeColumn = () => {
        const {match, recipes, history, createRecipe} = this.props;
        const currentCategoryId = _.get(match, 'params.id');

        return (
            <PageColumn
                header='Recipes'
                fields={recipes}
                onDetailsClick={(item) => history.push(`/recipe/${_.get(item, '_id')}`)}
                actionButton={{
                    disabled: _.isNil(currentCategoryId),
                    onClick: () => this.setModalData({
                        isActive: true,
                        onClose: () => this.setModalData({isActive: false}),
                        onSave: createRecipe,
                        header: 'Create new Recipe',
                        data: {
                            title: 'name',
                            categoryId: currentCategoryId,
                        },
                        fields: [
                            {
                                id: 'title',
                                label: 'Recipe Name',
                                autoFocus: true,
                                onChange: this.onModalFormFieldChange,
                            },
                            {
                                id: 'text',
                                label: 'Text',
                                multiline: true,
                                onChange: this.onModalFormFieldChange,
                            },
                        ],
                    }),
                }}
                fieldsMap={ [
                    {
                        key: 'title',
                        name: 'Title',
                    },
                ]}
            />
        )
    };

    public handleChangeActiveTab = (event: React.ChangeEvent<{}>, newValue: number) => {
        this.setState({activeTabId: newValue});
    };

    public render = () => {
        const {match, categories, classes } = this.props;
        const { modalData, activeTabId } = this.state;
        const currentCategoryId = _.get(match, 'params.id');
        const currentCategory = _.find(categories, ['_id', currentCategoryId]);

        return (
            <Container className={classes.container}>
                <FormModal {...modalData} />
                <Typography variant='h4'>{_.get(currentCategory, 'title', 'All Categories')}</Typography>
                <Divider />
                <CollapsedBreadcrumbs
                    className={classes.container}
                />
                <Tabs variant="fullWidth" value={activeTabId} centered={true} onChange={this.handleChangeActiveTab}>
                    <Tab label='Articles'/>
                    <Tab label='Recipes'/>
                </Tabs>
                {activeTabId === 0 && this.renderArticleColumn()}
                {activeTabId === 1 &&this.renderRecipeColumn()}
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
    createRecipe: (body: IRecipe) => dispatch(actions.createRecipeAction(body)),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(CategoryPage));
