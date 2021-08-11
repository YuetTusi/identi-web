import React from 'react';
import Select from 'antd/lib/select';
import { v4 as newId, V4Options } from 'uuid';
import { encode, decode } from 'js-base64';
import { ResourceItem } from '@/model/app-menu';
import { DictCategory } from '@/schema/dict';
import { request } from './request';

const { Option } = Select;

const BASE_URL =
	process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:7001/' : 'http://192.168.1.12:7001/';

const helper = {
	/**
	 * 是否是null或undefined
	 * @param value 任意值
	 */
	isNullOrUndefined(value: any) {
		return (
			Object.prototype.toString.call(value) === '[object Null]' ||
			Object.prototype.toString.call(value) === '[object Undefined]'
		);
	},
	/**
	 * 生成UUID
	 * @param options 选项
	 */
	newId(options?: V4Options) {
		return newId(options);
	},
	/**
	 * 存储登录用户id
	 * @param id 用户id
	 */
	setUId(id: string) {
		sessionStorage.setItem('uid', encode(id));
	},
	/**
	 * 当前登录用户id
	 */
	getUId() {
		const base64 = sessionStorage.getItem('uid');
		return base64 === null ? null : decode(base64);
	},
	/**
	 * 验证传入路径是否存在于当菜单中
	 * @param pathname 路径
	 * @return {boolean} 是否可以访问
	 */
	hasRoute(menu: ResourceItem[], pathname: string) {
		return JSON.stringify(menu).includes(pathname);
	},
	/**
	 * 绑定Select下拉列表
	 * @param data 列表数据
	 * @param hasEmptyOption 是否增加默认选项
	 * @param nameField name字段名
	 * @param valueField value字段名
	 */
	bindOptions(
		data: any[],
		hasEmptyOption: boolean = false,
		nameField: string = 'name',
		valueField: string = 'value'
	) {
		let options = data.map((item) => (
			<Option value={item[valueField]} key={`K_${item[valueField]}`}>
				{item[nameField]}
			</Option>
		));
		if (hasEmptyOption) {
			options = [
				<Option value="" key="K_0">
					---
				</Option>,
				...options
			];
		}
		return options;
	},

	/**
	 * 查询字典数据
	 * @param category 字典分类
	 */
	async getDict(category: DictCategory) {
		try {
			const { code, data } = await request<{ name: string; value: string }[]>({
				url: `dict/${category}`,
				method: 'GET'
			});
			if (code === 0) {
				return data;
			} else {
				return [];
			}
		} catch (error) {
			console.log(error);
			return [];
		}
	}
};

export { helper, BASE_URL };
