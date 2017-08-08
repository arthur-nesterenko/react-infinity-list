import * as React from 'react';

interface propsList {
    items: Array<JSX.Element>,
    loader?: Array<JSX.Element>
    height: string | number
    className: string
}

const List = ( { items, loader, height, className }: propsList ): JSX.Element => <div
    className={className}
    style={{ height }}>
    {items}
    {loader}
</div>;

export default List;