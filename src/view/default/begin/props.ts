import { Dayjs } from "dayjs";


interface BeginProp {

}

/**
 * 表单
 */
interface FormValue {
    /**
     * 鉴定时间
     */
    rec_time: Dayjs;
    /**
     * 鉴定地点
     */
    rec_place?: string;
    /**
     * 意见
     */
    suggest: string;
    /**
     * 动作原因
     */
    action_note?: string;
    /**
     * 动作时间
     */
    action_time: Dayjs;
}

export { BeginProp, FormValue };