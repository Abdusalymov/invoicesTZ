$(function() {
    const el = $('#app');
    const mainTemplate = Handlebars.compile($('#main-template').html());
    const createInvoiceTemplate = Handlebars.compile($('#create-invoice-template').html());
    const errorTemplate = Handlebars.compile($('#error-template').html());

    var router = new Router({
        mode: 'hash',
        root: '/index.html',
        hooks: {
            before: function (newPage) {
                console.info('Before page loads hook', newPage);
            }
        },
        page404: function (path) {
            console.log('"/' + path + '" Page not found');
            let html = errorTemplate();
            el.html(html);
        }
    });
    router
            .add('', function () {
                console.log('Home page!!!!');
                let html = mainTemplate();
                el.html(html);
                $.getInvoices();

            })
            .add('create', function () {
                console.log('create Invoice page!!!!');
                let html = createInvoiceTemplate();
                el.html(html);
            })
            .check()
            .addUriListener()
            .refresh();

            $('a').on('click', function(event){
                // Block browser page load
                event.preventDefault();
                const target = $(event.target);
                // Navigate to clicked url
                const href = target.attr('href');
                router.navigateTo(href);
            });


    window.router = router;

})


$.getInvoices = function (){
    $.ajax({
        url: "https://json-server-invoices.herokuapp.com/invoices",
        type: "GET",
        error: function(){
            console.log('fail getinvoices');
        },
        success: function(data){
            removeOldListInvoices()
            updateListInvoices(data);
        },
    });
}

function removeOldListInvoices(){
    $( "#tbody" ).remove();
}


function updateListInvoices(data){
    $('#table-invoices').append(
        `<tbody id="tbody">${data.map(n =>
            `<tr>
            <td>${n.date_created}</td>
            <td>INV-${n.number}</td>
            <td>${n.date_supply}</td>
            <td>${n.comment}</td>
            <td>
                <button type="button" class="del btn btn-primary" id=${n.id}>
                    Delete
                </button>
            </td>
            </tr>`).join('')}
        </tbody>`
    );
}