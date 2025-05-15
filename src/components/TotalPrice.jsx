
const TotalPrice = ({ cart }) => {
  const totalPrice = cart
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <p className="cart-price">Total: €{totalPrice}</p>
  );
};

export default TotalPrice;