import React, {useEffect} from 'react';
import './home.css';
import {Button} from 'antd';
import {connect} from "react-redux";
import render from "../../../../../../reducers/renderContentDashboardReducer";

const maoStoreToProps = (store) => {
    return {
        render: store.render.render
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        renderListUser: () => dispatch({type: 'RENDER_LIST_USER'}),
        renderHome: () => dispatch({type: 'RENDER_HOME'})
}
};

const Home = props => {
    useEffect(() => {
        props.renderHome();
    }, []);
    const username = JSON.parse(localStorage.getItem('userData')).username;

    return (
        <div className="home-content">
            <h1 className="title-home">Welcome {username}</h1>
            <Button type="primary" icon="bars" onClick={props.renderListUser}>View List User</Button>
        </div>
    )
};

export default connect(maoStoreToProps, mapDispatchToProps)(Home);
