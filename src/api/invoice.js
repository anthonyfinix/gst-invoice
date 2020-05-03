export async function addNewInvoice(data) {
    let client = await fetch(
        'http://localhost:3100/invoices/',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                invoiceNo: data.invoiceNo,
                client: data.client,
                created: data.created,
                products: data.products,
                draft: data.draft,
            })
        })
    .then(res => res.json())
    return client;
}