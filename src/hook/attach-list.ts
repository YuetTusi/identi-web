
import { useEffect, useState } from 'react';
import { request } from '@/utility/request';
import { Attachment } from '@/schema/attachment';

/**
 * 查询案件附件列表
 * @param id 案件id
 */
function useCaseAttach(id: string) {
    const [list, setList] = useState<Attachment[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const { code, data } = await request<Attachment[]>({
                    url: `case-attach/case/${id}`,
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
        })();
    }, []);

    return list;
}

/**
 * 查询设备附件列表
 * @param {string} id 设备id
 */
function useDeviceAttach(id: string) {

    const [list, setList] = useState<Attachment[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const { code, data } = await request<Attachment[]>({
                    url: `case-attach/device/${id}`,
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
        })();
    }, []);

    return list;
}

export { useCaseAttach, useDeviceAttach };