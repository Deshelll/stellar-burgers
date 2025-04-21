import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from '../../services/store';
import {
  moveIngredient,
  removeIngredient
} from '../../services/slices/constructorSlice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const handleMoveDown = () => {
      dispatch(moveIngredient({ start: index, end: index + 1 }));
    };

    const handleMoveUp = () => {
      dispatch(moveIngredient({ start: index, end: index - 1 }));
    };

    const handleClose = () => {
      dispatch(removeIngredient(ingredient.uuid));
    };

    return (
      <BurgerConstructorElementUI
        key={ingredient.uuid}
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
