/* =====================================================================
   Tілашар — course content.
   Mirrors schema.sql 1:1 (units -> words + sentences), so moving to
   Supabase is a data-layer swap, not a rewrite.
   NOTE: vocabulary is common, high-frequency Kazakh. A native-speaker
   read-through is still on the list before a wide public push.
   ===================================================================== */
const UNITS = [
 {id:"greetings",icon:"👋",name:{en:"Greetings",ru:"Приветствия"},words:[
   {kk:"Сәлем",en:"hello",ru:"привет",e:"👋"},
   {kk:"Сау бол",en:"goodbye",ru:"пока",e:"🙋"},
   {kk:"Рахмет",en:"thank you",ru:"спасибо",e:"🙏"},
   {kk:"Иә",en:"yes",ru:"да",e:"✅"},
   {kk:"Жоқ",en:"no",ru:"нет",e:"❌"},
   {kk:"Кешіріңіз",en:"sorry",ru:"извините",e:"😔"},
   {kk:"Жақсы",en:"good",ru:"хорошо",e:"👍"},
   {kk:"Қалайсың",en:"how are you",ru:"как дела",e:"🤔"}],
   sents:[{kk:"Сәлем! Қалайсың?",en:["Hello","!","How","are","you","?"],ru:["Привет","!","Как","дела","?"]}]},

 {id:"numbers",icon:"🔢",name:{en:"Numbers 1–10",ru:"Числа 1–10"},words:[
   {kk:"Бір",en:"one",ru:"один",e:"1️⃣"},{kk:"Екі",en:"two",ru:"два",e:"2️⃣"},
   {kk:"Үш",en:"three",ru:"три",e:"3️⃣"},{kk:"Төрт",en:"four",ru:"четыре",e:"4️⃣"},
   {kk:"Бес",en:"five",ru:"пять",e:"5️⃣"},{kk:"Алты",en:"six",ru:"шесть",e:"6️⃣"},
   {kk:"Жеті",en:"seven",ru:"семь",e:"7️⃣"},{kk:"Сегіз",en:"eight",ru:"восемь",e:"8️⃣"},
   {kk:"Тоғыз",en:"nine",ru:"девять",e:"9️⃣"},{kk:"Он",en:"ten",ru:"десять",e:"🔟"}],
   sents:[{kk:"Бір ит",en:["One","dog"],ru:["Одна","собака"]}]},

 {id:"phrases",icon:"💬",name:{en:"Everyday phrases",ru:"Повседневные фразы"},words:[
   {kk:"Қайырлы таң",en:"good morning",ru:"доброе утро",e:"🌅"},
   {kk:"Қайырлы кеш",en:"good evening",ru:"добрый вечер",e:"🌆"},
   {kk:"Өтінемін",en:"please",ru:"пожалуйста",e:"🤲"},
   {kk:"Түсінбедім",en:"I don't understand",ru:"я не понял",e:"🤷"},
   {kk:"Менің атым",en:"my name is",ru:"меня зовут",e:"🪪"},
   {kk:"Кездескенше",en:"see you",ru:"до встречи",e:"👋"},
   {kk:"Қош келдіңіз",en:"welcome",ru:"добро пожаловать",e:"🚪"},
   {kk:"Ештеңе етпейді",en:"you're welcome",ru:"не за что",e:"🙂"}],
   sents:[{kk:"Менің атым Айдос",en:["My","name","is","Aidos"],ru:["Меня","зовут","Айдос"]}]},

 {id:"food",icon:"🍞",name:{en:"Food",ru:"Еда"},words:[
   {kk:"Нан",en:"bread",ru:"хлеб",e:"🍞"},{kk:"Су",en:"water",ru:"вода",e:"💧"},
   {kk:"Ет",en:"meat",ru:"мясо",e:"🍖"},{kk:"Сүт",en:"milk",ru:"молоко",e:"🥛"},
   {kk:"Шай",en:"tea",ru:"чай",e:"🍵"},{kk:"Алма",en:"apple",ru:"яблоко",e:"🍎"},
   {kk:"Күріш",en:"rice",ru:"рис",e:"🍚"},{kk:"Тұз",en:"salt",ru:"соль",e:"🧂"}],
   sents:[{kk:"Мен су ішемін",en:["I","drink","water"],ru:["Я","пью","воду"]},
          {kk:"Мен нан жеймін",en:["I","eat","bread"],ru:["Я","ем","хлеб"]}]},

 {id:"family",icon:"👨‍👩‍👧",name:{en:"Family",ru:"Семья"},words:[
   {kk:"Ана",en:"mother",ru:"мама",e:"👩"},{kk:"Әке",en:"father",ru:"папа",e:"👨"},
   {kk:"Апа",en:"older sister",ru:"старшая сестра",e:"👧"},{kk:"Аға",en:"older brother",ru:"старший брат",e:"👦"},
   {kk:"Бала",en:"child",ru:"ребёнок",e:"🧒"},{kk:"Ата",en:"grandfather",ru:"дедушка",e:"👴"},
   {kk:"Әже",en:"grandmother",ru:"бабушка",e:"👵"},{kk:"Отбасы",en:"family",ru:"семья",e:"👨‍👩‍👧‍👦"}],
   sents:[{kk:"Бұл менің анам",en:["This","is","my","mother"],ru:["Это","моя","мама"]}]},

 {id:"colors",icon:"🎨",name:{en:"Colors",ru:"Цвета"},words:[
   {kk:"Қызыл",en:"red",ru:"красный",e:"🔴"},{kk:"Көк",en:"blue",ru:"синий",e:"🔵"},
   {kk:"Сары",en:"yellow",ru:"жёлтый",e:"🟡"},{kk:"Жасыл",en:"green",ru:"зелёный",e:"🟢"},
   {kk:"Ақ",en:"white",ru:"белый",e:"⚪"},{kk:"Қара",en:"black",ru:"чёрный",e:"⚫"},
   {kk:"Қоңыр",en:"brown",ru:"коричневый",e:"🟤"},{kk:"Сұр",en:"grey",ru:"серый",e:"🩶"}],
   sents:[{kk:"Қызыл алма",en:["A","red","apple"],ru:["Красное","яблоко"]}]},

 {id:"animals",icon:"🐾",name:{en:"Animals",ru:"Животные"},words:[
   {kk:"Ит",en:"dog",ru:"собака",e:"🐕"},{kk:"Мысық",en:"cat",ru:"кошка",e:"🐈"},
   {kk:"Ат",en:"horse",ru:"лошадь",e:"🐎"},{kk:"Сиыр",en:"cow",ru:"корова",e:"🐄"},
   {kk:"Қой",en:"sheep",ru:"овца",e:"🐑"},{kk:"Түйе",en:"camel",ru:"верблюд",e:"🐪"},
   {kk:"Барыс",en:"snow leopard",ru:"барс",e:"🐆"},{kk:"Бүркіт",en:"eagle",ru:"орёл",e:"🦅"}],
   sents:[{kk:"Бұл менің итім",en:["This","is","my","dog"],ru:["Это","моя","собака"]}]},

 {id:"body",icon:"🧍",name:{en:"The body",ru:"Тело"},words:[
   {kk:"Бас",en:"head",ru:"голова",e:"🗣️"},{kk:"Көз",en:"eye",ru:"глаз",e:"👁️"},
   {kk:"Құлақ",en:"ear",ru:"ухо",e:"👂"},{kk:"Мұрын",en:"nose",ru:"нос",e:"👃"},
   {kk:"Ауыз",en:"mouth",ru:"рот",e:"👄"},{kk:"Қол",en:"hand",ru:"рука",e:"✋"},
   {kk:"Аяқ",en:"leg",ru:"нога",e:"🦵"},{kk:"Шаш",en:"hair",ru:"волосы",e:"💇"},
   {kk:"Тіс",en:"tooth",ru:"зуб",e:"🦷"},{kk:"Жүрек",en:"heart",ru:"сердце",e:"❤️"}],
   sents:[{kk:"Менің басым ауырады",en:["My","head","hurts"],ru:["У","меня","болит","голова"]}]},

 {id:"home",icon:"🏠",name:{en:"Home",ru:"Дом"},words:[
   {kk:"Үй",en:"house",ru:"дом",e:"🏠"},{kk:"Есік",en:"door",ru:"дверь",e:"🚪"},
   {kk:"Терезе",en:"window",ru:"окно",e:"🪟"},{kk:"Үстел",en:"table",ru:"стол",e:"🪑"},
   {kk:"Орындық",en:"chair",ru:"стул",e:"💺"},{kk:"Төсек",en:"bed",ru:"кровать",e:"🛏️"},
   {kk:"Бөлме",en:"room",ru:"комната",e:"🚪"},{kk:"Кілем",en:"carpet",ru:"ковёр",e:"🧶"},
   {kk:"Шам",en:"lamp",ru:"лампа",e:"💡"},{kk:"Кілт",en:"key",ru:"ключ",e:"🔑"}],
   sents:[{kk:"Бұл менің үйім",en:["This","is","my","house"],ru:["Это","мой","дом"]}]},

 {id:"time",icon:"⏰",name:{en:"Time",ru:"Время"},words:[
   {kk:"Күн",en:"day",ru:"день",e:"☀️"},{kk:"Түн",en:"night",ru:"ночь",e:"🌙"},
   {kk:"Таң",en:"morning",ru:"утро",e:"🌅"},{kk:"Кеш",en:"evening",ru:"вечер",e:"🌆"},
   {kk:"Бүгін",en:"today",ru:"сегодня",e:"📍"},{kk:"Ертең",en:"tomorrow",ru:"завтра",e:"➡️"},
   {kk:"Кеше",en:"yesterday",ru:"вчера",e:"⬅️"},{kk:"Апта",en:"week",ru:"неделя",e:"🗓️"},
   {kk:"Ай",en:"month",ru:"месяц",e:"📆"},{kk:"Жыл",en:"year",ru:"год",e:"🎊"},
   {kk:"Сағат",en:"hour",ru:"час",e:"⏰"}],
   sents:[{kk:"Бүгін жақсы күн",en:["Today","is","a","good","day"],ru:["Сегодня","хороший","день"]}]},

 {id:"weekdays",icon:"📅",name:{en:"Days of the week",ru:"Дни недели"},words:[
   {kk:"Дүйсенбі",en:"Monday",ru:"понедельник",e:"1️⃣"},{kk:"Сейсенбі",en:"Tuesday",ru:"вторник",e:"2️⃣"},
   {kk:"Сәрсенбі",en:"Wednesday",ru:"среда",e:"3️⃣"},{kk:"Бейсенбі",en:"Thursday",ru:"четверг",e:"4️⃣"},
   {kk:"Жұма",en:"Friday",ru:"пятница",e:"5️⃣"},{kk:"Сенбі",en:"Saturday",ru:"суббота",e:"6️⃣"},
   {kk:"Жексенбі",en:"Sunday",ru:"воскресенье",e:"7️⃣"}],
   sents:[{kk:"Бүгін жұма",en:["Today","is","Friday"],ru:["Сегодня","пятница"]}]},

 {id:"nature",icon:"🌳",name:{en:"Nature",ru:"Природа"},words:[
   {kk:"Аспан",en:"sky",ru:"небо",e:"🌌"},{kk:"Жаңбыр",en:"rain",ru:"дождь",e:"🌧️"},
   {kk:"Қар",en:"snow",ru:"снег",e:"❄️"},{kk:"Жел",en:"wind",ru:"ветер",e:"🌬️"},
   {kk:"Ағаш",en:"tree",ru:"дерево",e:"🌳"},{kk:"Гүл",en:"flower",ru:"цветок",e:"🌸"},
   {kk:"Тау",en:"mountain",ru:"гора",e:"⛰️"},{kk:"Өзен",en:"river",ru:"река",e:"🏞️"},
   {kk:"Теңіз",en:"sea",ru:"море",e:"🌊"},{kk:"Орман",en:"forest",ru:"лес",e:"🌲"},
   {kk:"Дала",en:"steppe",ru:"степь",e:"🌾"}],
   sents:[{kk:"Тау биік",en:["The","mountain","is","high"],ru:["Гора","высокая"]}]},

 {id:"school",icon:"🎒",name:{en:"School",ru:"Школа"},words:[
   {kk:"Мектеп",en:"school",ru:"школа",e:"🏫"},{kk:"Кітап",en:"book",ru:"книга",e:"📖"},
   {kk:"Қалам",en:"pen",ru:"ручка",e:"🖊️"},{kk:"Дәптер",en:"notebook",ru:"тетрадь",e:"📓"},
   {kk:"Мұғалім",en:"teacher",ru:"учитель",e:"👩‍🏫"},{kk:"Оқушы",en:"pupil",ru:"ученик",e:"🧑‍🎓"},
   {kk:"Сабақ",en:"lesson",ru:"урок",e:"📝"},{kk:"Тақта",en:"board",ru:"доска",e:"🧑‍🏫"},
   {kk:"Сөздік",en:"dictionary",ru:"словарь",e:"📚"},{kk:"Сынып",en:"class",ru:"класс",e:"🪑"}],
   sents:[{kk:"Мен кітап оқимын",en:["I","read","a","book"],ru:["Я","читаю","книгу"]}]},

 {id:"city",icon:"🏙️",name:{en:"City & transport",ru:"Город и транспорт"},words:[
   {kk:"Қала",en:"city",ru:"город",e:"🏙️"},{kk:"Ауыл",en:"village",ru:"село",e:"🏡"},
   {kk:"Көше",en:"street",ru:"улица",e:"🛣️"},{kk:"Дүкен",en:"shop",ru:"магазин",e:"🏪"},
   {kk:"Аурухана",en:"hospital",ru:"больница",e:"🏥"},{kk:"Дәріхана",en:"pharmacy",ru:"аптека",e:"💊"},
   {kk:"Машина",en:"car",ru:"машина",e:"🚗"},{kk:"Автобус",en:"bus",ru:"автобус",e:"🚌"},
   {kk:"Пойыз",en:"train",ru:"поезд",e:"🚆"},{kk:"Ұшақ",en:"plane",ru:"самолёт",e:"✈️"},
   {kk:"Базар",en:"bazaar",ru:"базар",e:"🧺"}],
   sents:[{kk:"Мен қалада тұрамын",en:["I","live","in","the","city"],ru:["Я","живу","в","городе"]}]},

 {id:"clothes",icon:"👕",name:{en:"Clothes",ru:"Одежда"},words:[
   {kk:"Көйлек",en:"dress",ru:"платье",e:"👗"},{kk:"Шалбар",en:"trousers",ru:"брюки",e:"👖"},
   {kk:"Аяқ киім",en:"shoes",ru:"обувь",e:"👟"},{kk:"Бөрік",en:"fur hat",ru:"шапка",e:"🧢"},
   {kk:"Орамал",en:"scarf",ru:"платок",e:"🧣"},{kk:"Шұлық",en:"socks",ru:"носки",e:"🧦"},
   {kk:"Қолғап",en:"gloves",ru:"перчатки",e:"🧤"},{kk:"Белбеу",en:"belt",ru:"ремень",e:"🪢"}],
   sents:[{kk:"Бұл менің көйлегім",en:["This","is","my","dress"],ru:["Это","моё","платье"]}]},

 {id:"verbs",icon:"🏃",name:{en:"Verbs",ru:"Глаголы"},words:[
   {kk:"Бару",en:"to go",ru:"идти",e:"🚶"},{kk:"Келу",en:"to come",ru:"приходить",e:"🔙"},
   {kk:"Жеу",en:"to eat",ru:"есть",e:"🍽️"},{kk:"Ішу",en:"to drink",ru:"пить",e:"🥤"},
   {kk:"Оқу",en:"to read",ru:"читать",e:"📖"},{kk:"Жазу",en:"to write",ru:"писать",e:"✍️"},
   {kk:"Сөйлеу",en:"to speak",ru:"говорить",e:"💬"},{kk:"Көру",en:"to see",ru:"видеть",e:"👀"},
   {kk:"Білу",en:"to know",ru:"знать",e:"🧠"},{kk:"Ұйықтау",en:"to sleep",ru:"спать",e:"😴"}],
   sents:[{kk:"Мен мектепке барамын",en:["I","go","to","school"],ru:["Я","иду","в","школу"]}]},

 {id:"opposites",icon:"↔️",name:{en:"Opposites",ru:"Противоположности"},words:[
   {kk:"Үлкен",en:"big",ru:"большой",e:"🐘"},{kk:"Кіші",en:"small",ru:"маленький",e:"🐜"},
   {kk:"Жаңа",en:"new",ru:"новый",e:"✨"},{kk:"Ескі",en:"old",ru:"старый",e:"🧱"},
   {kk:"Ыстық",en:"hot",ru:"горячий",e:"🔥"},{kk:"Суық",en:"cold",ru:"холодный",e:"🧊"},
   {kk:"Ұзын",en:"long",ru:"длинный",e:"📏"},{kk:"Қысқа",en:"short",ru:"короткий",e:"✂️"},
   {kk:"Биік",en:"high",ru:"высокий",e:"🗻"},{kk:"Жаман",en:"bad",ru:"плохой",e:"👎"}],
   sents:[{kk:"Бұл үй үлкен",en:["This","house","is","big"],ru:["Этот","дом","большой"]}]},

 {id:"professions",icon:"💼",name:{en:"Professions",ru:"Профессии"},words:[
   {kk:"Дәрігер",en:"doctor",ru:"врач",e:"👨‍⚕️"},{kk:"Сатушы",en:"seller",ru:"продавец",e:"🧑‍💼"},
   {kk:"Аспаз",en:"cook",ru:"повар",e:"👨‍🍳"},{kk:"Жүргізуші",en:"driver",ru:"водитель",e:"🚕"},
   {kk:"Суретші",en:"artist",ru:"художник",e:"🎨"},{kk:"Әнші",en:"singer",ru:"певец",e:"🎤"},
   {kk:"Ғалым",en:"scientist",ru:"учёный",e:"🔬"},{kk:"Спортшы",en:"athlete",ru:"спортсмен",e:"🏅"}],
   sents:[{kk:"Менің әкем дәрігер",en:["My","father","is","a","doctor"],ru:["Мой","папа","врач"]}]},

 {id:"fruits",icon:"🍇",name:{en:"Fruit & vegetables",ru:"Фрукты и овощи"},words:[
   {kk:"Жеміс",en:"fruit",ru:"фрукт",e:"🍇"},{kk:"Өрік",en:"apricot",ru:"абрикос",e:"🍑"},
   {kk:"Жүзім",en:"grapes",ru:"виноград",e:"🍇"},{kk:"Қарбыз",en:"watermelon",ru:"арбуз",e:"🍉"},
   {kk:"Қауын",en:"melon",ru:"дыня",e:"🍈"},{kk:"Сәбіз",en:"carrot",ru:"морковь",e:"🥕"},
   {kk:"Картоп",en:"potato",ru:"картофель",e:"🥔"},{kk:"Пияз",en:"onion",ru:"лук",e:"🧅"},
   {kk:"Қияр",en:"cucumber",ru:"огурец",e:"🥒"},{kk:"Қызанақ",en:"tomato",ru:"помидор",e:"🍅"}],
   sents:[{kk:"Қарбыз тәтті",en:["The","watermelon","is","sweet"],ru:["Арбуз","сладкий"]}]},

 {id:"bignumbers",icon:"💯",name:{en:"Bigger numbers",ru:"Большие числа"},words:[
   {kk:"Он бір",en:"eleven",ru:"одиннадцать",e:"1️⃣"},{kk:"Жиырма",en:"twenty",ru:"двадцать",e:"2️⃣"},
   {kk:"Отыз",en:"thirty",ru:"тридцать",e:"3️⃣"},{kk:"Қырық",en:"forty",ru:"сорок",e:"4️⃣"},
   {kk:"Елу",en:"fifty",ru:"пятьдесят",e:"5️⃣"},{kk:"Алпыс",en:"sixty",ru:"шестьдесят",e:"6️⃣"},
   {kk:"Жетпіс",en:"seventy",ru:"семьдесят",e:"7️⃣"},{kk:"Сексен",en:"eighty",ru:"восемьдесят",e:"8️⃣"},
   {kk:"Тоқсан",en:"ninety",ru:"девяносто",e:"9️⃣"},{kk:"Жүз",en:"a hundred",ru:"сто",e:"💯"},
   {kk:"Мың",en:"a thousand",ru:"тысяча",e:"🔢"}],
   sents:[{kk:"Менде жүз теңге бар",en:["I","have","a","hundred","tenge"],ru:["У","меня","сто","тенге"]}]},
];

UNITS.forEach(u => {
  u.words.forEach((w,i) => { w.id = u.id+":"+i; w.unit = u.id; });
  (u.sents || []).forEach((x,i) => { x.id = "s:"+u.id+":"+i; x.unit = u.id; });
});
const ALL = []; UNITS.forEach(u => u.words.forEach(w => ALL.push(w)));
const BYID = {}; ALL.forEach(w => BYID[w.id] = w);
const COURSE = { units: UNITS.length, words: ALL.length };
