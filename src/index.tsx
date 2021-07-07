import { createHashHistory as createHistory } from 'history';
import dva, { RouterAPI } from 'dva';
import immer from 'dva-immer';
import { createRouter } from './router';
import authModel from '@/model/auth';
import appMenuModel from '@/model/app-menu';
import resourceModel from '@/model/permission/resource';
import 'antd/dist/antd.min.css';

const app = dva({ history: createHistory() });

app.use(immer());
app.model(authModel);
app.model(appMenuModel);
app.model(resourceModel);
app.router(createRouter);

app.start('#root');
