
import { useEffect, useState } from 'react';
import { request } from '@/utility/request';
import { Attachment } from '@/schema/attachment';

/**
 * 查询附件列表
 * @param {string} caseId 案件id
 */
function useAttachList(caseId: string) {

    const [list, setList] = useState<Attachment[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const { code, data } = await request<Attachment[]>({
                    url: `case-attach/case/${caseId}`,
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

export { useAttachList };