import { END_POINT } from "@/config/endPoint";
import { ERROR_MESSAGES } from "@/constants/messages";
import { basicToken } from "@/utils/auth";
import { CartItems } from "@/types/products";
import SERVER_URL from "@/config/serverUrl";

export const getCartItems = async (): Promise<CartItems[]> => {
  const response = await fetch(SERVER_URL.apiUrl + END_POINT.cartItems, {
    method: "get",
    headers: { Authorization: basicToken },
  });

  if (!response.ok) {
    throw new Error(ERROR_MESSAGES.failGetCartItems);
  }

  const data = await response.json();
  return data.content;
};

export interface PostCartItemParams {
  productId: number;
  quantity: number;
}

export async function postCartItem({ productId, quantity }: PostCartItemParams): Promise<Response> {
  const response = await fetch(`${SERVER_URL.apiUrl + END_POINT.cartItems}`, {
    method: "POST",
    headers: { Authorization: basicToken, "Content-Type": "application/json" },
    body: JSON.stringify({ productId, quantity }),
  });

  if (!response.ok) {
    throw new Error(ERROR_MESSAGES.failPostCartItem);
  }

  return response;
}

export interface DeleteCartItemParams {
  productId: number;
}

export async function deleteCartItem({ productId }: DeleteCartItemParams): Promise<Response> {
  const response = await fetch(`${SERVER_URL.apiUrl + END_POINT.cartItems}/${productId}`, {
    method: "DELETE",
    headers: { Authorization: basicToken, "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error(ERROR_MESSAGES.failDeleteCartItem);
  }

  return response;
}
