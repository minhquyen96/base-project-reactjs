import React, {useEffect, useState} from 'react';
import {Button, Row, Col} from 'antd';
import './createUserHeader.css';
import {connect} from "react-redux";
import render from "../../../../../../../reducers/renderContentDashboardReducer";

const mapStoreToProps = (store) => {
    return {
        render: store.render.render,
        user: store.user.create,
        check: store.render.data
    }
};

const mapDispatchToProps = (dispach) => {
    return {
        renderListUser: () => dispach({type: 'RENDER_LIST_USER'}),
        createNewUser: () => dispach({type: 'CREATE_USER'})
    }
};


const CreateUserHeader = props => {
    const [title, setTitle] = useState({text: null});
    useEffect(() => {
        if (props.check === 'create') {
            setTitle({text: 'Create User'});
        } else {
            setTitle({text: 'Edit User'});
        }
    }, [props.render])

    return (
        <div>
            <Row>
                <Col className="tittle-create-user col-auto">{title.text}</Col>
                <Col className="action-create-user-header">
                    <Button type="primary" icon="save" className="btn-save" onClick={props.createNewUser}>Save</Button>
                    <Button type="primary" icon="stop" className="btn-cancel"
                            onClick={props.renderListUser}>Cancel</Button>
                </Col>
            </Row>
            <hr/>
        </div>
    )
}

export default connect(mapStoreToProps, mapDispatchToProps)(CreateUserHeader);
