import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "./ProdutoDetail.css";

const familias = ["Spot On", "Linear", "Diffuse"];
const produtos = ["Nub", "inFinit", "Tua"];
const ips = ["IP20", "IP44", "IP65"];
const aplicacoes = ["Recessed", "Surface", "Pendant"];

export default function ProdutoDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    code: "",
    familia: "",
    name: "",
    ip: "",
    aplicacao: "Recessed",
    fm: false,
    data_entrega: "",
    ficha_url: "",
    image_url:
      "https://ntxziswczaigmgvlvwep.supabase.co/storage/v1/object/public/imagens/thumbs/placeholder-image.jpg",
  });

  const [loading, setLoading] = useState(true);

  // Puxa o produto do Supabase ao montar o componente
  useEffect(() => {
    async function fetchProduto() {
      const { data, error } = await supabase
        .from("produtos")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        alert("Produto não encontrado");
        navigate("/");
      } else {
        // Preenche o formulário com os dados do produto
        setForm({
          code: data.code || "",
          familia: data.familia || "",
          name: data.name || "",
          ip: data.ip || "",
          aplicacao: data.aplicacao || "Recessed",
          fm: data.fm || false,
          data_entrega: data.data_entrega || "",
          ficha_url: data.ficha_url || "",
          image_url: data.image_url || "https://ntxziswczaigmgvlvwep.supabase.co/storage/v1/object/public/imagens/thumbs/placeholder-image.jpg",
        });
      }
      setLoading(false);
    }
    fetchProduto();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Atualiza o produto no banco
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from("produtos")
      .update(form)
      .eq("id", id);

    if (error) {
      alert("Erro ao atualizar produto: " + error.message);
    } else {
      alert("Produto atualizado com sucesso!");
      navigate("/");
    }
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <form className="produto-detail container" onSubmit={handleSubmit}>
      <label htmlFor="code">Código M5:</label>
      <input
        type="text"
        id="code"
        name="code"
        value={form.code}
        onChange={handleChange}
        placeholder="M5-xxxx"
        required
      />

      <label htmlFor="familia">Família:</label>
      <select
        id="familia"
        name="familia"
        value={form.familia}
        onChange={handleChange}
        required
      >
        <option value="">-- Selecione --</option>
        {familias.map((familia) => (
          <option key={familia} value={familia}>
            {familia}
          </option>
        ))}
      </select>

      <label htmlFor="name">Produto:</label>
      <select
        id="name"
        name="name"
        value={form.name}
        onChange={handleChange}
        required
      >
        <option value="">-- Selecione --</option>
        {produtos.map((produto) => (
          <option key={produto} value={produto}>
            {produto}
          </option>
        ))}
      </select>

      <label htmlFor="ip">IP:</label>
      <select
        id="ip"
        name="ip"
        value={form.ip}
        onChange={handleChange}
        required
      >
        <option value="">-- Selecione --</option>
        {ips.map((ip) => (
          <option key={ip} value={ip}>
            {ip}
          </option>
        ))}
      </select>

      <label htmlFor="aplicacao">Aplicação:</label>
      <select
        id="aplicacao"
        name="aplicacao"
        value={form.aplicacao}
        onChange={handleChange}
      >
        {aplicacoes.map((opcao) => (
          <option key={opcao} value={opcao}>
            {opcao}
          </option>
        ))}
      </select>

      <label>
        FM?
        <input
          type="checkbox"
          name="fm"
          checked={form.fm}
          onChange={handleChange}
        />
      </label>

      <label htmlFor="data_entrega">Data de entrega:</label>
      <input
        type="date"
        id="data_entrega"
        name="data_entrega"
        value={form.data_entrega}
        onChange={handleChange}
        required
      />

      <label htmlFor="ficha_url">URL da Ficha Técnica (PDF):</label>
      <input
        type="url"
        id="ficha_url"
        name="ficha_url"
        value={form.ficha_url}
        onChange={handleChange}
        placeholder="https://exemplo.com/ficha.pdf"
      />

      <button type="submit">Salvar</button>
    </form>
  );
}
