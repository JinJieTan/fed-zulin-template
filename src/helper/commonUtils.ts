// 判断宿主机型，主要判断是否是ipad
export const watchUA = (str: string = 'iPad') => {
    const sUserAgent = navigator.userAgent.toLowerCase();
    if (sUserAgent.includes(str)) {
        return true;
    } else if (sUserAgent.indexOf('safari') > 0 && sUserAgent.indexOf('chrome') < 0) {
        const { width, height } = window.screen; // mac 和 ipad平板在sUserAgent中没区别
        if ((width === 1024 && height === 1366) || (width === 1366 && height === 1024)) {
            return true;
        }
    }
    return false;
};
