
const helper = {

    isNullOrUndefined(value: any) {
        return Object.prototype.toString.call(value) === '[object Null]' || Object.prototype.toString.call(value) === '[object Undefined]';
    }
};

export { helper };