import React, { useEffect, useState } from "react";
import { Button, List, Card, Modal, InputNumber } from "antd";
import { Product, useStore } from "../context/StoreContext";

const ProductPage: React.FC = () => {
  const { addSale, updateProductStock } = useStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);

  // Função para buscar todos os produtos da API (sem paginação)
  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/products");

      if (!response.ok) throw new Error("Erro ao buscar produtos");

      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddSale = () => {
    if (!selectedProduct) return;

    const sale = {
      id: crypto.randomUUID(),
      total: selectedProduct.preco * quantity,
      data: new Date().toISOString(),
      usuario_id: "1", // Usuário fixo por enquanto
      items: [
        {
          id: crypto.randomUUID(),
          produto_id: selectedProduct.id,
          quantidade: quantity,
          preco_unitario: selectedProduct.preco,
          subtotal: selectedProduct.preco * quantity,
        },
      ],
    };

    addSale(sale);
    updateProductStock(selectedProduct.id, quantity); // Aqui, a função vai diminuir o estoque conforme esperado
    setIsModalVisible(false);
  };

  return (
    <div>
      <h2>Produtos</h2>
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={products}
        renderItem={(product) => (
          <List.Item>
            <Card
              title={product.nome}
              extra={
                <Button
                  onClick={() => {
                    setSelectedProduct(product);
                    setIsModalVisible(true);
                  }}
                >
                  Vender
                </Button>
              }
            >
              <p>Preço: R${product.preco.toFixed(2)}</p>
              <p>Estoque: {product.estoque_atual}</p>
            </Card>
          </List.Item>
        )}
      />

      <Modal
        title="Registrar Venda"
        open={isModalVisible}
        onOk={handleAddSale}
        onCancel={() => setIsModalVisible(false)}
      >
        <p>Quantidade:</p>
        <InputNumber
          min={1}
          value={quantity}
          onChange={(value) => setQuantity(value ?? 1)}
        />
      </Modal>
    </div>
  );
};

export default ProductPage;
