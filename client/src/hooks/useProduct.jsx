import { useEffect, useState } from "react";
import { productApi } from "../api/productApi";

export const useProduct = (id) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const GetClientOneProduct = async () => {
      try {
        const response = await productApi.GetClientOneProduct(id);
        setProduct(response);
      } catch (err) {
        console.error(err);
      }
    };

    GetClientOneProduct();
  }, [id]);

  return product;
};
