// $(function() {
   
    // $.ajax({
    //     url: "https://json-server-invoices.herokuapp.com/invoices",
    //     type: "GET",
    //     error: function(){
    //         console.log('fail getinvoices');
    //     },
    //     success: function(data){
    //         $('#example').append(
    //             `<tbody>${data.map(n =>
    //                 `<tr>
    //                 <td>${n.date_created}</td>
    //                 <td>INV-${n.number}</td>
    //                 <td>${n.date_supply}</td>
    //                 <td>${n.comment}</td>
    //                 </tr>`).join('')}
    //             </tbody>`
    //         );
    //     },
    // });

    // axios.get('https://json-server-invoices.herokuapp.com/invoices')
    //     .then(function (response) {
    //         $('#example').append(
    //             `<tbody>${response.data.map(n =>
    //                 `<tr>
    //                 <td>${n.date_created}</td>
    //                 <td>INV-${n.number}</td>
    //                 <td>${n.date_supply}</td>
    //                 <td>${n.comment}</td>
    //                 </tr>`).join('')}
    //             </tbody>`
    //         );
    //     })
    //     .catch(function (error) {
    //         // handle error
    //         console.log(error);
    //     })
// })