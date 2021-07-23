import React from 'react';
import Layout from './routers/layout';
import { RouteComponentProps, Route, BrowserRouter } from 'dva/router';
import { SubscriptionAPI } from 'dva';
import Main from './routers/main';

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
export default App;
