import { SessionStorageKeys } from '@/utility/helper';
const baseUrl = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:7001/' : 'http://192.168.1.12:7001/';

/**
 * 附件上传 
 * @param url Action地址
 * @param formData 附件数据
 */
function upload(url: string,
    formData: FormData,
    onSuccess: (body: any, xhr: XMLHttpRequest) => void,
    onError: (event: ProgressEvent) => void,
    onProgress?: (event: ProgressEvent) => void) {
    const token = sessionStorage.getItem(SessionStorageKeys.UserToken);
    const xhr = new XMLHttpRequest();
    xhr.open('POST', baseUrl + url, true);
    if (token !== null) {
        xhr.setRequestHeader('Authorization', token);
    }
    xhr.onerror = onError;
    if (onProgress) {
        xhr.upload.onprogress = onProgress;
    }
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            onSuccess(xhr.response, xhr);
        }
    };
    try {
        xhr.send(formData); //发送时  Content-Type默认就是: multipart/form-data;
    } catch (error) {
        onError(error);
    }
}

export { upload };