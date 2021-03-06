import React, { PureComponent } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Home from './Home';
import * as userInfoActionsFromOtherFile from '../action/userInfo';
import LocalStore from '../util/localStore';
import { CITYNAME } from '../config/localStoreKey';
import City from './City';
import NotFound from '../container/404';
import Login from '../container/Login';
import User from '../container/User';
import Search from '../container/Search';
import Detail from '../container/Detail';

class App extends PureComponent {
    constructor(){
        super();
        this.state = {
            initDone: false
        };
    }

    componentDidMount() {
        let cityName = LocalStore.getItem(CITYNAME);
        if(cityName == null) {
            cityName = '北京';
        }
        this.props.userInfoAction.update({
            cityName
        });
        this.setState({
            initDone: true
        });
    }

    render(){
        const children = (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/city" component={City}/>
                <Route path="/login/:router?" component={Login}/>
                <Route path="/User" component={User}/>
                <Route path="/search/:category/:keyword?" component={Search}/>
                <Route path="/detail/:id" component={Detail}/>
                <Route component={NotFound}/>
            </Switch>
        );
        return (
            <div>
                {
                    this.state.initDone
                        ? children
                        : <div>正在加载...</div>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
    userInfoAction: bindActionCreators(userInfoActionsFromOtherFile,dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);