import React from 'react';
import productData from '../../../helpers/data/productData';
import productTypeData from '../../../helpers/data/productTypeData';
import './ProductsByCategory.scss';
import Product from '../../shared/Product/Product';

class ProductsByCategory extends React.Component {
  state = {
    productType: {},
    products: [],
  }

  getProductData = (ProductTypeId) => {
    productData.getProductsByCategory(ProductTypeId)
      .then((products) => this.setState({ products }))
      .catch((err) => console.error('error in get products by category', err));
  }

  componentDidMount() {
    const { productTypeId } = this.props.match.params;
    productTypeData.getProductTypeById(productTypeId)
      .then((response) => {
        this.setState({ productType: response.data });
        this.getProductData(productTypeId);
      })
      .catch((err) => console.error('error in get single product type', err));
  }

  render() {
    const {
      productType,
      products,
    } = this.state;

    return (
      <div className="ProductsByCategory">
        <h1 className="productTypeName">{productType.name}</h1>
        <div className="productCardSection">
          {products == null ? [] : products.map((product) => <Product key={product.id} product={product} />) }
        </div>
      </div>
    );
  }
}

export default ProductsByCategory;
