import { createHashHistory as createHistory } from 'history';
import dva from 'dva';
import immer from 'dva-immer';
import { createRouter } from './router';
import authModel from '@/model/auth';
import appMenuModel from '@/model/app-menu';
import resourceModel from '@/model/permission/resource';
import roleModel from '@/model/permission/role';
import userModel from '@/model/permission/user';
import lawCaseModel from '@/model/permission/case';
import '@ztree/ztree_v3/js/jquery.ztree.all.min';
import '@ztree/ztree_v3/css/metroStyle/metroStyle.css';

import 'antd/dist/antd.min.css';

const app = dva({ history: createHistory() });

app.use(immer());
app.model(authModel);
app.model(appMenuModel);
app.model(resourceModel);
app.model(roleModel);
app.model(userModel);
app.model(lawCaseModel);
app.router(createRouter);

app.start('#root');
