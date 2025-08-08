import { useEffect, useState } from "react";
import ProdutoCard from "./ProdutoCard";
import { createClient } from "@supabase/supabase-js";
import "./ProductsList.css";

const supabase = createClient(
  "https://ntxziswczaigmgvlvwep.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50eHppc3djemFpZ21ndmx2d2VwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0MzM5MTQsImV4cCI6MjA3MDAwOTkxNH0.hGHG8YL4tuDu3Bp_StaTDldt1IqOdAknX8Dh-KoOqYQ"
);

export default function ProdutosList({ searchQuery }) {
  const [produtos, setProdutos] = useState([]);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function fetchProdutos() {
      const { data, error } = await supabase.from("produtos").select();

      if (error) {
        setErro(error.message);
        return;
      }

      setProdutos(data);
    }

    fetchProdutos();
  }, []);

  if (erro) return <p>Erro ao buscar produtos: {erro}</p>;

  // Colunas onde queremos buscar
  const searchFields = ["name", "familia", "descricao", "code", "aplicacao", "ip", "fm"];

  // Filtro que verifica todas as colunas definidas acima
  const produtosFiltrados = produtos.filter((produto) =>
    searchFields.some(
      (field) =>
        produto[field] &&
        produto[field].toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="product-list container">
      {produtosFiltrados.map((produto) => (
        <ProdutoCard key={produto.id} produto={produto} />
      ))}
      {produtosFiltrados.length === 0 && <p>Nenhum produto encontrado.</p>}
    </div>
  );
}
