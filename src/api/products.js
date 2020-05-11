export async function getAllProducts() {
    let prdoucts = await fetch('http://localhost:3100/products/').then(res => res.json())
    return prdoucts;
}
export async function partialSearchProducttName(searchTerm) {
    let client = await fetch('http://localhost:3100/products/search/'+searchTerm,)
    .then(res => res.json())
    return client;
}
