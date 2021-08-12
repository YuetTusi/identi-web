import { createHashHistory as createHistory } from 'history';
import dva from 'dva';
import immer from 'dva-immer';
import { createRouter } from './router';
import { registerModel } from './utility/register-model';
import AttachmentModalModel from '@/model/component/attachment-modal';
import authModel from '@/model/auth';
import appMenuModel from '@/model/app-menu';
import resourceModel from '@/model/permission/resource';
import roleModel from '@/model/permission/role';
import userModel from '@/model/permission/user';
import lawCaseModel from '@/model/permission/law-case';
import issueModalModel from '@/model/permission/component/issue-modal';
import reissueModalModel from '@/model/permission/component/reissue-modal';
import disapproveModelModel from '@/model/permission/component/disapprove-modal';
import settingModel from '@/model/profile/setting';
import defaultModal from '@/model/default';
import '@ztree/ztree_v3/js/jquery.ztree.all.min';
import '@ztree/ztree_v3/css/metroStyle/metroStyle.css';
import 'antd/dist/antd.less';

const app = dva({ history: createHistory() });

registerModel(app, AttachmentModalModel);
registerModel(app, authModel);
registerModel(app, appMenuModel);
registerModel(app, resourceModel);
registerModel(app, roleModel);
registerModel(app, userModel);
registerModel(app, lawCaseModel);
registerModel(app, issueModalModel);
registerModel(app, reissueModalModel);
registerModel(app, disapproveModelModel);
registerModel(app, defaultModal);
registerModel(app, settingModel);

app.use(immer());
app.router(createRouter);
app.start('#root');
