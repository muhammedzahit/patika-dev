const Koa = require('koa');
const app = new Koa();

messages = {"/index" : "<h1>INDEX SAYFASINA HOSGELDINIZ</h1>",
    "/hakkimda" : "<h1>HAKKIMDA SAYFASINA HOSGELDINIZ</h1>",
    "/iletisim" : "<h1>ILETISIM SAYFASINA HOSGELDINIZ</h1>"
}

app.use(async ctx => {
    if(ctx.url in messages){
        ctx.body = messages[ctx.url]
    }
    else{
        ctx.body = "<h1>404 SAYFA BULUNAMADI</h1>"
    }
});

app.listen(3000);