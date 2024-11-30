import { Product } from "@/models";
import { api, ResponseAPI } from "@/utilities";
import { AxiosError } from "axios";

export interface ProductServices {
  createProduct: (
    name: string,
    description: string,
    price: number,
    stock: number,
    category_id: string,
    token: string
  ) => Promise<ResponseAPI>;
  updateProduct: (product: Product, token: string) => Promise<ResponseAPI>;
  deleteProduct: (id: number, token: string) => Promise<ResponseAPI>;
  getProduct: (id: number, token: string) => Promise<ResponseAPI>;
  getProducts: (token: string) => Promise<ResponseAPI>;
}

export class ProductServicesImpl implements ProductServices {
  async createProduct(
    name: string,
    description: string,
    price: number,
    stock: number,
    category_id: string,
    token: string
  ): Promise<ResponseAPI> {
    try {
      const { data } = await api.post<ResponseAPI>(
        "/product/create-product",
        { name, description, price, stock, category_id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return Promise.resolve(data);
    } catch (error) {
      const e = error as AxiosError & ResponseAPI;
      return Promise.reject(e.response?.data);
    }
  }

  async updateProduct(product: Product, token: string): Promise<ResponseAPI> {
    try {
      // Aquí podrías manejar el éxito, por ejemplo, almacenar un token o redirigir al usuario
      const { id, name, description, price, stock, category_id } = product;
      const { data } = await api.put<ResponseAPI>(
        `/product/update-product/${id}`,
        { name, description, price, stock, category_id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return Promise.resolve(data);
    } catch (error) {
      const e = error as AxiosError & ResponseAPI;
      return Promise.reject(e.response?.data);
    }
  }

  async deleteProduct(id: number, token: string): Promise<ResponseAPI> {
    try {
      const { data } = await api.delete<ResponseAPI>(
        `/product/delete-product/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Aquí podrías manejar el éxito, por ejemplo, almacenar un token o redirigir al usuario
      return Promise.resolve(data);
    } catch (error) {
      const e = error as AxiosError & ResponseAPI;
      return Promise.reject(e.response?.data);
    }
  }

  async getProduct(id: number, token: string): Promise<ResponseAPI> {
    try {
      // Aquí podrías manejar el éxito, por ejemplo, almacenar un token o redirigir al usuario
      const { data } = await api.get<ResponseAPI>(
        `/product/get-product/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return Promise.resolve(data);
    } catch (error) {
      const e = error as AxiosError & ResponseAPI;
      return Promise.reject(e.response?.data);
    }
  }

  async getProducts(token: string): Promise<ResponseAPI> {
    try {
      // Aquí podrías manejar el éxito, por ejemplo, almacenar un token o redirigir al usuario
      const { data } = await api.get<ResponseAPI>("/product/get-products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return Promise.resolve(data);
    } catch (error) {
      const e = error as AxiosError & ResponseAPI;
      return Promise.reject(e.response?.data);
    }
  }
}
