import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import CalculatorPage from './pages/CalculatorPage';
import PortfolioPage from './pages/PortfolioPage';
import InvestorPage from './pages/InvestorPage';
import MarketPage from './pages/MarketPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import ScoreGainWorldPage from './pages/ScoreGainWorldPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route
            path="calculadora-de-juros-compostos"
            element={<CalculatorPage />}
          />
          <Route path="minha-carteira" element={<PortfolioPage />} />
          <Route path="seja-um-investidor" element={<InvestorPage />} />
          <Route path="panorama-de-mercado" element={<MarketPage />} />
          <Route path="score-gain-world" element={<ScoreGainWorldPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/:slug" element={<BlogPostPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
