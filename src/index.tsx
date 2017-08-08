import * as React from "react";
import {render} from "react-dom";
import InfinityListContainer from './containers/infinity-container'
import {times} from 'lodash'

const styles = {
    border: '1px #000 solid',
    marginTop: '15px',
    height: '100px',
    textAlign: 'center'

};

const makeId = () => Math.random().toString(36).substring(7);

const test = times(10, (index: number) => (
    <div style={styles} key={makeId()}>{makeId()}</div>
));

class App extends React.Component <any,
    any> {

    constructor(props: any) {
        super(props)

        this.state = {
            items: test
        }
    }

    loadMore = (items: any) => this.setState({
        items: items.concat(
            times(10, (index: number) => (
                <div style={styles} key={makeId()}>{makeId()}</div>
            ))


        )
    });

    render() {

        const Props = {
            items: this.state.items,
            loadMore: this.loadMore
        }
        return <InfinityListContainer {...Props}/>
    }
}

/**
 *
 */
render(
    <App/>, document.getElementById('app'));

// const props = {     items:     loadMore: () => console.log('hello') }