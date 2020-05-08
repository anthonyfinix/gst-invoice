export async function addNewInvoice(data) {
    let client = await fetch(
        'http://localhost:3100/invoices/',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                invoiceNo: data.invoiceNo,
                client: data.client,
                created: data.created,
                dueDate: data.dueDate,
                products: data.products,
                status: data.status,
                total: data.total,
            })
        })
    .then(res => res.json())
    return client;
}