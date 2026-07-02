import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from '@/context/AppContext';
import { Layout } from '@/components/Layout/Layout';
import { ErrorBoundary } from '@/components/ErrorBoundary/ErrorBoundary';

const Home = lazy(() => import('@/pages/Home/Home').then((m) => ({ default: m.Home })));
const Menu = lazy(() => import('@/pages/Menu/Menu').then((m) => ({ default: m.Menu })));
const About = lazy(() => import('@/pages/About/About').then((m) => ({ default: m.About })));
const CartPage = lazy(() => import('@/pages/Cart/Cart').then((m) => ({ default: m.CartPage })));
const Favorites = lazy(() => import('@/pages/Favorites/Favorites').then((m) => ({ default: m.Favorites })));
const NotFound = lazy(() => import('@/pages/NotFound/NotFound').then((m) => ({ default: m.NotFound })));

function PageLoader() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
      <div className="skeleton" style={{ width: 48, height: 48, borderRadius: '50%' }} />
    </div>
  );
}

export function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="menu" element={<Menu />} />
                <Route path="about" element={<About />} />
                <Route path="cart" element={<CartPage />} />
                <Route path="favorites" element={<Favorites />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AppProvider>
    </ErrorBoundary>
  );
}
