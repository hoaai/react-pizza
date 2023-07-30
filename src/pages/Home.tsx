import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import Categories from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination/Pagination';
import {
   selectFilter,
   setCategoryId,
   setCurrentPage,
   setFilters,
} from '../redux/slices/filterSlice';
import { fetchPizzas, selectPizzaData } from '../redux/slices/pizzaSlice';

export const Home: React.FC = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);
   const { items, status } = useSelector(selectPizzaData);

   const isSearch = React.useRef(false);
   const isMounted = React.useRef(false);

   const onChangeCategory = (idx: number) => {
      dispatch(setCategoryId(idx));
   };

   const onChangePage = (page: number) => {
      dispatch(setCurrentPage(page));
   };

   const getPizzas = async () => {
      const sortBy = sort.sortProperty.replace('-', '');
      const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
      const category = categoryId > 0 ? `category=${categoryId}` : '';
      const search = searchValue > 0 ? `&search=${searchValue}` : '';
      dispatch(
         //@ts-ignore
         fetchPizzas({
            sortBy,
            order,
            category,
            search,
            currentPage,
         }),
      );
   };

   //Если изменили параметры и был первый рендер
   React.useEffect(() => {
      if (isMounted.current) {
         const queryString = qs.stringify({
            sortProperty: sort.sortProperty,
            categoryId,
            currentPage,
         });
         navigate(`?${queryString}`);
      }
      isMounted.current = true;
   }, [categoryId, sort.sortProperty, currentPage]);

   //Если был первый рендер то проверяем URL параметры и сохраняем в Redux
   React.useEffect(() => {
      if (window.location.search) {
         const params = qs.parse(window.location.search.substring(1));

         const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty);
         dispatch(
            setFilters({
               ...params,
               sort,
            }),
         );
         isSearch.current = true;
      }
   }, []);

   //Если был первый рендер, то запрашиваем пиццы
   React.useEffect(() => {
      window.scrollTo(0, 0);
      getPizzas();
   }, [categoryId, sort.sortProperty, searchValue, currentPage]);

   const pizzas = items
      .filter((obj: any) => obj.title.toLowerCase().includes(searchValue.toLowerCase()))
      .map((obj: any) => (
         <PizzaBlock key ={obj.id} {...obj}/>
      ));
   const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

   return (
      <div className="container">
         <div className="content__top">
            <Categories value={categoryId} onChangeCategory={onChangeCategory} />
            <Sort />
         </div>
         <h2 className="content__title">Все пиццы</h2>
         {status === 'error' ? (
            <div className="content__error-info">
               <h2>
                  Произошла ошибка <span>😕</span>
               </h2>
               <p>Не удалось получить пиццы. Попробуйте повторить попытку позже</p>
            </div>
         ) : (
            <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
         )}
         <Pagination currentPage={currentPage} onChangePage={onChangePage} />
      </div>
   );
};
