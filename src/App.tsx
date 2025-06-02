import './App.css';
import { Routes, Route } from 'react-router';
// import AppLayout from './layout/AppLayout';
// import HomePage from './pages/HomePage/HomePage';
import React, { Suspense } from 'react';
import LoadingSpinner from './common/components/LoadingSpinner';

// lazy loading => 진짜 부를때 가져오기 => 전들 사이즈 감소 가능
// 단, 로딩에 시간이 걸릴것이기 때문에 로딩 처리가 필요하다
const AppLayout = React.lazy(() => import('./layout/AppLayout'));
const HomePage = React.lazy(() => import('./pages/HomePage/HomePage'));
const SearchPage = React.lazy(() => import('./pages/SearchPage/SearchPage'));
const SearchWithKeywordPage = React.lazy(() => import('./pages/SearchPage/SearchWithKeywordPage'));
const PlaylistPage = React.lazy(() => import('./pages/PlaylistPage/PlaylistPage'));
const PlaylistDetailPage = React.lazy(() => import('./pages/PlaylistPage/PlaylistDetailPage'));

// 필요한 페이지

/*
  0. 사이드 바 (플레이 리스트, 메뉴)
  1. 홈페이지         /
  2. search 페이지            /search
  3. search 결과 페이지         /search/:keyword
  4. 플레이 리스트 디테일 페이지          /playlist/:id

  5. 모바일 버전에서 플레이 리스트 보여주는 페이지    /playlist
*/

// Suspense => 로딩상태 관리 도구

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="search">
            <Route index element={<SearchPage />} />
            <Route path=":keyword" element={<SearchWithKeywordPage />} />
          </Route>
          <Route path="playlist">
            <Route index element={<PlaylistPage />} />
            <Route path=":id" element={<PlaylistDetailPage />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
