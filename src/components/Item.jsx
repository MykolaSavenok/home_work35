import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeProduct } from "../actions/removeProduct";
import { editProduct } from "../actions/editProduct";


export const Item = ({ caption, amount, id }) => {
   const [isEditMode, setEditMode] = useState(false);
   const [captionText, setCaptionText] = useState(caption);
   const [amountValue, setAmountValue] = useState(amount);
   const dispatch = useDispatch();

   const deleteHandler = () => {
      dispatch(removeProduct({ id }));
   };

   const editHandler = () => {
      if (isEditMode) {
         dispatch(editProduct({
            id,
            caption: captionText,
            amount: amountValue,
         }));
      }

      setEditMode(!isEditMode);
   };

   const changeHandler = ({ target: { value, name } }) => {
      if (name === "caption") {
         if (value.length <= 15) {
            setCaptionText(value);
         }
      } else if (name === "amount") {
         const parsedAmount = parseFloat(value);
         if (!isNaN(parsedAmount) && parsedAmount <= 1000) {
            setAmountValue(parsedAmount.toString());
         }
      }
   };

   return (
      <li className="product-list">
         <div className="product-list__caption">
            {isEditMode ? (
               <input
                  type="text"
                  onChange={changeHandler}
                  value={captionText}
                  className="product-list__input"
                  name="caption"
               />
            ) : (
               <span>{captionText.trim()}</span>
            )}
         </div>
         <div className="product-list__amount">
            {isEditMode ? (
               <input
                  type="number"
                  onChange={changeHandler}
                  value={amountValue}
                  className="product-list__input"
                  name="amount"
               />
            ) : (
               <span>{amountValue}</span>
            )}
         </div>
         <div className="product-list__controls">
            <button className="product-list__button" onClick={editHandler}>
               {isEditMode ? "Save" : "Edit"}
            </button>
            <button className="product-list__button" onClick={deleteHandler}>
               X
            </button>
         </div>
      </li>
   );
};
