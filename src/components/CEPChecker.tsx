import { useState, useEffect } from "react";
import type { ViaCep } from "../types/CEP";

export const CEPChecker = () => {
  const [cep, setCep] = useState<string>("");
  const [address, setAddress] = useState<string | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const savedCep = localStorage.getItem("cep");
    if (savedCep) {
      setCep(savedCep);
    }
  }, []);

  const checkCEP = async () => {
    const formattedCep = cep.replace(/\D/g, "");
    if (formattedCep.length !== 8) {
      setError("CEP inválido");
      setAddress(null);
      return;
    }
    try {
      const res = await fetch(`https://viacep.com.br/ws/${formattedCep}/json/`);
      const data: ViaCep = await res.json();
      if (data.erro) {
        setError("CEP não encontrado");
        setAddress(null);
      } else {
        setAddress(
          `${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`
        );
        setError("");
      }
    } catch {
      setError("Erro ao buscar o CEP");
      setAddress(null);
    }
  };

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCep = e.target.value.replace(/\D/g, "").slice(0, 8);

    if (newCep.length > 5) {
      setCep(`${newCep.slice(0, 5)}-${newCep.slice(5)}`);
    } else {
      setCep(newCep);
    }

    localStorage.setItem("cep", newCep);
  };

  return (
    <div className="space-y-2">
      <label htmlFor="cep" className="block text-md font-medium">
        Verificar Entrega (CEP)
      </label>
      <div className="flex gap-4 items-center">
        <input
          type="text"
          id="cep"
          value={cep}
          onChange={handleCepChange}
          placeholder="00000-000"
          className="border px-5 py-2 text-sm text-gray-700 focus:outline-none"
        />
        <button
          onClick={checkCEP}
          className="bg-black text-white px-5 py-2 text-sm font-semibold cursor-pointer"
        >
          Verificar
        </button>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
      {address && <p className="text-sm">Entrega disponível para: {address}</p>}
    </div>
  );
};
