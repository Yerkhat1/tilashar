-- Tілашар — content seed, GENERATED from assets/content.js.
-- Do not hand-edit: regenerate with  node tools/gen-seed.js  after changing content.js.
-- Apply after schema.sql. Idempotent: re-running updates rows in place.

insert into decks (id,title,description) values ('kazakh-core','Қазақ тілі','Everyday Kazakh: 20 topics, 185 words')
  on conflict (id) do update set title=excluded.title, description=excluded.description;

insert into units (id,deck_id,name_en,name_ru,icon,ord) values ('greetings','kazakh-core','Greetings','Приветствия','👋',0)
  on conflict (id) do update set name_en=excluded.name_en, name_ru=excluded.name_ru, icon=excluded.icon, ord=excluded.ord;
insert into units (id,deck_id,name_en,name_ru,icon,ord) values ('numbers','kazakh-core','Numbers 1–10','Числа 1–10','🔢',1)
  on conflict (id) do update set name_en=excluded.name_en, name_ru=excluded.name_ru, icon=excluded.icon, ord=excluded.ord;
insert into units (id,deck_id,name_en,name_ru,icon,ord) values ('phrases','kazakh-core','Everyday phrases','Повседневные фразы','💬',2)
  on conflict (id) do update set name_en=excluded.name_en, name_ru=excluded.name_ru, icon=excluded.icon, ord=excluded.ord;
insert into units (id,deck_id,name_en,name_ru,icon,ord) values ('food','kazakh-core','Food','Еда','🍞',3)
  on conflict (id) do update set name_en=excluded.name_en, name_ru=excluded.name_ru, icon=excluded.icon, ord=excluded.ord;
insert into units (id,deck_id,name_en,name_ru,icon,ord) values ('family','kazakh-core','Family','Семья','👨‍👩‍👧',4)
  on conflict (id) do update set name_en=excluded.name_en, name_ru=excluded.name_ru, icon=excluded.icon, ord=excluded.ord;
insert into units (id,deck_id,name_en,name_ru,icon,ord) values ('colors','kazakh-core','Colors','Цвета','🎨',5)
  on conflict (id) do update set name_en=excluded.name_en, name_ru=excluded.name_ru, icon=excluded.icon, ord=excluded.ord;
insert into units (id,deck_id,name_en,name_ru,icon,ord) values ('animals','kazakh-core','Animals','Животные','🐾',6)
  on conflict (id) do update set name_en=excluded.name_en, name_ru=excluded.name_ru, icon=excluded.icon, ord=excluded.ord;
insert into units (id,deck_id,name_en,name_ru,icon,ord) values ('body','kazakh-core','The body','Тело','🧍',7)
  on conflict (id) do update set name_en=excluded.name_en, name_ru=excluded.name_ru, icon=excluded.icon, ord=excluded.ord;
insert into units (id,deck_id,name_en,name_ru,icon,ord) values ('home','kazakh-core','Home','Дом','🏠',8)
  on conflict (id) do update set name_en=excluded.name_en, name_ru=excluded.name_ru, icon=excluded.icon, ord=excluded.ord;
insert into units (id,deck_id,name_en,name_ru,icon,ord) values ('time','kazakh-core','Time','Время','⏰',9)
  on conflict (id) do update set name_en=excluded.name_en, name_ru=excluded.name_ru, icon=excluded.icon, ord=excluded.ord;
insert into units (id,deck_id,name_en,name_ru,icon,ord) values ('weekdays','kazakh-core','Days of the week','Дни недели','📅',10)
  on conflict (id) do update set name_en=excluded.name_en, name_ru=excluded.name_ru, icon=excluded.icon, ord=excluded.ord;
insert into units (id,deck_id,name_en,name_ru,icon,ord) values ('nature','kazakh-core','Nature','Природа','🌳',11)
  on conflict (id) do update set name_en=excluded.name_en, name_ru=excluded.name_ru, icon=excluded.icon, ord=excluded.ord;
