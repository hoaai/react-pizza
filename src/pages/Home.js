import React from 'react';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import ReactPaginate from 'react-paginate';
import Pagination from '../components/Pagination/Pagination';

export const Home = ({ searchValue }) => {
   const [items, setItems] = React.useState([]);
   const [isLoading, setIsLoading] = React.useState(true);
   const [categoryId, setCategoryId] = React.useState(0);
   const [currentPage, setCurrentPage] = React.useState(1);
   const [sortType, setSortType] = React.useState({
      name: 'популярности',
      sortProperty: 'rating',
   });

   React.useEffect(() => {
      try {
         setIsLoading(true);

         const sortBy = sortType.sortProperty.replace('-', '');
         const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
         const category = categoryId > 0 ? `category=${categoryId}` : '';
         const search = searchValue > 0 ? `&search=${searchValue}` : '';

         fetch(
            `https://64a955088b9afaf4844a8e20.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
         )
            .then((res) => res.json())
            .then((result) => {
               setItems(result);
               setIsLoading(false);
            });
         window.scrollTo(0, 0);
      } catch (error) {
         console.error(error);
      }
   }, [categoryId, sortType, searchValue, currentPage]);

   const pizzas = items
      .filter((obj) => obj.title.toLowerCase().includes(searchValue.toLowerCase()))
      .map((obj) => <PizzaBlock key={obj.id} {...obj} />);
   const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

   return (
      <div className="container">
         <div className="content__top">
            <Categories value={categoryId} onClickCategory={(i) => setCategoryId(i)} />
            <Sort value={sortType} onClickSortType={(i) => setSortType(i)} />
         </div>
         <h2 className="content__title">Все пиццы</h2>
         <div className="content__items">{isLoading ? skeletons : pizzas}</div>
         <Pagination onChangePage={(number) => setCurrentPage(number)} />
      </div>
   );
};
