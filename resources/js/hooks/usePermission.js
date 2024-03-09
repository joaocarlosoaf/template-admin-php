import { useState, useEffect } from "react";
import { perfisAcessoMap } from "../utils/perfilAcesso";

const usePermission = () => {
  
  const [usuarioLogado, setUsuarioLogado] = useState(JSON.parse(localStorage.getItem("user")));

  useEffect(() => {

    const handleStorageChange = (e) => {
      if (e.key === "user") {
        setUsuarioLogado(JSON.parse(e.newValue));
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
    
  }, []);


  const canAccess = (perfisAcesso) => {
    return perfisAcesso.includes(
      perfisAcessoMap[usuarioLogado?.user_group_id]
    );
  };

  return {
    canAccess,
  };
};

export { usePermission };
