import React from 'react'

export default props => {
  if (!props.cart.length) return ''

  return (
    <table className="cart">
      <tbody>
        <tr>
          <td colSpan="3">
            <h2>Cart</h2>
          </td>
        </tr>
        <tr>
          <th>Item</th>
          <th>Quantity</th>
          <th>Total Price</th>
        </tr>

        {props.cart.map((value, index) => {
          return (
            <tr key={index}>
              <td>{value.product.name}</td>
              <td>{value.quantity}</td>
              <td>${value.quantity * value.product.price}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
