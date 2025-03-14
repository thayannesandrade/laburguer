import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const TitleUpdater: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/produtos") {
      document.title = "LaBurguer - Produtos";
    } else if (location.pathname === "/vendas") {
      document.title = "LaBurguer - Vendas";
    } else {
      document.title = "LaBurguer"; // Título padrão
    }
  }, [location]);

  return null;
};