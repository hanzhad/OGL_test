import List from '@material-ui/core/List';
import {Label} from '@material-ui/icons';
import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {RouteComponentProps} from 'react-router-dom';
import {Dispatch} from 'redux';
import * as actions from '../../store/actions';
import {IStores} from '../../store/reducers';
import {ICategory} from '../../store/reducers/categoryReducer';
import StyledTreeView from '../StyledTreeView';
import StyledTreeItem from '../StyledTreeView/StyledTreeItem';
import FormModal, {IField} from '../ui/FormModal';
import StyledDrawer from './StyledDrawer';

interface IProps extends RouteComponentProps<any> {
    getCategories: () => any;
    createCategory: () => any;
    deleteCategory: () => any;
    updateCategory: () => any;
    getCategoriesParentList: (id: ICategory['_id']) => any;
    categories: [ICategory];
    categoriesParentList: [ICategory];
}

interface IState {
    nodeIds: string[];
    modalData: {
        isActive: boolean;
        onSave?: (data?: any) => any;
        onClose?: () => any;
        header?: string;
        data?: any;
        fields?: IField[];
    }
}

class OGLDrawer extends Component<IProps, IState> {
    public state = {
        nodeIds: [],
        modalData: {
            isActive: false,
        }
    };

    private rootCategoryName = 'root';

    public async componentDidMount() {
        const {getCategories, getCategoriesParentList, match} = this.props;
        await getCategories();
        const categoryId = _.get(match, 'params.id');
        
        if (categoryId) {
            await getCategoriesParentList(categoryId)
        }

    }

    public async componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any) {
        const {getCategoriesParentList, match} = this.props;
        const currentId = _.get(match, 'params.id');
        if (currentId) {
            const prevId = _.get(prevProps, 'match.params.id');
            if (prevId !== currentId) {
                await getCategoriesParentList(currentId);
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

    public getOpenCategories = () => {
        const { nodeIds } = this.state;
        const { categoriesParentList } = this.props;

        let categoriesIds = [this.rootCategoryName];

        if (_.isEmpty(nodeIds)) {
            categoriesIds = _.concat(categoriesIds, _.map(categoriesParentList, '_id'))
        } else {
            categoriesIds = _.concat(categoriesIds, nodeIds)
        }

        return categoriesIds;
    };

    public renderCategoryChildren = (category: ICategory) => {
        const {categories, createCategory, deleteCategory, updateCategory} = this.props;
        const rowId = _.get(category, '_id');
        const id = rowId === this.rootCategoryName ? null : rowId;
        const children = _.filter(categories, ['parentId', id]);
        return (
            <StyledTreeItem
                key={rowId}
                nodeId={rowId}
                labelText={_.get(category, 'title')}
                labelIcon={Label}
                menuItems={[
                    {
                        id: 'open',
                        label: 'Open category page',
                        onClick: () => this.props.history.push(`/category/${id || ''}`),
                    },
                    {
                        id: 'Create',
                        label: 'Create new categoty',
                        onClick: () => this.setModalData({
                            isActive: true,
                            onClose: () => this.setModalData({isActive: false}),
                            onSave: createCategory,
                            header: 'Create new category',
                            data: {
                                title: 'new category',
                                parentId: id,
                            },
                            fields: [
                                {
                                    id: 'title',
                                    autoFocus: true,
                                    label: 'Category Name',
                                    onChange: this.onModalFormFieldChange,
                                },
                            ],
                        }),
                    },
                    {
                        disabled: rowId === this.rootCategoryName,
                        id: 'Update category',
                        label: 'Update',
                        onClick: () => this.setModalData({
                            isActive: true,
                            onClose: () => this.setModalData({isActive: false}),
                            onSave: updateCategory,
                            header: 'Edit Category',
                            data: {
                                _id: id,
                                title: _.get(category, 'title'),
                            },
                            fields: [
                                {
                                    id: 'title',
                                    autoFocus: true,
                                    label: 'Category Name',
                                    onChange: this.onModalFormFieldChange,
                                },
                            ]
                        }),
                    },
                    {
                        data: id,
                        disabled: rowId === this.rootCategoryName,
                        id: 'Delete',
                        label: 'Delete category',
                        onClick: deleteCategory,
                    },
                ]}
            >
                {_.map(children, this.renderCategoryChildren)}
            </StyledTreeItem>
        )
    };

    public render() {
        const { modalData } = this.state;

        return (
            <>
                <FormModal {...modalData} />
                <StyledDrawer>
                    <StyledTreeView
                        defaultExpanded={[this.rootCategoryName]}
                        expanded={this.getOpenCategories()}
                        onNodeToggle={(e, nodeIds) => this.setState({nodeIds})}
                    >
                        <List>
                            {this.renderCategoryChildren({
                                _id: this.rootCategoryName,
                                parentId: null,
                                title: 'Categories',
                            })}
                        </List>
                    </StyledTreeView>
                </StyledDrawer>
            </>
        )
    }
}

const mapStateToProps = (store: IStores) => ({
    categories: store.categoryStore.categories,
    categoriesParentList: store.categoryStore.parentList,
});


const mapDispatchToProps = (dispatch: Dispatch) => ({
    createCategory: (body: ICategory) => dispatch(actions.createCategoryAction(body)),
    deleteCategory: (id: ICategory['_id']) => dispatch(actions.deleteCategoryAction(id)),
    updateCategory: (body: ICategory) => dispatch(actions.updateCategoryAction(body)),
    getCategories: () => dispatch(actions.getCategoriesAction()),
    getCategoriesParentList: (id: ICategory['_id']) => dispatch(actions.getCategoryParentListAction(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OGLDrawer);
