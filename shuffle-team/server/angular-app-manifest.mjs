
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/shuffle-team/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/shuffle-team"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 24676, hash: '878bbac9fd31d5181a43aeed60f33e1d74a889364d310cef51c3d0647b92bee5', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17129, hash: '90b2a4b1bbc629c01f534f5e4744b53f45660160b2e828682216ea141634afdf', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 87153, hash: '0735a44e999a7423c39b56e446a1bcbdd9f1448bbd29d35f96f5f7a5028b3aff', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-DTTV3AOM.css': {size: 8100, hash: 'jHWbwFO0LXY', text: () => import('./assets-chunks/styles-DTTV3AOM_css.mjs').then(m => m.default)}
  },
};
