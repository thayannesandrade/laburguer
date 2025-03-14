import React, { useState } from 'react';
import { Button, List, Card, Modal, InputNumber } from 'antd';
import { Product, useStore } from '../context/StoreContext';
import { v4 as uuidv4 } from 'uuid'; 
const HomePage: React.FC = () => {
  const { products, addSale, updateProductStock } = useStore();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);

  const handleAddSale = () => {
    if (!selectedProduct) return;

    const sale = {
      id: uuidv4(), // Agora o uuidv4 retorna um valor válido
      total: selectedProduct.preco * quantity,
      data: new Date().toISOString(),
      usuario_id: '1', // Supondo um usuário fixo por enquanto
      items: [
        {
          id: uuidv4(), // Gerando um UUID válido para o item
          produto_id: selectedProduct.id,
          quantidade: quantity,
          preco_unitario: selectedProduct.preco,
          subtotal: selectedProduct.preco * quantity,
        },
      ],
    };

    addSale(sale);
    updateProductStock(selectedProduct.id, quantity);
    setIsModalVisible(false);
  };

  return (
    <div>
      <h2>Produtos</h2>
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={products}
        renderItem={(product) => (
          <List.Item key={product.id}>
            <Card
              title={product.nome}
              extra={<Button onClick={() => {
                setSelectedProduct(product);
                setIsModalVisible(true);
              }}>Vender</Button>}
            >
              <p>Preço: R${product.preco}</p>
              <p>Estoque: {product.estoque_atual}</p>
            </Card>
          </List.Item>
        )}
      />

      <Modal
        title="Registrar Venda"
        visible={isModalVisible}
        onOk={handleAddSale}
        onCancel={() => setIsModalVisible(false)}
      >
        <p>Quantidade:</p>
        <InputNumber
          min={1}
          value={quantity}
          onChange={(value) => setQuantity(value ?? 1)} // Garantindo que o valor nunca seja null
        />
      </Modal>
    </div>
  );
};

export default HomePage;
