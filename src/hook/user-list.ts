
import { useEffect, useState } from 'react';
import { request } from '@/utility/request';
import { User } from '@/schema/user';

/**
 * 查询用户列表
 */
function useUserList() {

    const [list, setList] = useState<User[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const { code, data } = await request<User[]>({ url: 'user', method: 'GET' });
                if (code === 0) {
                    setList(data);
                } else {
                    setList([]);
                }

            } catch (error) {
                console.log(error);
                setList([]);
            }
        })();
    }, []);

    return list;
}

export { useUserList };