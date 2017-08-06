import * as React from 'react';
import {findDOMNode} from 'react-dom';
import {leftPosition, topPosition} from './../util/dom-position'
import List from './../components/List'

interface InfinityListProps {

    elementIsScrollable : boolean,
    containerHeight : (number | string),
    threshold : number,
    horizontal : boolean,
    hasMore : boolean,
    loadingMore : boolean,
    loader : any,
    showLoader : boolean,
    loadMore : any,
    items : (JSX.Element | Array < any >)
}

interface InfinityListState {}

class InfinityListContainer extends React.PureComponent < InfinityListProps,
undefined > {

    public static defaultProps : Partial < InfinityListProps > = {
        elementIsScrollable: false,
        horizontal: false,
        hasMore: true,
        loadingMore: false,
        showLoader: true
    };

    render() : JSX.Element {return <List/>;}
}

export default InfinityListContainer;