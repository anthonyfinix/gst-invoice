export default (products)=>{
    let grandTotal = 0;
    products.forEach(product=>{
        grandTotal = grandTotal + (product.qty * product.price);
    })
    return grandTotal;
}