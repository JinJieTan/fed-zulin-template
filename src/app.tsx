import React, { Fragment } from 'react';
import { Route, Switch, Router, Redirect } from 'dva/router';
// import Home from './routers/home';
// import Init from './routers/login';
import Layout from './routers/layout';
import NoRights from './routers/interceptors/noRights';
import NotFoundPage from './routers/interceptors/notFoundPage';
import { RouteComponentProps } from 'dva/router';
import { hot } from 'react-hot-loader';
import { SubscriptionAPI } from 'dva';
import Loadable from 'react-loadable';
import { Spin } from 'antd';

const loading = () => {
    return <Spin />;
};

const routes = [
    {
        path: '/init',
        component: Loadable({
            loader: () => import('./routers/login'),
            loading,
        }),
    },
    {
        path: '/home',
        component: Loadable({
            loader: () => import('./routers/home'),
            loading,
        }),
    },
];

class App extends React.PureComponent<RouteComponentProps & SubscriptionAPI> {
    public render() {
        return (
            <Layout>
                <Router history={this.props.history}>
                    <Switch>
                        {routes.map(item => {
                            return <Route path={item.path} component={item.component} key={item.path} />;
                        })}
                        <Redirect exact from="/*" to="/init" />
                    </Switch>
                </Router>
            </Layout>
        );
    }
}
export default hot(module)(App);
