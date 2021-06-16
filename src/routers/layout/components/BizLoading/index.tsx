import { Spin } from 'antd';
import React, { useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'dva';
import './index.less';
/**
 * 每个loading 数据的结构
 * num 当前loading stack的的层数
 **/

export interface loadingStackType {
    num: number;
    selector: string;
}

export interface loadingStackMapType {
    default: loadingStackType;
    [index: string]: loadingStackType;
}

export interface BizLoadingProps {
    loadingStackMap: loadingStackMapType;
}

export const BizLoading = (props: BizLoadingProps) => {
    // return ReactDOM.createPortal()
    const { loadingStackMap } = props;
    const loadingStackKeys = useMemo(() => {
        return Object.keys(loadingStackMap);
    }, [loadingStackMap]);
    useEffect(() => {
        loadingStackKeys.map(stackKey => {
            const selector = document.querySelector(loadingStackMap[stackKey].selector) as HTMLElement;
            if (selector) {
                const { position } = window.getComputedStyle(selector);
                // 未设置 position 或者 为 static 时，需要设置为 relative
                if (!position || position === 'static') {
                    selector.style.position = 'relative';
                }
            }
        });
    }, [loadingStackKeys]);

    return (
        <>
            {loadingStackKeys.map(stackKey => {
                const selector = document.querySelector(loadingStackMap[stackKey].selector);
                return selector && loadingStackMap[stackKey]?.num > 0
                    ? ReactDOM.createPortal(
                          <div className="biz-loading-spin">
                              <Spin key={stackKey}></Spin>
                          </div>,
                          selector
                      )
                    : null;
            })}
        </>
    );
};
const mapStateToProps = (state: any) => {
    return {
        loadingStackMap: state.main.loadingStackMap,
    };
};
export default connect(mapStateToProps)(BizLoading);
