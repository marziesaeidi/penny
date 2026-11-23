import { lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { AuthPage } from './AuthPage';
import { Landing } from './Landing';
import { AppEntry } from './SharedEntry';
import './style.css';
import './fonts.css';
import './extensions.css';
import './design-system.css';
import './application-design.css';
import './shared-controls.css';

const loadApp = () => import('./App').then(({ App }) => ({ default: App }));
const App = lazy(() => loadApp().catch(() => ({
 default: () => <main className="access-page" dir="rtl"><p role="alert">بارگذاری برنامه کامل نشد.</p><button type="button" onClick={() => location.reload()}>تلاش دوباره</button></main>,
})));
const Welcome = lazy(() => import('./Welcome').then(({ Welcome }) => ({ default: Welcome })));
const InvitationAccess = lazy(() => import('./InvitationAccess').then(({ InvitationAccess }) => ({ default: InvitationAccess })));
const path = location.pathname;
const invitation = path.match(/^\/invite\/([a-f0-9]{64})$/);
const appPath = path === '/app' || path.startsWith('/app/');

if (appPath) void loadApp().catch(() => {});
const root = createRoot(document.getElementById('root')!);
root.render(
 <Suspense fallback={<main className="access-page" dir="rtl"><p role="status">در حال بارگذاری…</p></main>}>
  {invitation ? <InvitationAccess token={invitation[1]}/>
   : path === '/login' ? <AuthPage/>
   : path === '/welcome' ? <Welcome/>
   : appPath ? <AppEntry>{data => <App initial={data}/>}</AppEntry>
   : <Landing/>}
 </Suspense>,
);
