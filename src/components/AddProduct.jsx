import { useState } from "react";
import { supabase } from "./supabaseClient"; // ajuste o caminho se necessário
import "./AddProduct.css";

function AddProduct() {
  const familias = ["Spot On", "Linear", "Diffuse"];
  const produtos = ["Nub", "inFinit", "Tua"];
  const ips = ["IP20", "IP44", "IP65"];
  const aplicacoes = ["Recessed", "Surface", "Pendant"];

  const [form, setForm] = useState({
    code: "",
    familia: "",
    name: "",
    ip: "",
    aplicacao: "Recessed",
    fm: false,
    image_url:
      "https://ntxziswczaigmgvlvwep.supabase.co/storage/v1/object/public/imagens/thumbs/placeholder-image.jpg",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.from("produtos").insert([form]);

    if (error) {
      alert("Erro ao adicionar produto: " + error.message);
    } else {
      alert("Produto adicionado com sucesso!");
      setForm({
        code: "",
        familia: "",
        name: "",
        ip: "",
        aplicacao: "Recessed",
        fm: false,
        image_url:
          "https://ntxziswczaigmgvlvwep.supabase.co/storage/v1/object/public/imagens/thumbs/placeholder-image.jpg",
      });
    }
  };

  return (
    <form className="add-product" onSubmit={handleSubmit}>
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

      <button type="submit">Add</button>
    </form>
  );
}

export default AddProduct;
