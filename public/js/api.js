function getInvoices() {
    $.ajax({
        url: "https://json-server-invoices.herokuapp.com/invoices",
        error: function(){
            // will fire when timeout is reached
        },
        success: function(data){
            $('#example').append(
                `<tbody>${data.map(n =>
                    `<tr>
                    <td>${n.date_created}</td>
                    <td>INV-${n.number}</td>
                    <td>${n.date_supply}</td>
                    <td>${n.comment}</td>
                    </tr>`).join('')}
                </tbody>`
            );
        },
    });
}


$(function() {
    setTimeout(getInvoices, 0);
})


