import Breadcrumbs, {BreadcrumbsProps} from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {RouteComponentProps} from 'react-router';
import {IStores} from '../../store/reducers';
import {ICategory} from '../../store/reducers/categoryReducer';


type IProps = RouteComponentProps<any> & BreadcrumbsProps & {
    categoriesParentList: ICategory[];
}

class CollapsedBreadcrumbs extends Component<IProps> {

    public handleClick = (id: ICategory['_id']) =>(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
        this.props.history.push(`/category/${id}`);

    };

    public render() {
        const { categoriesParentList, match, className } = this.props;
        const currentId = _.get(match, 'params.id', '');
        const rootBreadcrumbs = {
            _id: 'root',
            title: 'All Categories',
        };

        let breadcrumbs = [rootBreadcrumbs];

        if (currentId) {
            breadcrumbs = _.concat(breadcrumbs, categoriesParentList)
        }

        return (
            <Breadcrumbs
                maxItems={4}
                itemsBeforeCollapse={2}
                itemsAfterCollapse={3}
                className={className}
                aria-label="breadcrumb"
            >
                {_.map(breadcrumbs, (x) => {
                    const rowId = _.get(x, '_id');
                    const id  = rowId === 'root' ? '' : rowId;
                    return  (
                        <Link
                            key={id}
                            color={currentId === id ? 'primary' : 'inherit'}
                            onClick={this.handleClick(id)}
                        >
                            {_.get(x, 'title')}
                        </Link>
                    )
                })}
            </Breadcrumbs>
        );
    }
}

const mapStateToProps = (store: IStores) => ({
    categoriesParentList: store.categoryStore.parentList,
});



export default connect(mapStateToProps)(CollapsedBreadcrumbs);
