import React from 'react';
import Select from 'antd/lib/select';
import { v4 as newId, V4Options } from 'uuid';
import { encode, decode } from 'js-base64';
import { ResourceItem } from '@/model/app-menu';
import { DictCategory } from '@/schema/dict';
import { ActionMessage } from '@/schema/action-message';
import { request } from './request';

const { Option } = Select;

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
	 * 是否是Promise实例
	 * @param value 任意值
	 */
	isPromise(value: any) {
		if (
			Object.prototype.toString.call(value) === '[object Promise]' &&
			typeof value.then === 'function'
		) {
			return true;
		} else {
			return false;
		}
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
		if (this.isNullOrUndefined(data) || data.length === 0) {
			return [];
		}
		let options = data.map((item) => (
			<Option value={item[valueField]} key={`${item[nameField]}_${item[valueField]}`}>
				{item[nameField]}
			</Option>
		));
		if (hasEmptyOption) {
			options = [
				<Option value="" key={`${data[0][nameField]}_${data[0][valueField]}_0`}>
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
	},
	/**
	 * 增加操作消息
	 * @param actionMessage 消息
	 * @returns {Promise<boolean>} 成功/失败
	 */
	async addActionMessage(actionMessage: ActionMessage) {
		try {
			const { code, data } = await request<number>({
				url: 'message',
				method: 'POST',
				data: {
					form: actionMessage
				}
			});
			if (code === 0 && data > 0) {
				return true;
			} else {
				return false;
			}
		} catch (error) {
			return false;
		}
	},
	/**
	 * 创建线程
	 * @param code 线程脚本源码
	 * @returns 线程对象
	 */
	createWebWorker(code: string) {
		if (code) {
			var blob = new Blob([code]); //源码创建Blob对象
			var worker = new Worker(window.URL.createObjectURL(blob));
			return worker;
		} else {
			throw Error('Worker code is null');
		}
	}
};

export { helper };
