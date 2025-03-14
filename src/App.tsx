import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { StoreProvider } from "./context/StoreContext";
import ProductPage from "./pages/ProductPage";
import SalesPage from "./pages/SalesPage"; // Página de vendas que você vai criar

import { Layout, Menu } from "antd";
import { HomeOutlined, FileDoneOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Sider, Content } = Layout;

const App: React.FC = () => {
  return (
    <StoreProvider>
      <Router>
        <Layout style={{ minHeight: "100vh" }}>
          <Sider width={200} theme="dark">
            <Menu mode="inline" defaultSelectedKeys={['1']} style={{ height: "100%", borderRight: 0 }}>
              <Menu.Item key="1" icon={<HomeOutlined />}>
                <Link to="/">Produtos</Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<FileDoneOutlined />}>
                <Link to="/sales">Vendas</Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              <Routes>
                <Route path="/" element={<ProductPage />} />
                <Route path="/sales" element={<SalesPage />} />
              </Routes>
            </Content>
          </Layout>
        </Layout>
      </Router>
    </StoreProvider>
  );
};

export default App;
