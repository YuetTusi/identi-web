import { createHashHistory as createHistory } from 'history';
import dva, { RouterAPI } from 'dva';
import { request } from '@/utility/request';
import { createRouter } from './router';
import authModel from '@/model/auth';
import appMenuModel from '@/model/app-menu';
import 'antd/dist/antd.min.css';

const app = dva({ history: createHistory() });

app.model(authModel);
app.model(appMenuModel);
app.router(createRouter);

app.start('#root');
