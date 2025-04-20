import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Route, Routes, useNavigate } from 'react-router';
import { ProtectedRoute } from '../Protected-Route';

const App = () => {
  const navigation = useNavigate();
  const goBack = () => navigation(-1);

  return (
    <div className={styles.app}>
      <AppHeader />

      <Routes>
        <Route path='*' element={<NotFound404 />} />
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />

        <Route
          path='/login'
          element={
            <ProtectedRoute>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Routes>
        <Route
          path='/feed/:number'
          element={
            <Modal
              title='Детали ингредиента'
              children={<OrderInfo />}
              onClose={goBack}
            />
          }
        />
        <Route
          path='/ingredients/:id'
          element={
            <Modal
              title='id'
              children={<IngredientDetails />}
              onClose={goBack}
            />
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <Modal
              title='number Order'
              children={<OrderInfo />}
              onClose={goBack}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