insert into units (id,deck_id,name_en,name_ru,icon,ord) values ('school','kazakh-core','School','Школа','🎒',12)
  on conflict (id) do update set name_en=excluded.name_en, name_ru=excluded.name_ru, icon=excluded.icon, ord=excluded.ord;
insert into units (id,deck_id,name_en,name_ru,icon,ord) values ('city','kazakh-core','City & transport','Город и транспорт','🏙️',13)
  on conflict (id) do update set name_en=excluded.name_en, name_ru=excluded.name_ru, icon=excluded.icon, ord=excluded.ord;
insert into units (id,deck_id,name_en,name_ru,icon,ord) values ('clothes','kazakh-core','Clothes','Одежда','👕',14)
  on conflict (id) do update set name_en=excluded.name_en, name_ru=excluded.name_ru, icon=excluded.icon, ord=excluded.ord;
insert into units (id,deck_id,name_en,name_ru,icon,ord) values ('verbs','kazakh-core','Verbs','Глаголы','🏃',15)
  on conflict (id) do update set name_en=excluded.name_en, name_ru=excluded.name_ru, icon=excluded.icon, ord=excluded.ord;
insert into units (id,deck_id,name_en,name_ru,icon,ord) values ('opposites','kazakh-core','Opposites','Противоположности','↔️',16)
  on conflict (id) do update set name_en=excluded.name_en, name_ru=excluded.name_ru, icon=excluded.icon, ord=excluded.ord;
insert into units (id,deck_id,name_en,name_ru,icon,ord) values ('professions','kazakh-core','Professions','Профессии','💼',17)
  on conflict (id) do update set name_en=excluded.name_en, name_ru=excluded.name_ru, icon=excluded.icon, ord=excluded.ord;
insert into units (id,deck_id,name_en,name_ru,icon,ord) values ('fruits','kazakh-core','Fruit & vegetables','Фрукты и овощи','🍇',18)
  on conflict (id) do update set name_en=excluded.name_en, name_ru=excluded.name_ru, icon=excluded.icon, ord=excluded.ord;
insert into units (id,deck_id,name_en,name_ru,icon,ord) values ('bignumbers','kazakh-core','Bigger numbers','Большие числа','💯',19)
  on conflict (id) do update set name_en=excluded.name_en, name_ru=excluded.name_ru, icon=excluded.icon, ord=excluded.ord;

insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('greetings:0','greetings','Сәлем','hello','привет','👋',0)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('greetings:1','greetings','Сау бол','goodbye','пока','🙋',1)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('greetings:2','greetings','Рахмет','thank you','спасибо','🙏',2)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('greetings:3','greetings','Иә','yes','да','✅',3)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('greetings:4','greetings','Жоқ','no','нет','❌',4)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('greetings:5','greetings','Кешіріңіз','sorry','извините','😔',5)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('greetings:6','greetings','Жақсы','good','хорошо','👍',6)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('greetings:7','greetings','Қалайсың','how are you','как дела','🤔',7)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('numbers:0','numbers','Бір','one','один','1️⃣',0)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('numbers:1','numbers','Екі','two','два','2️⃣',1)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('numbers:2','numbers','Үш','three','три','3️⃣',2)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('numbers:3','numbers','Төрт','four','четыре','4️⃣',3)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('numbers:4','numbers','Бес','five','пять','5️⃣',4)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('numbers:5','numbers','Алты','six','шесть','6️⃣',5)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('numbers:6','numbers','Жеті','seven','семь','7️⃣',6)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('numbers:7','numbers','Сегіз','eight','восемь','8️⃣',7)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('numbers:8','numbers','Тоғыз','nine','девять','9️⃣',8)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('numbers:9','numbers','Он','ten','десять','🔟',9)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('phrases:0','phrases','Қайырлы таң','good morning','доброе утро','🌅',0)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('phrases:1','phrases','Қайырлы кеш','good evening','добрый вечер','🌆',1)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('phrases:2','phrases','Өтінемін','please','пожалуйста','🤲',2)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('phrases:3','phrases','Түсінбедім','I don''t understand','я не понял','🤷',3)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('phrases:4','phrases','Менің атым','my name is','меня зовут','🪪',4)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('phrases:5','phrases','Кездескенше','see you','до встречи','👋',5)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('phrases:6','phrases','Қош келдіңіз','welcome','добро пожаловать','🚪',6)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('phrases:7','phrases','Ештеңе етпейді','you''re welcome','не за что','🙂',7)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('food:0','food','Нан','bread','хлеб','🍞',0)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('food:1','food','Су','water','вода','💧',1)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('food:2','food','Ет','meat','мясо','🍖',2)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('food:3','food','Сүт','milk','молоко','🥛',3)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('food:4','food','Шай','tea','чай','🍵',4)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('food:5','food','Алма','apple','яблоко','🍎',5)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('food:6','food','Күріш','rice','рис','🍚',6)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('food:7','food','Тұз','salt','соль','🧂',7)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('family:0','family','Ана','mother','мама','👩',0)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('family:1','family','Әке','father','папа','👨',1)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('family:2','family','Апа','older sister','старшая сестра','👧',2)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('family:3','family','Аға','older brother','старший брат','👦',3)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('family:4','family','Бала','child','ребёнок','🧒',4)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('family:5','family','Ата','grandfather','дедушка','👴',5)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('family:6','family','Әже','grandmother','бабушка','👵',6)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('family:7','family','Отбасы','family','семья','👨‍👩‍👧‍👦',7)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('colors:0','colors','Қызыл','red','красный','🔴',0)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('colors:1','colors','Көк','blue','синий','🔵',1)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('colors:2','colors','Сары','yellow','жёлтый','🟡',2)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('colors:3','colors','Жасыл','green','зелёный','🟢',3)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('colors:4','colors','Ақ','white','белый','⚪',4)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('colors:5','colors','Қара','black','чёрный','⚫',5)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('colors:6','colors','Қоңыр','brown','коричневый','🟤',6)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('colors:7','colors','Сұр','grey','серый','🩶',7)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('animals:0','animals','Ит','dog','собака','🐕',0)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('animals:1','animals','Мысық','cat','кошка','🐈',1)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('animals:2','animals','Ат','horse','лошадь','🐎',2)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('animals:3','animals','Сиыр','cow','корова','🐄',3)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('animals:4','animals','Қой','sheep','овца','🐑',4)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('animals:5','animals','Түйе','camel','верблюд','🐪',5)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('animals:6','animals','Барыс','snow leopard','барс','🐆',6)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('animals:7','animals','Бүркіт','eagle','орёл','🦅',7)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('body:0','body','Бас','head','голова','🗣️',0)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('body:1','body','Көз','eye','глаз','👁️',1)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('body:2','body','Құлақ','ear','ухо','👂',2)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('body:3','body','Мұрын','nose','нос','👃',3)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('body:4','body','Ауыз','mouth','рот','👄',4)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('body:5','body','Қол','hand','рука','✋',5)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('body:6','body','Аяқ','leg','нога','🦵',6)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('body:7','body','Шаш','hair','волосы','💇',7)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('body:8','body','Тіс','tooth','зуб','🦷',8)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('body:9','body','Жүрек','heart','сердце','❤️',9)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('home:0','home','Үй','house','дом','🏠',0)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('home:1','home','Есік','door','дверь','🚪',1)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('home:2','home','Терезе','window','окно','🪟',2)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('home:3','home','Үстел','table','стол','🪑',3)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('home:4','home','Орындық','chair','стул','💺',4)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('home:5','home','Төсек','bed','кровать','🛏️',5)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('home:6','home','Бөлме','room','комната','🛋️',6)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('home:7','home','Кілем','carpet','ковёр','🧶',7)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('home:8','home','Шам','lamp','лампа','💡',8)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('home:9','home','Кілт','key','ключ','🔑',9)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('time:0','time','Күн','day','день','☀️',0)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('time:1','time','Түн','night','ночь','🌙',1)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('time:2','time','Таң','morning','утро','🌅',2)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('time:3','time','Кеш','evening','вечер','🌆',3)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('time:4','time','Бүгін','today','сегодня','📍',4)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('time:5','time','Ертең','tomorrow','завтра','➡️',5)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('time:6','time','Кеше','yesterday','вчера','⬅️',6)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('time:7','time','Апта','week','неделя','🗓️',7)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('time:8','time','Ай','month','месяц','📆',8)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('time:9','time','Жыл','year','год','🎊',9)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('time:10','time','Сағат','hour','час','⏰',10)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('weekdays:0','weekdays','Дүйсенбі','Monday','понедельник','1️⃣',0)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('weekdays:1','weekdays','Сейсенбі','Tuesday','вторник','2️⃣',1)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('weekdays:2','weekdays','Сәрсенбі','Wednesday','среда','3️⃣',2)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('weekdays:3','weekdays','Бейсенбі','Thursday','четверг','4️⃣',3)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('weekdays:4','weekdays','Жұма','Friday','пятница','5️⃣',4)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('weekdays:5','weekdays','Сенбі','Saturday','суббота','6️⃣',5)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('weekdays:6','weekdays','Жексенбі','Sunday','воскресенье','7️⃣',6)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('nature:0','nature','Аспан','sky','небо','🌌',0)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('nature:1','nature','Жаңбыр','rain','дождь','🌧️',1)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('nature:2','nature','Қар','snow','снег','❄️',2)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('nature:3','nature','Жел','wind','ветер','🌬️',3)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('nature:4','nature','Ағаш','tree','дерево','🌳',4)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('nature:5','nature','Гүл','flower','цветок','🌸',5)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('nature:6','nature','Тау','mountain','гора','⛰️',6)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('nature:7','nature','Өзен','river','река','🏞️',7)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('nature:8','nature','Теңіз','sea','море','🌊',8)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('nature:9','nature','Орман','forest','лес','🌲',9)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('nature:10','nature','Дала','steppe','степь','🌾',10)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('school:0','school','Мектеп','school','школа','🏫',0)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('school:1','school','Кітап','book','книга','📖',1)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('school:2','school','Қалам','pen','ручка','🖊️',2)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('school:3','school','Дәптер','notebook','тетрадь','📓',3)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('school:4','school','Мұғалім','teacher','учитель','👩‍🏫',4)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('school:5','school','Оқушы','pupil','ученик','🧑‍🎓',5)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('school:6','school','Сабақ','lesson','урок','📝',6)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('school:7','school','Тақта','board','доска','🧑‍🏫',7)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('school:8','school','Сөздік','dictionary','словарь','📚',8)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('school:9','school','Сынып','class','класс','🪑',9)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('city:0','city','Қала','city','город','🏙️',0)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('city:1','city','Ауыл','village','село','🏡',1)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('city:2','city','Көше','street','улица','🛣️',2)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('city:3','city','Дүкен','shop','магазин','🏪',3)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('city:4','city','Аурухана','hospital','больница','🏥',4)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('city:5','city','Дәріхана','pharmacy','аптека','💊',5)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('city:6','city','Машина','car','машина','🚗',6)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('city:7','city','Автобус','bus','автобус','🚌',7)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('city:8','city','Пойыз','train','поезд','🚆',8)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('city:9','city','Ұшақ','plane','самолёт','✈️',9)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('city:10','city','Базар','bazaar','базар','🧺',10)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('clothes:0','clothes','Көйлек','dress','платье','👗',0)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('clothes:1','clothes','Шалбар','trousers','брюки','👖',1)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('clothes:2','clothes','Аяқ киім','shoes','обувь','👟',2)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('clothes:3','clothes','Бөрік','fur hat','шапка','🧢',3)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('clothes:4','clothes','Орамал','scarf','платок','🧣',4)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('clothes:5','clothes','Шұлық','socks','носки','🧦',5)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('clothes:6','clothes','Қолғап','gloves','перчатки','🧤',6)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('clothes:7','clothes','Белбеу','belt','ремень','🪢',7)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('verbs:0','verbs','Бару','to go','идти','🚶',0)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('verbs:1','verbs','Келу','to come','приходить','🔙',1)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('verbs:2','verbs','Жеу','to eat','есть','🍽️',2)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('verbs:3','verbs','Ішу','to drink','пить','🥤',3)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('verbs:4','verbs','Оқу','to read','читать','📖',4)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('verbs:5','verbs','Жазу','to write','писать','✍️',5)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('verbs:6','verbs','Сөйлеу','to speak','говорить','💬',6)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('verbs:7','verbs','Көру','to see','видеть','👀',7)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('verbs:8','verbs','Білу','to know','знать','🧠',8)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('verbs:9','verbs','Ұйықтау','to sleep','спать','😴',9)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('opposites:0','opposites','Үлкен','big','большой','🐘',0)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('opposites:1','opposites','Кіші','small','маленький','🐜',1)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('opposites:2','opposites','Жаңа','new','новый','✨',2)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('opposites:3','opposites','Ескі','old','старый','🧱',3)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('opposites:4','opposites','Ыстық','hot','горячий','🔥',4)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('opposites:5','opposites','Суық','cold','холодный','🧊',5)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('opposites:6','opposites','Ұзын','long','длинный','📏',6)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('opposites:7','opposites','Қысқа','short','короткий','✂️',7)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('opposites:8','opposites','Биік','high','высокий','🗻',8)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('opposites:9','opposites','Жаман','bad','плохой','👎',9)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('professions:0','professions','Дәрігер','doctor','врач','👨‍⚕️',0)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('professions:1','professions','Сатушы','seller','продавец','🧑‍💼',1)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('professions:2','professions','Аспаз','cook','повар','👨‍🍳',2)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('professions:3','professions','Жүргізуші','driver','водитель','🚕',3)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('professions:4','professions','Суретші','artist','художник','🎨',4)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('professions:5','professions','Әнші','singer','певец','🎤',5)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('professions:6','professions','Ғалым','scientist','учёный','🔬',6)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('professions:7','professions','Спортшы','athlete','спортсмен','🏅',7)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('fruits:0','fruits','Жеміс','fruit','фрукт','🍇',0)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('fruits:1','fruits','Өрік','apricot','абрикос','🍑',1)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('fruits:2','fruits','Жүзім','grapes','виноград','🍇',2)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('fruits:3','fruits','Қарбыз','watermelon','арбуз','🍉',3)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('fruits:4','fruits','Қауын','melon','дыня','🍈',4)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('fruits:5','fruits','Сәбіз','carrot','морковь','🥕',5)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('fruits:6','fruits','Картоп','potato','картофель','🥔',6)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('fruits:7','fruits','Пияз','onion','лук','🧅',7)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('fruits:8','fruits','Қияр','cucumber','огурец','🥒',8)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('fruits:9','fruits','Қызанақ','tomato','помидор','🍅',9)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('bignumbers:0','bignumbers','Он бір','eleven','одиннадцать','1️⃣',0)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('bignumbers:1','bignumbers','Жиырма','twenty','двадцать','2️⃣',1)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('bignumbers:2','bignumbers','Отыз','thirty','тридцать','3️⃣',2)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('bignumbers:3','bignumbers','Қырық','forty','сорок','4️⃣',3)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('bignumbers:4','bignumbers','Елу','fifty','пятьдесят','5️⃣',4)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('bignumbers:5','bignumbers','Алпыс','sixty','шестьдесят','6️⃣',5)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('bignumbers:6','bignumbers','Жетпіс','seventy','семьдесят','7️⃣',6)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('bignumbers:7','bignumbers','Сексен','eighty','восемьдесят','8️⃣',7)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('bignumbers:8','bignumbers','Тоқсан','ninety','девяносто','9️⃣',8)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('bignumbers:9','bignumbers','Жүз','a hundred','сто','💯',9)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;
insert into words (id,unit_id,kk,en,ru,emoji,ord) values ('bignumbers:10','bignumbers','Мың','a thousand','тысяча','🔢',10)
  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;

