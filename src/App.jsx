import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Item } from "./components/Item.jsx";
import { addProduct } from "./actions/addProduct.js";

const App = () => {
   const [captionValue, setCaptionValue] = useState('');
   const [amountValue, setAmountValue] = useState('');
   const productList = useSelector((state) => state.products);
   const dispatch = useDispatch();

   const handleFormSubmit = (e) => {
      e.preventDefault();

      const parsedAmount = parseFloat(amountValue);

      if (!isNaN(parsedAmount) && parsedAmount > 0) {
         dispatch(
            addProduct({
              id: Date.now(),
              caption: captionValue,
              amount: amountValue,
            })
          );

         setCaptionValue('');
         setAmountValue('');
      } else {

         alert('Please enter a valid positive number for amount.');
      }
   };

   return (
      <div className="wrapper">
         <h1 className="products">Список покупок</h1>
         <form className="form" onSubmit={handleFormSubmit}>
            <div className="form__caption">
               <label htmlFor="caption">Caption:</label>
               <input
                  type="text"
                  id="caption"
                  value={captionValue}
                  onChange={(e) => setCaptionValue(e.target.value)}
                  required />
            </div>
            <div className="form__amount">
               <label htmlFor="amount">Amount:</label>
               <input
                  type="number"
                  id="amount"
                  value={amountValue}
                  onChange={(e) => setAmountValue(e.target.value)}
                  required />
            </div>
            <button type="submit" className="form__btn">Add</button>
         </form>
         <ul className="products-list">
            {productList.map(({ caption, amount, id }) => (
               <Item caption={caption} amount={amount} id={id} key={id} />
            ))}
         </ul>
      </div>
   );
}

export default App;
