import React, { memo } from 'react';
import { Spin } from 'antd';
const FedCenterLoading = () => {
    return (
        <div className="center-loading-container">
            <Spin />
        </div>
    );
};
export default memo(FedCenterLoading);
