import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children, redirectIfLoggedIn = false }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (loading) return <p>Carregando...</p>;

  // Se a rota for de login e o usuário já estiver logado
  if (redirectIfLoggedIn && user) {
    return <Navigate to="/" replace />;
  }

  // Se a rota exigir login e não estiver logado
  if (!redirectIfLoggedIn && !user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}
