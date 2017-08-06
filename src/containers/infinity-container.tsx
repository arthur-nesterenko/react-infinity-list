import * as React from 'react';
import {findDOMNode} from 'react-dom';
import {leftPosition, topPosition} from './../util/dom-position'
import List from './../components/List'

interface InfinityListProps {

    elementIsScrollable?: boolean,
    containerHeight?: (number | string),
    threshold?: number,
    horizontal?: boolean,
    hasMore?: boolean,
    loadingMore?: boolean,
    loader?: any,
    showLoader?: boolean,
    loadMore?: any,
    // items : (JSX.Element | Array < any >), children : (JSX.Element | Array < any
    // >),
    holderType?: string,
    className?: string,
    animateItems?: boolean
}

interface InfinityListState {}

class InfinityListContainer extends React.PureComponent < InfinityListProps,
undefined > {

    public static defaultProps : Partial < InfinityListProps > = {
        className: '',
        elementIsScrollable: false,
        containerHeight: '100%',
        threshold: 100,
        horizontal: false,
        hasMore: true,
        loadingMore: false,
        loader: <div style={{
            textAlign: 'center'
        }}>Loading...</div>,
        showLoader: true,
        holderType: 'div',
        loadMore: false,
        // children: [], items: [],
        animateItems: false
    };

    render() : JSX.Element {return <List/>;}
}

export default InfinityListContainer;