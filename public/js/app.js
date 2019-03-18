$(function() {
    const el = $('#app');
    const mainTemplate = Handlebars.compile($('#main-template').html());
    // const ratesTemplate = Handlebars.compile($('#rates-template').html());
    const createInvoiceTemplate = Handlebars.compile($('#create-invoice-template').html());

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
        }
    });
    router
            .add('', function () {
                console.log('Home page!!!!');
                let html = mainTemplate();
                el.html(html);
                getInvoices();

            })
            .add('create', function () {
                console.log('create Invoice page!!!!');
                let html = createInvoiceTemplate();
                el.html(html);
            })
            .add('search', function () {
                console.log('Search Page');
                document.getElementById('app').innerHTML = 'Search for: ' + this.query.q;
            }, {
                unloadCb: function (async) {
                    if (async){
                        console.warn("You have unsaved data!");
                        return confirm("You have unsaved data! Continue?");
                    }
                    return false;
                }
            })
            .add('hello/(:any)', function (name) {
                console.log('Hello, ' + name, this.state);
                document.getElementById('app').innerHTML = 'Hello, ' + name;
            })
            .add('about', function () {
                console.log('About Page!!!');
                document.getElementById('app').innerHTML = 'About Page';
            })
            .remove('about')
            .check()
            .addUriListener()
            // .navigateTo('hello/World', {foo: "bar"})
            .refresh();

            $('a').on('click', function(event){
                // Block browser page load
                event.preventDefault();
                console.log('event work!!!')
                // Highlight Active Menu on Click
                const target = $(event.target);
                // $('.item').removeClass('active');
                // target.addClass('active');
                
                // Navigate to clicked url
                const href = target.attr('href');
                console.log(href);
                // const path = href.substr(href.lastIndexOf('/'));
                // console.log(path);
                router.navigateTo(href);
            });
    window.router = router;

})


function getInvoices(){
    $.ajax({
        url: "https://json-server-invoices.herokuapp.com/invoices",
        type: "GET",
        error: function(){
            console.log('fail getinvoices');
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