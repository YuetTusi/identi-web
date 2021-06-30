import { createHashHistory as createHistory } from 'history';
import dva, { RouterAPI } from 'dva';
import { createRouter } from './router';
import authModel from '@/model/auth';
import 'antd/dist/antd.min.css';

const app = dva({ history: createHistory() });

app.model(authModel);
app.router(createRouter);

app.start('#root');
