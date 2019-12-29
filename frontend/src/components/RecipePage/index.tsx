import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {RouteComponentProps} from 'react-router';
import {Dispatch} from 'redux';
import * as actions from '../../store/actions';
import {IStores} from '../../store/reducers';
import {ICategory} from '../../store/reducers/categoryReducer';
import {IRecipe} from '../../store/reducers/recipeReducer';
import ItemPageBase from '../ItemPageBase';
import FormModal, {IField} from '../ui/FormModal';


interface IProps extends RouteComponentProps<any> {
    categoriesParentList: ICategory[];
    recipe: IRecipe;
    getRecipe: (id: IRecipe['_id']) => any;
    deleteRecipe: (id: IRecipe['_id']) => any;
    updateRecipe: (id: IRecipe) => any;
    getCategoriesParentList: (id: ICategory['_id']) => any;
}

interface IState {
    modalData: {
        isActive: boolean;
        onSave?: (data?: any) => any;
        onClose?: () => any;
        header?: string;
        data?: any;
        fields?: IField[];
    }
}


class RecipePage extends Component<IProps, IState> {
    public state = {
        modalData: {
            isActive: false,
        }
    };

    public async componentDidMount() {
        const {getRecipe, match} = this.props;
        const recipeId = _.get(match, 'params.id');

        if (recipeId) {
            await getRecipe(recipeId);
        }
    }

    public async componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any) {
        const {getCategoriesParentList, getRecipe, recipe, match, categoriesParentList} = this.props;
        const currentId = _.get(match, 'params.id');
        const prevId = _.get(prevProps, 'match.params.id');
        const prevCategoriesParentList = _.get(prevProps, 'categoriesParentList');

        if (prevId !== currentId) {
            await getRecipe(currentId);
        }

        const categoryId = _.get(recipe, 'categoryId');
        const isSaveCategoryParentList = _.isEmpty(_.xorBy(categoriesParentList, prevCategoriesParentList, '_id'));
        if (categoryId && (_.isEmpty(categoriesParentList) || !isSaveCategoryParentList)) {
            await getCategoriesParentList(categoryId);
        }
    }

    public setModalData = (data: IState['modalData']) => {
        this.setState((state) => ({...state, modalData: data}))
    };

    public onModalFormFieldChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {modalData} = this.state;
        const name = _.get(event, 'target.name');
        const value = _.get(event, 'target.value');

        this.setModalData({
            ...modalData, data: {
                ..._.get(modalData, 'data'),
                [name]: value
            }
        })
    };

    public onEditClick = () => {
        const {updateRecipe, recipe} = this.props;
        this.setModalData({
            isActive: true,
            onClose: () => this.setModalData({isActive: false}),
            onSave: updateRecipe,
            header: 'Edit',
            data: recipe,
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
        })
    };

    public onDeleteClick = () => {
        const {recipe, deleteRecipe, history} = this.props;
        deleteRecipe(_.get(recipe, '_id'));
        history.push(`/category/`);
    };

    public render() {
        const {recipe} = this.props;
        const {modalData} = this.state;
        return (
           <>
               <FormModal {...modalData} />
               <ItemPageBase
                   pageHeader="Recipe Page"
                   onDeleteClick={this.onDeleteClick}
                   onEditClick={this.onEditClick}
                   rows={[
                       {
                           key: 'title',
                           title: 'Title',
                           value: _.get(recipe, 'title'),
                       },
                       {
                           key: 'text',
                           multiline: true,
                           value: _.get(recipe, 'text'),
                       },
                   ]}
               /></>
        )
    }
}

const mapStateToProps = (store: IStores) => ({
    recipe: store.recipeStore.recipe,
    categoriesParentList: store.categoryStore.parentList,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    getRecipe: (id: IRecipe['_id']) => dispatch(actions.getRecipeByIdAction(id)),
    deleteRecipe: (id: IRecipe['_id']) => dispatch(actions.deleteRecipeAction(id)),
    updateRecipe: (body: IRecipe) => dispatch(actions.updateRecipeAction(body)),
    getCategoriesParentList: (id: ICategory['_id']) => dispatch(actions.getCategoryParentListAction(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipePage);
