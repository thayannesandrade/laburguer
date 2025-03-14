import React from "react";
import { List, Card } from "antd";
import { Sale, useStore } from "../context/StoreContext";

const SalesPage: React.FC = () => {
  const { sales } = useStore();
  
  return (
    <div>
      <h2>Vendas</h2>
      <List
        itemLayout="horizontal"
        dataSource={sales}
        renderItem={(sale: Sale) => (
          <List.Item>
            <Card title={`Venda ID: ${sale.id}`}>
              <p>Data: {new Date(sale.data).toLocaleString()}</p>
              <p>Total: R${sale.total.toFixed(2)}</p>
              <p>Itens:</p>
              <ul>
                {sale.items.map((item) => (
                  <li key={item.id}>
                    {item.quantidade}x {item.produto_id} - R${item.subtotal.toFixed(2)}
                  </li>
                ))}
              </ul>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default SalesPage;
