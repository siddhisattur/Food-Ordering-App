import { useContext, useState } from 'react';
import Order from './Order';
import './Cart.module.css';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';

const Cart = (props) => {

  const [click,setClick] = useState(false);

  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );


  return (
<>
    {click ? <Modal onClose={props.onClose}>
      <div style={{backgroundColor:'green',padding:10,borderRadius:10}}>
      <h3 style={{color:'white'}}>Thank you.</h3>
    <h3 style={{color:'white'}}>Your Order is on the Way!!!</h3>
      </div>
      
      <h2>Successfully Ordered following items :</h2>
      {
          
          cartCtx.items.map((item) => {return  <div key={item.id}>
          
          <div className='status-div'>
            <h3 className='item-ordered'>{item.name} - {item.amount}</h3>
            
            </div>
          </div>})

          
      }
      <h3 style={{color:'green'}}>Enjoy :) </h3>
      <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onClose}>
        Okay
      </button>
      </div>
      
      
    </Modal> : 
    <Modal onClose={props.onClose}>
    {cartItems}
    <div className={classes.total}>
      <span>Total Amount</span>
      <span>{totalAmount}</span>
    </div>
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onClose}>
        Close
      </button>
      {hasItems && <button className={classes.button} onClick={(e) => setClick(true)} >{click ? `Successfully purchased ${cartCtx.items[0].name + " and " + cartCtx.items[1].name}` : "Order"}</button>}
    </div>
  </Modal>
}
   

</>
  );
};

export default Cart;