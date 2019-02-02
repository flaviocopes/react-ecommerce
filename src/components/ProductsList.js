import React from 'react'

export default props => {
  const deleteProduct = index => {
    props.deleteProduct(index)
  }

  return (
    <div className='products-list'>
      {props.products
        ? props.products.map((value, index) => {
            return (
              <div
                key={index}
                onClick={() => props.history.push('/product/' + value.slug)}>
                <img src={value.image} />
                <h2>{value.name}</h2>
                <p className='description'>{value.description}</p>
                <p className='price'>${value.price}</p>
                <button
                  onClick={e => {
                    deleteProduct(index)
                    e.stopPropagation()
                  }}>
                  ⓧ
                </button>
              </div>
            )
          })
        : 'No products'}
    </div>
  )
}
