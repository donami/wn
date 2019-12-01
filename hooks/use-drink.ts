import { useSelector } from 'react-redux';
import {
  getSelectedDrink,
  getIngredientsForDrink,
} from '../redux/selectors/drinks';

const useDrink = () => {
  const drink = useSelector(state => getSelectedDrink(state));
  const ingredients = useSelector(state => getIngredientsForDrink(state));

  return { drink, ingredients };
};

export default useDrink;
