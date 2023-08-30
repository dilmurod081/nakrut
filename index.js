const TelegramBot = require("node-telegram-bot-api");
const token = "6482104738:AAGy5nr-gVg_2k1ivaWRrRvoTvrnYMCBtqk";
const bot = new TelegramBot(token, { polling: true });
const adminid = "1489323475";
const untilDate = Math.floor(Date.now() / 1000) + 100;
const commands = [
  {
    command: "start",
    description: "botni qayta ishga tushirish♻️",
  },
];
bot.setMyCommands(commands);

bot.on("message", async (msg) => {
  const text = msg.text;
  const chatid = msg.chat.id;
  if (text == "/start") {
    await bot.sendMessage(
      chatid,
      `Assalomu alekum bizni nakrut botimizga hush kelibsz <b>${msg.from.username}</b>`,
      {
        parse_mode: "HTML",
        reply_markup: {
          keyboard: [
            ["Xizmatlar💡","Tolov qilish💳💰"],
            ["Balans💰","Referlar🔗"]
          ],
        },
      }
    );
    await bot.sendMessage(adminid, `Chat_id:${msg.from.id}`);
  }
  if (text == "Xizmatlar💡") {
    await bot.sendMessage(chatid, "Ijtimoiy tamoqlardan birini tanlang☺️👇", {
      reply_markup: {
        inline_keyboard: [
          // [{"Telegram 💚","TikTok 🖤"],["Youtube ❣️","Instagram ❤️"]
          [
            { text: "Telegram 💚", callback_data: "telegram" },
            { text: "TikTok 🖤", callback_data: "tiktok" },
          ],
          [
            { text: "Youtube ❣️", callback_data: "youtub" },
            { text: "Instagram ❤️", callback_data: "insta" },
          ],
        ],
      },
    });
  }
  if (text == "Referlar🔗") {
    await bot.sendMessage(
      chatid,
      `Dostingizni taklif qiling <code>${`https://t.me/nakrutkeabot?start=${msg.from.id}`}</code>`,
      {
        parse_mode: "HTML",
      }
    );
  }
  if (text == "Tolov qilish💳💰") {
    bot.sendMessage(
      chatid,
      "Tolov qilgandan song pulingiz qaytarib berilmaydi shuni unutmang❗",
      {
        reply_markup: {
          inline_keyboard: [[{ text: "Tolov", callback_data: "tolov" }]],
        },
      }
    );
  }
});
bot.on("callback_query", async (ctx) => {
  try {
    switch (ctx.data) {
      case "telegram":
        await bot.editMessageText("Xizmatlarni tanlang☺️👇", {
          chat_id: ctx.from.id,
          message_id: ctx.message.message_id,
        }),
          await bot.editMessageReplyMarkup(
            {
              inline_keyboard: [
                [{ text: "Obunachi👥", callback_data: "telegobun" }],
                [{ text: "ortga", callback_data: "orqa" }],
              ],
            },
            {
              chat_id: ctx.from.id,
              message_id: ctx.message.message_id,
            }
          );
        break;
      case "orqa":
        await bot.editMessageText("Ijtimoiy tamoqlardan birini tanlang☺️👇", {
          chat_id: ctx.from.id,
          message_id: ctx.message.message_id,
        });
        await bot.editMessageReplyMarkup(
          {
            inline_keyboard: [
              [
                { text: "Telegram 💚", callback_data: "telegram" },
                { text: "TikTok 🖤", callback_data: "tiktok" },
              ],
              [
                { text: "Youtube ❣️", callback_data: "youtub" },
                { text: "Instagram ❤️", callback_data: "insta" },
              ],
            ],
          },
          {
            chat_id: ctx.from.id,
            message_id: ctx.message.message_id,
          }
        );
        break;
      case "telegobun":
        await bot.editMessageReplyMarkup(
          {
            inline_keyboard: [
              [{ text: "Teskor obunachi⏳", callback_data: "teztelegobn" }],
              [{ text: "Sekin obunachi👥", callback_data: "sekobnteleg" }],
              [{ text: "Aralash obunachi👥", callback_data: "arobnteleg" }],
              [{ text: "ortga", callback_data: "orqaobn" }],
            ],
          },
          {
            chat_id: ctx.from.id,
            message_id: ctx.message.message_id,
          }
        );
        break;
      case "orqaobn":
        await bot.editMessageText("Xizmatlarni tanlang☺️👇", {
          chat_id: ctx.from.id,
          message_id: ctx.message.message_id,
        }),
          await bot.editMessageReplyMarkup(
            {
              inline_keyboard: [
                [{ text: "Obunachi👥", callback_data: "telegobun" }],
                [{ text: "ortga", callback_data: "orqa" }],
              ],
            },
            {
              chat_id: ctx.from.id,
              message_id: ctx.message.message_id,
            }
          );
        break;
      case "tolov":
        break;
    }
  } catch (err) {
    console.error(err);
  }
});
bot.on("successful_payment", async (ctx) => {
  try {
    await bot.sendDocument(
      ctx.chat.id,
      `./${ctx.successful_payment.invoice_payload}.txt`,
      {
        caption: `Спасибо за оплату ${ctx.successful_payment.invoice_payload}!`,
      }
    );
  } catch (error) {
    console.log(error);
  }
});

bot.on("voice",async fdg =>{
  await bot.sendMessage(fdg.chat.id,"Audio tarqatkan...")
  await bot.deleteMessage(fdg.chat.id,fdg.message_id)
})