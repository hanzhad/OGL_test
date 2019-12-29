import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {RouteComponentProps} from 'react-router';
import {Dispatch} from 'redux';
import * as actions from '../../store/actions';
import {IStores} from '../../store/reducers';
import {IArticle} from '../../store/reducers/articleReducer';
import {ICategory} from '../../store/reducers/categoryReducer';
import ItemPageBase from '../ItemPageBase';
import FormModal, {IField} from '../ui/FormModal';


interface IProps extends RouteComponentProps<any> {
    categoriesParentList: ICategory[];
    article: IArticle;
    getArticle: (id: IArticle['_id']) => any;
    deleteArticle: (id: IArticle['_id']) => any;
    updateArticle: (id: IArticle) => any;
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


class ArticlePage extends Component<IProps, IState> {
    public state = {
        modalData: {
            isActive: false,
        }
    };

    public async componentDidMount() {
        const {getArticle, match} = this.props;
        const articleId = _.get(match, 'params.id');

        if (articleId) {
            await getArticle(articleId);
        }
    }

    public async componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any) {
        const {getCategoriesParentList, getArticle, article, match, categoriesParentList} = this.props;
        const currentId = _.get(match, 'params.id');
        const prevId = _.get(prevProps, 'match.params.id');
        const prevCategoriesParentList = _.get(prevProps, 'categoriesParentList');

        if (prevId !== currentId) {
            await getArticle(currentId);
        }

        const categoryId = _.get(article, 'categoryId');
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
        const {updateArticle, article} = this.props;
        this.setModalData({
            isActive: true,
            onClose: () => this.setModalData({isActive: false}),
            onSave: updateArticle,
            header: 'Edit',
            data: article,
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
        })
    };

    public onDeleteClick = () => {
        const {article, deleteArticle, history} = this.props;
        deleteArticle(_.get(article, '_id'));
        history.push(`/category/`);
    };

    public render() {
        const {article} = this.props;
        const {modalData} = this.state;
        return (
           <>
               <FormModal {...modalData} />
               <ItemPageBase
                   pageHeader="Article Page"
                   onDeleteClick={this.onDeleteClick}
                   onEditClick={this.onEditClick}
                   rows={[
                       {
                           key: 'title',
                           title: 'Title',
                           value: _.get(article, 'title'),
                       },
                       {
                           key: 'description',
                           title: 'Description',
                           multiline: true,
                           value: _.get(article, 'description'),
                       },
                       {
                           key: 'text',
                           multiline: true,
                           value: _.get(article, 'text'),
                       },
                   ]}
               /></>
        )
    }
}

const mapStateToProps = (store: IStores) => ({
    article: store.articleStore.article,
    categoriesParentList: store.categoryStore.parentList,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    getArticle: (id: IArticle['_id']) => dispatch(actions.getArticleByIdAction(id)),
    deleteArticle: (id: IArticle['_id']) => dispatch(actions.deleteArticleAction(id)),
    updateArticle: (body: IArticle) => dispatch(actions.updateArticleAction(body)),
    getCategoriesParentList: (id: ICategory['_id']) => dispatch(actions.getCategoryParentListAction(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticlePage);
