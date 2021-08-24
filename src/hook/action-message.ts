
import { useEffect, useState } from 'react';
import { request } from '@/utility/request';
import { helper } from '@/utility/helper';
import { ActionMessage } from '@/schema/action-message';

/**
 * 查询操作消息列表
 * @param {string} userId 用户id
 * @param {number} read 已读状态 0:未读,1:已读
 */
function useActionMessage(userId: string, read: number = 0) {

    const [list, setList] = useState<ActionMessage[]>([]);
    useEffect(() => {
        (async () => {
            if (helper.isNullOrUndefined(userId)) {
                setList([]);
            } else {
                try {
                    const { code, data } = await request<ActionMessage[]>({
                        url: `message/user/${userId}?read=${read}`,
                        method: 'GET'
                    });
                    if (code === 0) {
                        setList(data);
                    } else {
                        setList([]);
                    }

                } catch (error) {
                    console.log(error);
                    setList([]);
                }
            }
        })();
    }, []);

    return list;
}

export { useActionMessage };