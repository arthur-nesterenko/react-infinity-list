import * as React from 'react';

interface propsList {
    items : Array < JSX.Element >
}
const List = ({items} : propsList) : JSX.Element => <div>
    {items}
</div>;

export default List;