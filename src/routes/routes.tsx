import React from "react";
import { Route, Redirect } from "react-router-dom";

interface AuthRouteProps {
  component: React.ElementType;
  isPrivate?: boolean;
  path: string;
  exact?: boolean;
}

const AuthRoute = ({
  component: Component,
  isPrivate,
  ...rest
}: AuthRouteProps) => {
  const token: string | null = JSON.parse(
    `${localStorage.getItem("@conserta:accessToken")}`
  );

  // A prop render trata como será a renderição do componente Route.
  // Temos 4 possibilidades de autenticação:
  // 1 - Rota privada e usuário não logado -> direcionar para a home
  // 2 - Rota pública e usuário logado     -> direcionar para o dashboard
  // 3 - Rota pública e usuário não logado -> Renderizar o componente
  // 4 - Rota privada e usuário logado     -> Renderizar o componente

  return (
    <Route
      {...rest}
      render={() =>
        !!isPrivate === !!token ? (
          <Component />
        ) : (
          <Redirect to={isPrivate ? "/" : "/dashboard"} />
        )
      }
    />
  );
};

export default AuthRoute;
