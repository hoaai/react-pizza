import React from 'react';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

export const Home = () => {
   const [items, setItems] = React.useState([]);
   const [isLoading, setIsLoading] = React.useState(true);

   React.useEffect(() => {
      try {
         fetch('https://64a955088b9afaf4844a8e20.mockapi.io/items')
            .then((res) => res.json())
            .then((result) => {
               setItems(result);
               setIsLoading(false);
            });
      } catch (error) {
         console.error(error);
      }
   }, []);
   return (
      <>
         <div className="content__top">
            <Categories />
            <Sort />
         </div>
         <h2 className="content__title">Все пиццы</h2>
         <div className="content__items">
            {isLoading
               ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
               : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
         </div>
      </>
   );
};
