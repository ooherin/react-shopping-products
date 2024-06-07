import { CartItems } from "@/types/products.ts";
import * as S from "@/components/cart/CartItem/style";
import TextBox from "@/components/_common/TextBox/index.tsx";
import QuantityUpdateButton from "@/components/QuantityUpdateButton/index.tsx";
import Button from "@/components/_common/Button";
import { useDeleteCartItemMutation } from "@/hooks/server/useCartItems";
import { theme } from "@/styles/theme";
import { convertProductIdToCartId, getQuantityInCart } from "@/utils/cart";

const formatToWon = (price: number) => {
  return price.toLocaleString();
};

const CartItem = ({ item, cartItems }: { item: CartItems; cartItems: CartItems[] }) => {
  const { product } = item;
  const { name, imageUrl, price, id } = product;

  const quantity = getQuantityInCart(cartItems, id);
  const cartId = convertProductIdToCartId(cartItems, id);

  const onDeleteCartItemMutation = useDeleteCartItemMutation({ cartId: cartId! });

  const onClickDeleteCartItem = onDeleteCartItemMutation.mutate;

  return (
    <S.ItemWrapper>
      <S.ItemInfoBox>
        <S.ItemImgBox $imageUrl={imageUrl} />
        <S.ItemInfoTextBox>
          <TextBox type="small" text={name} />
          <TextBox type="xSmall" text={formatToWon(price)} />
          <QuantityUpdateButton quantity={quantity} cartId={cartId!} />
          <S.DeleteButton>
            <Button
              borderType={"round"}
              disabled={false}
              backgroundColor={"white"}
              textColor="black"
              position="basic"
              borderColor={theme.COLOR["grey2"]}
              onClick={onClickDeleteCartItem}
              width={40}
              height={24}
              fontSize={12}
            >
              삭제
            </Button>
          </S.DeleteButton>
        </S.ItemInfoTextBox>
      </S.ItemInfoBox>
    </S.ItemWrapper>
  );
};

export default CartItem;