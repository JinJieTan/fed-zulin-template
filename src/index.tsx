import React from 'react';
import dva from 'dva';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import App from './app';
import './assets/init/normalize.css';
import './assets/less/index.less';
import createHistory from 'history/createBrowserHistory';
//@ts-ignore
import createLoading from 'dva-loading';
import { AppContainer, setConfig } from 'react-hot-loader';
import main from '@m/main'
setConfig({
    ignoreSFC: true,
    //@ts-ignore
    ignoreClases: false,
    // optional
    disableHotRenderer: true,
    reloadHooks: false,
});
const app = dva({
    history: createHistory(),
});
app.model(main)
app.use(createLoading());


function renderWithHotReload(C: any) {
    app.router((obj: any) => (
        <ConfigProvider locale={zhCN}>
            <AppContainer>
                <C
                    history={obj.history}
                    match={obj.match}
                    location={obj.location}
                    getState={obj.app._store.getState}
                    dispatch={obj.app._store.dispatch}
                />
            </AppContainer>
        </ConfigProvider>
    ));
    app.start('#root');
}

renderWithHotReload(App);
