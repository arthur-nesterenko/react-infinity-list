import * as React from "react";
import {render} from "react-dom";
import InfinityListContainer from './containers/infinity-container'

const props = {

    loadMore: () => console.log('hello')
}
render(
    <InfinityListContainer/>, document.getElementById("app"));