delete from sentences;  -- sentences have no natural key; replace wholesale
insert into sentences (unit_id,kk,en_tiles,ru_tiles) values ('greetings','Сәлем! Қалайсың?',ARRAY['Hello','!','How','are','you','?'],ARRAY['Привет','!','Как','дела','?']);
insert into sentences (unit_id,kk,en_tiles,ru_tiles) values ('numbers','Бір ит',ARRAY['One','dog'],ARRAY['Одна','собака']);
insert into sentences (unit_id,kk,en_tiles,ru_tiles) values ('phrases','Менің атым Айдос',ARRAY['My','name','is','Aidos'],ARRAY['Меня','зовут','Айдос']);
insert into sentences (unit_id,kk,en_tiles,ru_tiles) values ('food','Мен су ішемін',ARRAY['I','drink','water'],ARRAY['Я','пью','воду']);
insert into sentences (unit_id,kk,en_tiles,ru_tiles) values ('food','Мен нан жеймін',ARRAY['I','eat','bread'],ARRAY['Я','ем','хлеб']);
insert into sentences (unit_id,kk,en_tiles,ru_tiles) values ('family','Бұл менің анам',ARRAY['This','is','my','mother'],ARRAY['Это','моя','мама']);
insert into sentences (unit_id,kk,en_tiles,ru_tiles) values ('colors','Қызыл алма',ARRAY['A','red','apple'],ARRAY['Красное','яблоко']);
insert into sentences (unit_id,kk,en_tiles,ru_tiles) values ('animals','Бұл менің итім',ARRAY['This','is','my','dog'],ARRAY['Это','моя','собака']);
insert into sentences (unit_id,kk,en_tiles,ru_tiles) values ('body','Менің басым ауырады',ARRAY['My','head','hurts'],ARRAY['У','меня','болит','голова']);
insert into sentences (unit_id,kk,en_tiles,ru_tiles) values ('home','Бұл менің үйім',ARRAY['This','is','my','house'],ARRAY['Это','мой','дом']);
insert into sentences (unit_id,kk,en_tiles,ru_tiles) values ('time','Бүгін жақсы күн',ARRAY['Today','is','a','good','day'],ARRAY['Сегодня','хороший','день']);
insert into sentences (unit_id,kk,en_tiles,ru_tiles) values ('weekdays','Бүгін жұма',ARRAY['Today','is','Friday'],ARRAY['Сегодня','пятница']);
insert into sentences (unit_id,kk,en_tiles,ru_tiles) values ('nature','Тау биік',ARRAY['The','mountain','is','high'],ARRAY['Гора','высокая']);
insert into sentences (unit_id,kk,en_tiles,ru_tiles) values ('school','Мен кітап оқимын',ARRAY['I','read','a','book'],ARRAY['Я','читаю','книгу']);
insert into sentences (unit_id,kk,en_tiles,ru_tiles) values ('city','Мен қалада тұрамын',ARRAY['I','live','in','the','city'],ARRAY['Я','живу','в','городе']);
insert into sentences (unit_id,kk,en_tiles,ru_tiles) values ('clothes','Бұл менің көйлегім',ARRAY['This','is','my','dress'],ARRAY['Это','моё','платье']);
insert into sentences (unit_id,kk,en_tiles,ru_tiles) values ('verbs','Мен мектепке барамын',ARRAY['I','go','to','school'],ARRAY['Я','иду','в','школу']);
insert into sentences (unit_id,kk,en_tiles,ru_tiles) values ('opposites','Бұл үй үлкен',ARRAY['This','house','is','big'],ARRAY['Этот','дом','большой']);
insert into sentences (unit_id,kk,en_tiles,ru_tiles) values ('professions','Менің әкем дәрігер',ARRAY['My','father','is','a','doctor'],ARRAY['Мой','папа','врач']);
insert into sentences (unit_id,kk,en_tiles,ru_tiles) values ('fruits','Қарбыз тәтті',ARRAY['The','watermelon','is','sweet'],ARRAY['Арбуз','сладкий']);
insert into sentences (unit_id,kk,en_tiles,ru_tiles) values ('bignumbers','Менде жүз теңге бар',ARRAY['I','have','a','hundred','tenge'],ARRAY['У','меня','сто','тенге']);
