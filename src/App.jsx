import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "./index.css";

import NavBar from "./components/NavBar";
import ProdutosList from "./components/ProdutosList";
import AddProduct from "./components/AddProduct";
import Login from "./components/Login";
import ProdutoDetail from "./components/ProdutoDetail";
import ProtectedRoute from "./components/ProtectedRoute";
import { supabase } from "./supabaseClient";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Pega a sessão atual
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Escuta mudanças na autenticação
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  if (loading) return <p>Carregando...</p>;

  return (
    <BrowserRouter>
      <NavBar user={user} onSearch={setSearchQuery} />
      <main>
        <Routes>
          {/* Rota protegida: só acessa se logado */}
          <Route
            path="/"
            element={
              <ProtectedRoute user={user}>
                <ProdutosList searchQuery={searchQuery} />
              </ProtectedRoute>
            }
          />

          {/* Outra rota protegida */}
          <Route
            path="/add"
            element={
              <ProtectedRoute user={user}>
                <AddProduct />
              </ProtectedRoute>
            }
          />

          {/* Página do produto detalhado */}
          <Route
            path="/produto/:id"
            element={
              <ProtectedRoute user={user}>
                <ProdutoDetail />
              </ProtectedRoute>
            }
          />

          {/* Login só para quem NÃO está logado */}
          <Route
            path="/login"
            element={
              <ProtectedRoute user={user} redirectIfLoggedIn>
                <Login />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
