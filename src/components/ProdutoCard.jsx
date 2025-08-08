import { useNavigate } from "react-router-dom";
import Chip from "./Chip";
import "./ProdutoCard.css";

function ProdutoCard({ produto }) {
  const navigate = useNavigate();

  if (!produto) return <div>Produto não encontrado</div>;

  // Função para calcular dias restantes
  const calcularDiasRestantes = (dataEntrega) => {
    if (!dataEntrega) return null;
    const hoje = new Date();
    const entrega = new Date(dataEntrega);
    const diffMs = entrega - hoje;
    return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  };

  const diasRestantes = calcularDiasRestantes(produto.data_entrega);
  const isUrgente = diasRestantes !== null && diasRestantes >= 0 && diasRestantes <= 3;

  return (
    <div className={`card ${isUrgente ? "card-urgente" : ""}`}>
      <img
        src={`https://ntxziswczaigmgvlvwep.supabase.co/storage/v1/object/public/imagens/thumbs/${produto.name}/Tb_${produto.name}_${produto.aplicacao}.jpg`}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = produto.image_url;
        }}
        alt={produto.name}
        className="card-img"
      />
      <div className="card-content">
        <div className="card-text">
          <p className="card-code">M5-{produto.code}</p>
          <h2 className="card-title">{produto.name}</h2>
          <p className="card-description">
            2700K, 5,6W, 280lm, 2700K, Medium 33°, ø28mm
          </p>
          <p className="card-ficha">{produto.fm}</p>

          {diasRestantes !== null && diasRestantes >= 0 && (
            <p className="card-entrega">
              Entrega em {diasRestantes} {diasRestantes === 1 ? "dia" : "dias"}
            </p>
          )}
          {diasRestantes < 0 && (
            <p className="card-entrega entregue">Produto já entregue</p>
          )}

          {isUrgente && (
            <p className="alerta-urgente">
              {diasRestantes} {diasRestantes === 1 ? "dia" : "dias"} {diasRestantes === 1 ? "" : "s"}
            </p>
          )}
        </div>

        <div className="card-buttons">
          {produto.ficha_url && (
            <a
              href={produto.ficha_url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-pdf"
            >
              PDF
            </a>
          )}

          <button
            onClick={() => navigate(`/produto/${produto.id}`)}
            className="btn btn-edit"
            aria-label={`Editar ficha do produto ${produto.name}`}
          >
            Editar Ficha
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProdutoCard;
