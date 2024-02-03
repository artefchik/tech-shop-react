import { getCart } from 'entities/Cart/model/slice/cartSlice';
import { useSelector } from 'react-redux';

export const getCartProducts = getCart.selectAll;
