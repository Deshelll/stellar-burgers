import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { fetchUserOrders } from '../../services/slices/profileOrderSlice';

export const ProfileOrders: FC = () => {
  const orders = useSelector((store) => store.profileOrders.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);
  /** TODO: взять переменную из стора */
  //const orders: TOrder[] = [];

  return <ProfileOrdersUI orders={orders} />;
};
