import React from 'react';
import './userDetail.css';
import { Card, Icon, Avatar, Button } from 'antd';
import {connect} from "react-redux";

const { Meta } = Card;

const mapStoreToProps = store => {
    return {
        user: store.render.data
    }
};

const mapDispatchToProps = dispatch => {
    return {
        showListUser: () => dispatch({type: 'RENDER_LIST_USER'})
    }
};


const UserDetail = props => {
    return (
        <div>
            <Button type="primary" className="btn-back" onClick={props.showListUser}>
                <Icon type="left" />Go back
            </Button>
            <div className="detail-user">
                <Card
                    style={{ width: 500 }}
                    cover={<img alt="example" src="https://images.wallpaperscraft.com/image/tree_fog_nature_beautiful_84257_1920x1080.jpg" />}
                    actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
                >
                    <Meta
                        avatar={<Avatar src="https://images.wallpaperscraft.com/image/lionel_messi_player_back_shirt_97205_1920x1080.jpg" />}
                        title={JSON.parse(props.user).userId}
                    />
                    <hr/>
                    <p>Email: {JSON.parse(props.user).email}</p>
                    <p>Role: {JSON.parse(props.user).role}</p>
                </Card>
            </div>
        </div>
    )
};

export default connect(mapStoreToProps, mapDispatchToProps)(UserDetail);
