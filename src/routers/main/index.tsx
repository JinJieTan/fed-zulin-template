import React, { useEffect } from 'react';
import { registerMicroApps, start } from 'qiankun';

import './index.less';
export default function App() {
    useEffect(() => {

        // registerMicroApps([
        //     {
        //         name: 'react app',
        //         entry: '//localhost:7100',
        //         container: '#micro-content',
        //         activeRule: '/react16',
        //     },
        //     {
        //         name: 'vue app',
        //         entry: { scripts: ['//localhost:7100/main.js'] },
        //         container: '#micro-content',
        //         activeRule: '/react15',
        //     },
        // ]);

        // start();
    }, []);
    return <div id='micro-content'></div>;
}