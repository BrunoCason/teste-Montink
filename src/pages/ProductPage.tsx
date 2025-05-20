import { useEffect, useState } from "react";
import { ImageGallery } from "../components/ImageGallery";
import { CEPChecker } from "../components/CEPChecker";
import { VariantSelector } from "../components/VariantSelector";
import type { Product } from "../types/Product";

const ProductPage = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [mainImage, setMainImage] = useState<string>("");
  const [selectedVariants, setSelectedVariants] = useState<string[]>([]);
  const [stockMessage, setStockMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          "https://empreender.nyc3.cdn.digitaloceanspaces.com/static/teste-prod-1.json",
          {
            method: "GET",
          }
        );
        const data: Product = await res.json();
        setProduct(data);
        setMainImage(data.image_url);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, []);

  const checkInventory = (selected: string[]) => {
    if (!product) return;

    const allSelected =
      selected.length === product.options.length && selected.every((v) => v);
    if (!allSelected) {
      setStockMessage(null);
      return;
    }

    const matchingVariant = product.variants.find((variant) =>
      selected.every((value) => variant.values.includes(value))
    );

    if (matchingVariant) {
      setStockMessage(
        matchingVariant.inventory_quantity > 0
          ? "Produto disponível em estoque!"
          : "Produto indisponível no momento."
      );
    }
  };

  const handleVariantSelect = (index: number, value: string) => {
    const updated = [...selectedVariants];
    updated[index] = value;
    setSelectedVariants(updated);
    checkInventory(updated);
  };

  const handleBuy = async () => {
    if (!product) return alert("Produto não encontrado");

    const allSelected =
      selectedVariants.length === product.options.length &&
      selectedVariants.every(Boolean);
    if (!allSelected) return alert("Selecione todas as variantes");

    const matchingVariant = product.variants.find((variant) =>
      selectedVariants.every((value) => variant.values.includes(value))
    );
    if (!matchingVariant || matchingVariant.inventory_quantity <= 0) {
      return alert("Produto indisponível");
    }

    const payload = [
      {
        values: selectedVariants,
        quantity: 1,
        product_id: product.id,
        variant_id: matchingVariant.id,
      },
    ];

    try {
      const res = await fetch(
        "https://app.landingpage.com.br/api/checkoutloja/LPL2gc/5d87eb644e5631bc6a03f1e43a804e1c",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data?.message || "Erro no checkout");

      alert("Enviado para o checkout com sucesso!");
    } catch (error) {
      alert("Erro ao enviar para o checkout" + error);
    }
  };

  if (!product) {
    return <p>Carregando</p>;
  }

  return (
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-center gap-8 p-4">
      <ImageGallery
        images={product.images}
        mainImage={mainImage}
        onSelect={setMainImage}
      />
      <div>
        <h1 className="text-2xl font-semibold py-5">{product.title}</h1>
        <div className="border border-gray-200 mb-4">
          <div className="space-y-2 bg-gray-100 border-b border-gray-300 px-4 py-6">
            <p className="text-xl font-bold">
              {`R$ ${Number(product.variants[0].price)
                .toFixed(2)
                .replace(".", ",")}`}
            </p>
          </div>

          <div className="p-4 space-y-5">
            {product.options.map((label, index) => (
              <VariantSelector
                key={label}
                label={label}
                options={product.values[index]}
                selected={selectedVariants[index] || null}
                onSelect={(value) => handleVariantSelect(index, value)}
              />
            ))}
            {stockMessage && (
              <div className="mt-4 text-sm font-medium text-gray-700">
                {stockMessage}
              </div>
            )}

            <CEPChecker />

            {stockMessage && (
              <button
                onClick={handleBuy}
                className="mt-4 px-6 py-3 bg-black text-white rounded hover:bg-gray-800 transition-all"
              >
                Comprar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
