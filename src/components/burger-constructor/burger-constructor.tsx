import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  resetConstructor,
  sendOrder
} from '../../services/slices/constructorSlice';
import { Navigate, useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const constructorItems = useSelector(
    (state) => state.constructorIngredients.constructorItems
  );
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const orderRequest = useSelector(
    (state) => state.constructorIngredients.orderRequest
  );

  const orderModalData = useSelector(
    (state) => state.constructorIngredients.orderModalData
  );

  const user = useSelector((state) => state.auth.user);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    if (user) {
      const ingredientsId = [
        constructorItems.bun._id,
        ...constructorItems.ingredients.map((item) => item._id),
        constructorItems.bun._id
      ];

      dispatch(sendOrder(ingredientsId));
    } else {
      navigate('/login');
    }
  };

  const closeOrderModal = () => {
    dispatch(resetConstructor());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  //return null;

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
