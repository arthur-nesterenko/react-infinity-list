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
    items?: Array < JSX.Element >,
    children?: Array < JSX.Element >,
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
        loadMore: () => console.log('default laod more'),
        children: [],
        items: [],
        animateItems: false
    };
    constructor(props : InfinityListProps) {
        super(props);

        console.log(props)

        this.scrollListener = this
            .scrollListener
            .bind(this);

    }

    componentDidMount() {
        this.attachScrollListener();
    }

    componentDidUpdate() {
        this.attachScrollListener();
    }

    componentWillUnmount() {
        this.detachScrollListener();
    }

    render() : JSX.Element {
        const {items} = this.props;
        return <List items={items}/>;
    }

    _findElement() : any
    {
        return this.props.elementIsScrollable
            ? findDOMNode(this)
            : window;
    }

    attachScrollListener() : void {
        if(!this.props.hasMore || this.props.loadingMore) 
            return;
        let el = this._findElement();
        el.addEventListener('scroll', this.scrollListener, true);
        el.addEventListener('resize', this.scrollListener, true);
        this.scrollListener();
    }

    _elScrollListener() : number {

        const el: HTMLElement = findDOMNode(this);

        if (this.props.horizontal) {
            const leftScrollPos = el.scrollLeft;
            const totalContainerWidth = el.scrollWidth;
            const containerFixedWidth = el.offsetWidth;
            const rightScrollPos = leftScrollPos + containerFixedWidth;

            return (totalContainerWidth - rightScrollPos);
        }

        const topScrollPos = el.scrollTop;
        const totalContainerHeight = el.scrollHeight;
        const containerFixedHeight = el.offsetHeight;
        const bottomScrollPos = topScrollPos + containerFixedHeight;

        return (totalContainerHeight - bottomScrollPos);
    }

    _windowScrollListener() : number {
        const el: HTMLElement = findDOMNode(this);
        const doc: any = document;
        const w: any = window;
        /**
         *TODO: Should implement in next version horizontal version
         */

        if (this.props.horizontal) {
            const windowScrollLeft = (w.pageXOffset !== undefined)
                ? w.pageXOffset
                : (doc.documentElement || doc.body.parentNode || doc.body).scrollLeft as Document;
            const elTotalWidth = leftPosition(el) + el.offsetWidth;
            const currentRightPosition = elTotalWidth - windowScrollLeft - window.innerWidth;
            return currentRightPosition;
        }

        const windowScrollTop = (window.pageYOffset !== undefined)
            ? window.pageYOffset
            : (doc.documentElement || doc.body.parentNode || doc.body).scrollTop;
        const elTotalHeight = topPosition(el) + el.offsetHeight;
        const currentBottomPosition = elTotalHeight - windowScrollTop - window.innerHeight;

        return currentBottomPosition;
    }

    scrollListener() : void {
        // This is to prevent the upcoming logic from toggling a load more before any
        // data has been passed to the component

        if(this._totalItemsSize() <= 0) 
            return;
        
        let bottomPosition = this.props.elementIsScrollable
            ? this._elScrollListener()
            : this._windowScrollListener();

        if (bottomPosition < Number(this.props.threshold)) {
            this.detachScrollListener();

            this
                .props
                .loadMore(this.props.items);
        }
    }

    detachScrollListener() {
        let el = this._findElement();
        el.removeEventListener('scroll', this.scrollListener, true);
        el.removeEventListener('resize', this.scrollListener, true);
    }

    _renderOptions() {
        const allItems = this
            .props
            .children
            .concat(this.props.items);

        return allItems;
    }

    _totalItemsSize() : number {
        let totalSize;

        if (this.props.items) 
            return this.props.items.length
        else 
            return this.props.children.length;

        }
    
    renderLoader() {
        return (this.props.loadingMore && this.props.showLoader)
            ? this.props.loader
            : undefined;
    }

    _assignHolderClass() : string {

        const additionalClass = (typeof this.props.className === 'function')
            ? this
                .props
                .className()
            : this.props.className;

        return 'redux-infinite-scroll ' + additionalClass;
    }

    _renderWithTransitions() : JSX.Element {
        const allItems = this
            .props
            .children
            .concat(this.props.items);

        console.log('animating with tran');

        /**
         * TODO: Should add in next version
         */

        // return (     <ReactCSSTransitionGroup
        // transitionName={this.props.transitionName}
        // transitionEnter={this.props.transitionEnter}
        // transitionEnterTimeout={this.props.transitionEnterTimeout}
        // transitionLeave={this.props.transitionLeave}
        // transitionLeaveTimeout={this.props.transitionLeaveTimeout}
        // transitionAppear={this.props.transitionAppear}
        // transitionAppearTimeout={this.props.transitionAppearTimeout}> {allItems}
        // </ReactCSSTransitionGroup> )}

        return <div>Withanimations</div>
        }
    }

    export default InfinityListContainer;