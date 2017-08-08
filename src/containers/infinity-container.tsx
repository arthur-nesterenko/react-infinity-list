import * as React from 'react';
import { findDOMNode } from 'react-dom';
import { leftPosition, topPosition } from './../util/dom-position';
import List from './../components/List';

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
    items?: Array<JSX.Element>,
    children?: Array<JSX.Element>,
    wrapElement?: string,
    className?: string,
    animateItems?: boolean,
    gradually ?: boolean
}

interface InfinityListState {
    currentPage: number,
}

class InfinityListContainer extends React.PureComponent <InfinityListProps,
    InfinityListState> {

    public static defaultProps: Partial<InfinityListProps> = {
        className          : '',
        elementIsScrollable: false,
        containerHeight    : '100%',
        threshold          : 100,
        horizontal         : false,
        hasMore            : true,
        loader             : <div style={{ marginTop: '15px', textAlign: 'center' }}>Loading...</div>,
        showLoader         : true,
        wrapElement        : 'div',
        loadMore           : () => false,
        children           : [],
        items              : [],
        animateItems       : false
    };

    constructor( props: InfinityListProps ) {
        super( props );


        this.state = {
            currentPage: 1,
        };


        this.scrollListener = this
            .scrollListener
            .bind( this );

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

    render(): JSX.Element {

        const Props = {
            loader   : this.renderLoader(),
            items    : this._renderItems(),
            className: this._assignСlass(),
            height   : this.props.containerHeight

        };

        return <List {...Props}/>;
    }

    /**
     *
     *
     *
     */



    _findElement(): any {
        return this.props.elementIsScrollable
            ? findDOMNode( this )
            : window;
    }

    attachScrollListener(): void {

        const { hasMore } = this.props;

        if (!hasMore) return;

        const el = this._findElement();
        el.addEventListener( 'scroll', this.scrollListener, true );
        el.addEventListener( 'resize', this.scrollListener, true );
        this.scrollListener();
    }

    _elScrollListener(): number {

        const el: HTMLElement = findDOMNode( this );

        const { horizontal } = this.props;

        if (horizontal) {
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

    _windowScrollListener(): number {

        const el: HTMLElement = findDOMNode( this );
        const doc: any = document;
        const w: any = window;

        const { horizontal } = this.props;
        /**
         *TODO: Should implement in next version horizontal version
         */

        if (horizontal) {
            const windowScrollLeft = (w.pageXOffset !== undefined)
                ? w.pageXOffset
                : (doc.documentElement || doc.body.parentNode || doc.body).scrollLeft as Document;
            const elTotalWidth = leftPosition( el ) + el.offsetWidth;

            return elTotalWidth - windowScrollLeft - w.innerWidth;
        }

        const windowScrollTop = (w.pageYOffset !== undefined)
            ? w.pageYOffset
            : (doc.documentElement || doc.body.parentNode || doc.body).scrollTop;

        const elTotalHeight = topPosition( el ) + el.offsetHeight;

        return elTotalHeight - windowScrollTop - window.innerHeight;

    }

    scrollListener(): void {

        if (this._totalItemsSize() <= 0)
            return;


        const { elementIsScrollable, threshold, hasMore } = this.props;

        const bottomPosition = elementIsScrollable
            ? this._elScrollListener()
            : this._windowScrollListener();

        if (bottomPosition < threshold) {

            this.detachScrollListener();

            if (hasMore) {

                this.setState( prevState => ({ page: prevState.currentPage + 1 }) );

                const { currentPage } = this.state;
                const { loadMore } = this.props;
                /**
                 *
                 */
                loadMore( currentPage );
            }


        }
    }

    detachScrollListener(): void {
        const el = this._findElement();
        el.removeEventListener( 'scroll', this.scrollListener, true );
        el.removeEventListener( 'resize', this.scrollListener, true );
    }

    _renderItems(): Array<JSX.Element> {
        const { children, items } = this.props;

        return children.concat( items );
    }

    _totalItemsSize = (): number => this._renderItems().length;


    renderLoader() {
        const { hasMore, showLoader } = this.props;

        return (hasMore && showLoader)
            ? this.props.loader
            : null;
    }

    _assignСlass(): string {

        const { className } = this.props;

        const additionalClass = (typeof className === 'function')
            ? className()
            : className;

        return 'infinite-list ' + additionalClass;
    }

    /**
     * @deprecated
     * @returns {JSX.Element}
     * @private
     */
    _renderWithTransitions(): JSX.Element {

        console.log( 'animating with tran' );

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

        return <div>With animations</div>;
    }
}

export default InfinityListContainer;