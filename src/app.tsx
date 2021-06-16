import React from 'react';
import Layout from './routers/layout';
import { RouteComponentProps, Route, BrowserRouter } from 'dva/router';
import { hot } from 'react-hot-loader';
import { SubscriptionAPI } from 'dva';
import { Spin } from 'antd';
import Main from './routers/main';
const loading = () => {
    return <Spin />;
};

class App extends React.PureComponent<RouteComponentProps & SubscriptionAPI> {
    public render() {
        return (
            <BrowserRouter>
                <Route path="/">
                    <Layout dispatch={this.props.dispatch} location={location}>
                        <Main />
                    </Layout>
                </Route>
            </BrowserRouter>
        );
    }
}
export default hot(module)(App);
