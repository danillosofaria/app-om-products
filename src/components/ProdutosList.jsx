import { useEffect, useState } from "react";
import ProdutoCard from "./ProdutoCard";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://ntxziswczaigmgvlvwep.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50eHppc3djemFpZ21ndmx2d2VwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0MzM5MTQsImV4cCI6MjA3MDAwOTkxNH0.hGHG8YL4tuDu3Bp_StaTDldt1IqOdAknX8Dh-KoOqYQ"
);

export default function ProdutosList() {
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

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "16px",
      }}
    >
      {produtos.map((produto) => (
        <ProdutoCard key={produto.id} produto={produto} />
      ))}
    </div>
  );
}
