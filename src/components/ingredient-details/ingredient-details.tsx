import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import { useParams } from 'react-router';

export const IngredientDetails: FC = () => {
  const { id } = useParams();
  const ingredients = useSelector((state) => state.ingredients.items);
  const ingredientData = ingredients.find((item) => item._id === id);
  /** TODO: взять переменную из стора */
  //const ingredientData = null;

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
