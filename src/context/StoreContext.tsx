import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid'; 
import { Product } from '../types/product';


interface SaleItem {
  id: string;
  produto_id: string;
  quantidade: number;
  preco_unitario: number;
  subtotal: number;
}

interface Sale {
  id: string;
  total: number;
  data: string;
  usuario_id: string;
  items: SaleItem[];
}

interface StoreContextType {
  products: Product[];
  sales: Sale[];
  addSale: (sale: Sale) => void;
  updateProductStock: (productId: string, quantity: number) => void;
}

interface StoreProviderProps {
    children: ReactNode
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [sales, setSales] = useState<Sale[]>([]);

  // Carregar produtos e vendas da API
  useEffect(() => {
    fetch('http://localhost:5000/products')
      .then((response) => response.json())
      .then((data) => setProducts(data));

    fetch('http://localhost:5000/sales')
      .then((response) => response.json())
      .then((data) => setSales(data));
  }, []);

  const addSale = (sale: Sale) => {
    const saleWithId = { ...sale, id: uuidv4() }; // Gerando o id da venda
    // Adicionar venda à API
    fetch('http://localhost:5000/sales', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(saleWithId),
    })
      .then((response) => response.json())
      .then((newSale) => setSales((prevSales) => [...prevSales, newSale]));
  };

  const updateProductStock = (productId: string, quantity: number) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? { ...product, estoque_atual: product.estoque_atual - quantity } // Subtrai a quantidade vendida do estoque
          : product
      )
    );
  
    // Verifica se o produto foi encontrado antes de fazer o patch na API
    const productToUpdate = products.find(product => product.id === productId);
    if (productToUpdate) {
      // Atualizar estoque do produto na API
      fetch(`http://localhost:5000/products/${productId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          estoque_atual: productToUpdate.estoque_atual - quantity, // Envia o estoque atualizado
        }),
      });
    } else {
      console.error("Produto não encontrado para atualizar estoque");
    }
  };
  
  

  return (
    <StoreContext.Provider value={{ products, sales, addSale, updateProductStock }}>
      {children}
    </StoreContext.Provider>
  );
};
export type { Product, Sale };

