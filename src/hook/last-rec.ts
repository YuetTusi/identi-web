
import { useEffect, useState } from 'react';
import { request } from '@/utility/request';
import { CaseRec } from '@/schema/case-rec';

/**
 * 查询最近一条鉴定记录
 * @param id 案件id
 */
function useLastRec(id: string) {

    const [rec, setRec] = useState<CaseRec>();

    useEffect(() => {
        if (id) {
            (async () => {
                try {
                    const { code, data } = await request<CaseRec>({ url: `rec/law-case/${id}`, method: 'GET' });
                    if (code === 0) {
                        setRec(data);
                    } else {
                        setRec(undefined);
                    }

                } catch (error) {
                    console.log(error);
                    setRec(undefined);
                }
            })();
        }
    }, [id]);

    return rec;
}

export { useLastRec };