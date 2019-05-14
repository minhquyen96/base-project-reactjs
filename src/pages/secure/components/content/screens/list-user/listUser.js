import React, {useEffect, useState} from 'react';
import './listUser.css';
import {Table, Tag, Icon, message, Pagination} from 'antd';
import ListUserHeader from "./list-user-header/listUserHeader";
import {callApi} from "../../../../../../services/api";
import {connect} from "react-redux";
import * as moment from 'moment';
import render from "../../../../../../reducers/renderContentDashboardReducer";

const mapStoreToProps = (store) => {
    return {
        user: store.user.create,
        render: store.render.render,
        data: store.render.data,
        approve: store.user.approve,
        page: store.page.page,
        totalPage: store.page.total
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        renderEditUser: (editedUser) => dispatch({type: 'RENDER_EDIT_USER', data: JSON.stringify(editedUser)}),
        approveUser: () => dispatch({type: 'APPROVE_USER'}),
        changePage: (pageNumber) => dispatch({type: 'CHANGE_PAGE', page: pageNumber}),
        renderUserDetail: (user) => dispatch({type: 'RENDER_USER_DETAIL', user: JSON.stringify(user)})
    }
};

const config = {
    pageSize: 8,
    position: "none"
};


const ListUser = props => {
    const changePage = (pageNumber) => {
        props.changePage(pageNumber);
    };

    const editUser = (user) => {
        props.renderEditUser(user);
    };

    const approveUser = (user) => {
        let userData;
        userData = user;
        userData.approvedAt = moment(Date.now()).format('YYYY-MM-DD HH:mm');
        userData.status = 'Activated';
        userData.approvedBy = JSON.parse(localStorage.getItem('userData')).username;
        callApi('item/' + user.id, 'PUT', userData).then(res => {
            if (res) {
                props.approveUser();
                message.success('Approve User Successful', 3);
            } else {
                message.error('Approve User failed', 3);
            }
        })
    };

    const showUserDetail = (user) => {
        props.renderUserDetail(user);
    };

    const [data, setData] = useState({dataValues: null});
    const [loading, setLoading] = useState({isLoading: true});
    useEffect(() => {
        setLoading({isLoading: true});
        callApi('item?page=' + props.page + '&limit=8', 'GET').then(res => {
            setData({dataValues: res.data});
            setLoading({isLoading: false})
        });
    }, [props.approve, props.page]);

    const columns = [{
        title: 'No.',
        dataIndex: 'id',
        key: 'id',
        render: text => <p>{text}</p>,
    }, {
        title: 'User ID',
        dataIndex: 'userId',
        key: 'userId',
        sorter: (a, b) => a.id - b.id,
        render: text => <p>{text}</p>,
    }, {
        title: 'First name',
        dataIndex: 'first_name',
        key: 'first_name',
        sorter: (a, b) => a.id - b.id
    }, {
        title: 'Last name',
        dataIndex: 'last_name',
        key: 'last_name',
        sorter: (a, b) => a.id - b.id
    }, {
        title: 'Role',
        dataIndex: 'role',
        key: 'role',
    }, {
        title: 'Status',
        key: 'status',
        dataIndex: 'status',
        render: status => (
            <span>
            {status === 'Activated'
                ? <Tag color='green' key={status}>{status}</Tag>
                : <Tag color='volcano' key={status}>{status}</Tag>
            }
    </span>
        ),
    }, {
        title: 'Created at',
        dataIndex: 'createdAt',
        key: 'createdAt',
    }, {
        title: 'Approved at',
        dataIndex: 'approvedAt',
        key: 'approvedAt',
    }, {
        title: 'Approved by',
        dataIndex: 'approvedBy',
        key: 'approvedBy',
    }, {
        title: 'Updated at',
        dataIndex: 'updatedAt',
        key: 'updatedAt',
    }, {
        title: 'Updated by',
        dataIndex: 'updatedBy',
        key: 'updatedBy',
    }, {
        title: 'Action',
        dataIndex: 'status',
        key: 'action',
        render: (status, user) => (
            <span>
      <Tag color='blue' className="user-detail" onClick={() => showUserDetail(user)}><Icon type="eye"/>View</Tag><br/><br/>
                {status === 'Activated'
                    ? <Tag color='yellow' className="user-detail" onClick={() => editUser(user)}>
                        <Icon type="edit"/>Edit</Tag>
                    : <Tag color='green' className="user-detail" onClick={() => approveUser(user)}>Approve</Tag>
                }
    </span>
        ),
    }];

    return (
        <div>
            <ListUserHeader/>
            <Table scroll={{x: 1500, y: 550}} columns={columns} dataSource={data.dataValues} loading={loading.isLoading}
                   className="list-user" pagination={config}/>
            <div className="pagination"><Pagination showQuickJumper current={props.page} total={props.totalPage}
                                                    pageSize={8}
                                                    onChange={changePage}/></div>
        </div>
    )
};

export default connect(mapStoreToProps, mapDispatchToProps)(ListUser);
