//电子邮件
export const Mail = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
//数字，不限位数
export const OnlyNumber = /^\d*$/;
//6位数字，采集人员编号
export const OfficerNumber = /\d{6}/;
//手机号码
export const MobileNumber = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[0-9]|18[0-9]|14[0-9]|19[0-9])[0-9]{8}$/;