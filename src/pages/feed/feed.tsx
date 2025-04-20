import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { fetchOrders } from '../../services/slices/feedSlice';

export const Feed: FC = () => {
  const orders = useSelector((state) => state.feed.orders);
  const isLoading = useSelector((state) => state.feed.isLoading);
  const dispatch = useDispatch();
  /** TODO: взять переменную из стора */
  //const orders: TOrder[] = [];

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  if (!orders.length || isLoading) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(fetchOrders());
      }}
    />
  );
};
