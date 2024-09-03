import React, { useEffect } from 'react';
import { Route,Outlet, Routes, useLocation } from 'react-router-dom';
import MainPage from '../renderer/pages/MainPage';
import Mypage from '../renderer/pages/Mypage.jsx';
import NProgress from 'nprogress';
// import 'nprogress/nprogress.css';


import HeaderComponent from '../renderer/components/Common/HeaderComponent';
import FooterComponent from '../renderer//components/Common/FooterComponent';
import AuctionDetailPage from '../renderer/pages/AuctionDetailPage.jsx';
import AuctionListPage from '../renderer/pages/AuctionListPage.jsx';
import TradeDetailPage from '../renderer/pages/TradeDetailPage.jsx';
import TradeListPage from '../renderer/pages/TradeListPage.jsx';
import SearchListPage from '../renderer/pages/SearchListPage.jsx';
import ProductListPage from '../renderer/pages/ProductListPage.jsx';
const AppRouter = () => {
    const location = useLocation();
    useEffect(() => {
        console.log('NProgress start called');
        NProgress.configure({ 
            parent: '#progress_bar',
            showSpinner: false, // 스피너 제거
            speed: 400, // 애니메이션 속도 조정
            trickle: true,
            trickleSpeed: 0.5, // 트리클 속도 조정
            easing: "ease",
         });
        NProgress.start();

    },[location.pathname])

    useEffect(() => {
        NProgress.done();
    }, []); 

    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<MainPage />} />
                <Route path="/mypage" element={<Mypage />} />
                <Route path="/auction">
                    <Route index element={<AuctionListPage />} />
                    <Route path=":auctionId" element={<AuctionDetailPage />} />
                </Route>
                <Route path="/product">
                    <Route index element={<TradeListPage />} />
                    <Route path="list" element={<ProductListPage />} />
                    <Route path=":productId" element={<TradeDetailPage />} />
                </Route>
                <Route path="/search" element={<SearchListPage />} /> {/* 검색바 */}
            </Route>
        </Routes>
    );
};

const Layout = React.memo(() => {
    return (
        <>
            <HeaderComponent />
            <main className="relative flex-grow border-b-2" style={{ minHeight: '0px', height: 'auto' }}>
                <Outlet />
            </main>
            <FooterComponent />
        </>
    );
});
Layout.displayName = "Layout";

export default AppRouter;
