import { useEffect, useState } from "react";
import { productApi } from "../api/productApi";

export const useProduct = (id) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const GetOneProduct = async () => {
      try {
        const response = await productApi.GetOneProduct(id);
        setProduct(response);
      } catch (err) {
        console.error(err);
      }
    };

    GetOneProduct();
  }, [id]);

  return product;
};
