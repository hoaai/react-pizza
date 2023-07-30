import React from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const FullPizza: React.FC = () => {
   const [pizza, setPizza] = React.useState<{
      imageUrl: string;
      title: string;
      price: number;
   }>();
   const { id } = useParams();
   const navigate = useNavigate();

   React.useEffect(() => {
      async function fetchPizza() {
         try {
            const response = await axios.get(
               'https://64a955088b9afaf4844a8e20.mockapi.io/items/' + id,
            );
            setPizza(response.data);
            console.log(response.data);
         } catch (error) {
            console.log(error);
            navigate('/');
         }
      }
      fetchPizza();
   }, []);

   if (!pizza) {
      return 'Загрузка.......';
   }
   return (
      <div className="container">
         <img src={pizza.imageUrl} alt="" />
         <h2>{pizza.title}</h2>

         <h4>{pizza.price} ₽</h4>
      </div>
   );
};

export default FullPizza;
