import React, {PureComponent} from 'react';

import Item from './Item';
import './style.less';

class CommentList extends PureComponent {
    render() {
        const data = this.props.data;
        return (
            <div className="comment-list">
                {
                    data.map((item,index) => {
                        return <Item key={index} data={item}/>;
                    })
                }
            </div>
        );
    }
}

export default CommentList;