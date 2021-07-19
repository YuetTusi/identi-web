import React from 'react';
import { Dispatch } from 'dva';
import { routerRedux } from 'dva/router';
import dayjs from 'dayjs';
import Tag from 'antd/lib/tag';
import Modal from 'antd/lib/modal';
import { ColumnsType } from 'antd/lib/table';
import { CaseState, LawCase } from '@/schema/law-case';
import { LawCase4Table } from './props';

const defaultPageSize = 20;

const getColumns = (dispatch: Dispatch) => {
	const columns: ColumnsType<LawCase4Table> = [
		{
			title: '案件名称',
			dataIndex: 'case_name',
			key: 'case_name',
			render(value: string, { id }: LawCase) {
				return (
					<a onClick={() => dispatch(routerRedux.push(`/permission/case/detail/${id}`))}>
						{value}
					</a>
				);
			}
		},
		{
			title: '鉴定人',
			dataIndex: 'identi_username',
			key: 'identi_username'
		},
		{
			title: '审核人',
			dataIndex: 'check_username',
			key: 'check_username'
		},
		{
			title: '采集人员',
			dataIndex: 'officer_name',
			key: 'officer_name'
		},
		{
			title: '采集人员编号',
			dataIndex: 'officer_no',
			key: 'officer_no'
		},
		{
			title: '检验单位',
			dataIndex: 'check_unit_name',
			key: 'check_unit_name'
		},
		{
			title: '状态',
			dataIndex: 'state',
			key: 'state',
			width: 60,
			align: 'center',
			render(value: CaseState) {
				switch (value) {
					case CaseState.NotIdenti:
						return <Tag style={{ margin: 0 }}>未鉴定</Tag>;
					case CaseState.ToBeIdenti:
						return (
							<Tag color="blue" style={{ margin: 0 }}>
								待鉴定
							</Tag>
						);
					case CaseState.Reject:
						return (
							<Tag color="orange" style={{ margin: 0 }}>
								驳回
							</Tag>
						);
					case CaseState.Approval:
						return (
							<Tag color="cyan" style={{ margin: 0 }}>
								审核
							</Tag>
						);
					case CaseState.Finish:
						return (
							<Tag color="green" style={{ margin: 0 }}>
								完成
							</Tag>
						);
					default:
						return <Tag style={{ margin: 0 }}>未知</Tag>;
				}
			}
		},
		{
			title: '创建时间',
			dataIndex: 'create_time',
			key: 'create_time',
			align: 'center',
			width: 150,
			render(value: any) {
				return dayjs(value).format('YYYY-MM-DD HH:mm:ss');
			}
		},
		{
			title: '更新时间',
			dataIndex: 'update_time',
			key: 'update_time',
			align: 'center',
			width: 150,
			render(value: any) {
				return dayjs(value).format('YYYY-MM-DD HH:mm:ss');
			}
		},
		{
			title: '处理',
			dataIndex: 'id',
			key: 'id',
			align: 'center',
			width: 60,
			render(value: string, record: LawCase4Table) {
				if (
					record.state === CaseState.NotIdenti ||
					record.state === CaseState.Approval ||
					record.state === CaseState.Reject
				) {
					return <a>处理</a>;
				} else {
					return <span style={{ cursor: 'not-allowed' }}>编辑</span>;
				}
			}
		},
		{
			title: '编辑',
			dataIndex: 'id',
			key: 'id',
			align: 'center',
			width: 60,
			render(value: string, record: LawCase4Table) {
				if (record.state === CaseState.NotIdenti || record.state === CaseState.Reject) {
					return (
						<a
							onClick={() =>
								dispatch(routerRedux.push(`/permission/case/edit/${value}`))
							}>
							编辑
						</a>
					);
				} else {
					return <span style={{ cursor: 'not-allowed' }}>编辑</span>;
				}
			}
		},
		{
			title: '删除',
			dataIndex: 'id',
			key: 'id',
			align: 'center',
			width: 60,
			render(value: string, { case_name, state }: LawCase4Table) {
				if (
					state === CaseState.NotIdenti ||
					state === CaseState.Reject ||
					state === CaseState.Finish
				) {
					return (
						<a
							onClick={() => {
								Modal.confirm({
									onOk() {
										dispatch({
											type: 'lawCase/delCase',
											payload: value
										});
									},
									title: '删除案件',
									content: `确认删除「${case_name}」？`,
									okText: '是',
									cancelText: '否',
									centered: true
								});
							}}>
							删除
						</a>
					);
				} else {
					return <span style={{ cursor: 'not-allowed' }}>删除</span>;
				}
			}
		}
	];
	return columns;
};

export { getColumns };
