import { useEffect, useState } from 'react';
import { helper } from '@/utility/helper';
import { DictCategory } from '@/schema/dict';

/**
 * 使用字典数据
 * @param category 字典分类枚举
 */
function useDict(category: DictCategory) {

    const [dict, setDict] = useState<{ name: string, value: string }[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const data = await helper.getDict(category);
                setDict(data);
            } catch (error) {
                setDict([]);
            }
        })();
    }, []);

    return dict;
}

export { useDict };