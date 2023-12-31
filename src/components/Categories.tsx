import React from 'react';

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

type CategoriesProps = {
   value: number;
   onChangeCategory: (i: number) => void;
};

const Categories: React.FC<CategoriesProps> = React.memo (({ value, onChangeCategory }) => {

	
   return (
      <div className="categories">
         <ul>
            {categories.map((categoryName, i) => {
               return (
                  <li
                     key={i}
                     onClick={() => onChangeCategory(i)}
                     className={value === i ? 'active' : ''}>
                     {categoryName}
                  </li>
               );
            })}
         </ul>
      </div>
   );
});

export default Categories;
