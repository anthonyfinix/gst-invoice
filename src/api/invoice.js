export async function getAllInvoices() {
    let invoices = await fetch('http://localhost:3100/invoices/').then(res => res.json())
    return invoices;
}
export async function addNewInvoice(data) {
    let invoice = await fetch(
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
    return invoice;
}

export async function deleteSingleInvoice(id) {
    let invoice = await fetch('http://localhost:3100/invoices/'+id, {method: 'DELETE'})
    .then(res => res.json())
    return invoice;
}