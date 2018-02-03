const Telegraf = require('telegraf');
const fetch = require('node-fetch');
const news = require('./actions/news');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) => {
  console.log('started:', ctx.from.id);
  return ctx.reply('Halo kakak-kakak yang ganteng dan cantik, saya robot hayati, untuk sekarang hanya bisa ngecek bpi, hehe. monggo kontribusi biar saya makin pintar di https://github.com/probolinggo-dev/hayati-bot');
});
bot.hears(/(berita|news)/, async (ctx) => {
  const message = ctx.match.input;
  if (message.match(/((hari ini)|(dino iki)|selanjutnya)/i)) {
    responseText = await news.getNews();
    ctx.reply(responseText);
  }
})
bot.hears(/((terima kasih)|makasih|kesuwon|(matur nuwun))/, ctx => ctx.reply('macama kakak 😬'));
bot.hears(/(bpi|bitcoin)/i, async (ctx) => {
	const message = ctx.match.input;
	if (message.match(/((hari ini)|(dino iki))/i)) {
    const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice/idr.json');
    const data = await response.json();
		ctx.reply(`Harga bitcoin hari ini ${data.bpi.IDR.rate} IDR kakak ...`);
	}
});
bot.startPolling();
