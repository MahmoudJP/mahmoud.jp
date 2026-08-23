export type ResourceLink = {
  title: string;
  description: string;
  url: string;
  label: string;
  category: "official" | "pdf" | "muslim" | "daily" | "emergency";
};

export type Place = {
  name: string;
  city: string;
  area: string;
  address: string;
  summary: string;
  tags: string[];
  sourceUrl: string;
  sourceLabel: string;
};

export type Phrase = {
  situation: string;
  arabic: string;
  japanese: string;
  romaji: string;
};

export type ChecklistGroup = {
  title: string;
  items: string[];
};

export function mapsUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export const officialResources: ResourceLink[] = [
  {
    title: "دليل العيش والعمل في اليابان",
    description:
      "الدليل الرسمي من وكالة خدمات الهجرة، وفيه الإقامة، العمل، الصحة، التعليم، الضرائب، السكن، والكوارث.",
    url: "https://www.moj.go.jp/isa/support/portal/guidebook_all.html?lang=en",
    label: "Immigration Services Agency",
    category: "official",
  },
  {
    title: "بوابة دعم المقيمين الأجانب",
    description:
      "روابط رسمية للحياة اليومية وقواعد السكن والمرور والنفايات والعمل داخل اليابان.",
    url: "https://www.moj.go.jp/isa/support/portal/daily.html?lang=en",
    label: "Foreign Resident Support Portal",
    category: "daily",
  },
  {
    title: "Visit Japan Web",
    description:
      "الخدمة الرسمية لتسجيل إجراءات الدخول والجمارك قبل الوصول إلى اليابان.",
    url: "https://services.digital.go.jp/en/visit-japan-web/",
    label: "Digital Agency",
    category: "official",
  },
  {
    title: "تأشيرات اليابان",
    description:
      "صفحة وزارة الخارجية اليابانية لمعرفة متطلبات التأشيرة حسب بلدك والسفارة المسؤولة.",
    url: "https://www.mofa.go.jp/j_info/visit/visa/index.html",
    label: "MOFA Japan",
    category: "official",
  },
  {
    title: "إقرار الجمارك الإلكتروني",
    description:
      "معلومات الجمارك الرسمية للمسافرين، ومتى تحتاج إلى التصريح عن أموال أو أدوية أو أغراض.",
    url: "https://www.customs.go.jp/english/passenger/declaration/declaration_app.html",
    label: "Japan Customs",
    category: "official",
  },
  {
    title: "Tokyo Living Guide",
    description:
      "دليل عملي للمقيمين الجدد في طوكيو: البلدية، السكن، الصحة، المدارس، اللغة، والنفايات.",
    url: "https://tabunka.tokyo-tsunagari.or.jp/english/useful/yourguide.html",
    label: "Tokyo TIPS",
    category: "pdf",
  },
  {
    title: "دليل شامل للحياة في طوكيو",
    description:
      "صفحات منظمة من Tokyo TIPS عن الإجراءات، الصحة، الأطفال، التعليم، العمل، والكوارث.",
    url: "https://tabunka.tokyo-tsunagari.or.jp/useful/guide_eng/",
    label: "Tokyo TIPS",
    category: "daily",
  },
  {
    title: "JNTO Muslim Travelers Guide",
    description:
      "الدليل السياحي الرسمي للمسافر المسلم، مع تنبيه مهم أن اليابان لا تملك جهة اعتماد حلال مركزية واحدة.",
    url: "https://www.japan.travel/en/guide/muslim-travelers/",
    label: "JNTO",
    category: "muslim",
  },
  {
    title: "Japan Muslim Guide",
    description:
      "دليل مطاعم وفنادق ومساجد ومساحات صلاة للمسلمين في اليابان، مع فلاتر حلال ومسلم فريندلي.",
    url: "https://muslim-guide.jp/",
    label: "Japan Muslim Guide",
    category: "muslim",
  },
  {
    title: "Halal Food in Japan",
    description:
      "خريطة وقاعدة بيانات مطاعم حلال ومساجد ومتاجر، مفيدة للمراجعة السريعة قبل الخروج.",
    url: "https://www.halalfoodinjapan.com/en/",
    label: "Halal Food in Japan",
    category: "muslim",
  },
  {
    title: "روابط طوارئ وكوارث طوكيو",
    description:
      "مصادر رسمية متعددة اللغات وقت الزلازل والأمطار والإنذارات وخدمات الدعم.",
    url: "https://tabunka.tokyo-tsunagari.or.jp/english/disaster/links.html",
    label: "Tokyo TIPS",
    category: "emergency",
  },
  {
    title: "الاستعداد للكوارث",
    description:
      "مواد متعددة اللغات عن حقيبة الطوارئ، أماكن الإخلاء، وما تفعله وقت الزلزال أو الإعصار.",
    url: "https://www.clair.or.jp/e/multiculture/tagengo/preparing-for-a-natural-disaster.html",
    label: "CLAIR",
    category: "emergency",
  },
  {
    title: "مساحات صلاة للمسلمين في كيوتو",
    description:
      "صفحة رسمية من سياحة كيوتو لأماكن الصلاة المجانية أو المتاحة للمسلمين.",
    url: "https://kyoto.travel/en/muslim/free-spaces-for-muslims-to-perform-prayers/",
    label: "Kyoto Travel",
    category: "muslim",
  },
];

export const mosquePlaces: Place[] = [
  {
    name: "Tokyo Camii & Diyanet Turkish Culture Center",
    city: "Tokyo",
    area: "Yoyogi-Uehara",
    address: "1-19 Oyamacho, Shibuya-ku, Tokyo",
    summary:
      "أشهر مسجد في طوكيو ومناسب جدا كأول زيارة؛ قريب من محطة Yoyogi-Uehara وبه مركز ثقافي تركي.",
    tags: ["مسجد كبير", "ثقافي", "قريب من محطة"],
    sourceUrl: "https://tokyocamii.org/welcome-message/",
    sourceLabel: "Tokyo Camii",
  },
  {
    name: "Otsuka Masjid",
    city: "Tokyo",
    area: "Otsuka",
    address: "3-42-7 Minami Otsuka, Toshima-ku, Tokyo",
    summary:
      "مسجد نشط في توشيما، مناسب للمقيمين والطلاب حول إكيبوكورو وأوتسوكا.",
    tags: ["مسجد", "جمعية إسلامية", "طوكيو"],
    sourceUrl: "https://muslim-guide.jp/mosque/otsuka-masjid/",
    sourceLabel: "Japan Muslim Guide",
  },
  {
    name: "Arabic Islamic Institute / Hiroo Mosque",
    city: "Tokyo",
    area: "Hiroo / Motoazabu",
    address: "3-4-15 Motoazabu, Minato City, Tokyo",
    summary:
      "مركز عربي إسلامي في منطقة هيرو/أزابو، مفيد للعرب تحديدا لقربه من المؤسسات العربية.",
    tags: ["عربي", "مسجد", "مركز إسلامي"],
    sourceUrl: "https://halalwins.com/mosques/the-arabic-islamic-institute-in-tokyo-hiroo-mosque/",
    sourceLabel: "HalalWins",
  },
  {
    name: "As-Salaam Masjid",
    city: "Tokyo",
    area: "Ueno / Okachimachi",
    address: "4-6-7 Taito, Taito-ku, Tokyo",
    summary:
      "مسجد مركزي قريب من أوينو وأوكاتشيماشي، مناسب مع رحلة مطاعم وأسواق حلال في المنطقة.",
    tags: ["مسجد", "أوينو", "قريب من مطاعم"],
    sourceUrl: "https://muslim-guide.jp/mosque/as-salaam-masjid/",
    sourceLabel: "Japan Muslim Guide",
  },
  {
    name: "Hira Masjid Gyotoku",
    city: "Chiba",
    area: "Gyotoku",
    address: "3-3-19 Gyotoku Ekimae, Ichikawa-shi, Chiba",
    summary:
      "مسجد مهم للناس الساكنة شرق طوكيو أو في إيتشيكاوا/تشиба.",
    tags: ["مسجد", "تشيبـا", "شرق طوكيو"],
    sourceUrl: "https://muslim-guide.jp/mosque/hira-masjid/",
    sourceLabel: "Japan Muslim Guide",
  },
  {
    name: "Kyoto Masjid",
    city: "Kyoto",
    area: "Kamigyo",
    address: "Miyagaki-cho 92, Kamigyo-ku, Kyoto-shi, Kyoto",
    summary:
      "مسجد كيوتو القديم التابع للمركز الإسلامي في كيوتو، نقطة مهمة للطلاب والزوار.",
    tags: ["كيوتو", "مسجد", "طلاب"],
    sourceUrl: "https://muslim-guide.jp/mosque/kyoto-masjid/",
    sourceLabel: "Japan Muslim Guide",
  },
  {
    name: "Kyoto Central Masjid",
    city: "Kyoto",
    area: "Sakyo",
    address: "66 Tanaka Minamiokubocho, Sakyo Ward, Kyoto",
    summary:
      "مسجد مركزي آخر في كيوتو، مفيد عند التخطيط للصلاة بين مناطق الجامعة والسياحة.",
    tags: ["كيوتو", "مسجد", "مركزي"],
    sourceUrl: "https://www.halalfoodmaps.com/venue/1eKnLlCFdUPO2SEytywp?lang=en",
    sourceLabel: "Halal Food Maps",
  },
  {
    name: "Osaka Ibaraki Mosque",
    city: "Osaka",
    area: "Ibaraki",
    address: "4-6-13 Toyokawa, Ibaraki City, Osaka",
    summary:
      "مسجد في شمال أوساكا، مناسب للطلاب والمقيمين حول إباراكي وسويتا.",
    tags: ["أوساكا", "مسجد", "شمال أوساكا"],
    sourceUrl: "https://muslim-guide.jp/mosque/osaka-ibaraki-mosque/",
    sourceLabel: "Japan Muslim Guide",
  },
  {
    name: "Osaka Masjid",
    city: "Osaka",
    area: "Nishiyodogawa",
    address: "4-12-16 Owada, Nishiyodogawa-ku, Osaka",
    summary:
      "من أشهر مساجد أوساكا، نقطة بداية جيدة للمقيمين في منطقة كانساي.",
    tags: ["أوساكا", "مسجد", "كانساي"],
    sourceUrl: "https://www.tripadvisor.com/Attraction_Review-g298566-d20326514-Reviews-Osaka_Masjid-Osaka_Osaka_Prefecture_Kinki.html",
    sourceLabel: "Tripadvisor",
  },
  {
    name: "Nagoya Mosque",
    city: "Nagoya",
    area: "Nakamura",
    address: "2-26-7 Honjindori, Nakamura-ku, Nagoya, Aichi",
    summary:
      "المسجد الرئيسي في ناغويا، مهم للناس في آيتشي وتشوبو.",
    tags: ["ناغويا", "مسجد", "آيتشي"],
    sourceUrl: "https://muslim-guide.jp/mosque/nagoya-mosque/",
    sourceLabel: "Japan Muslim Guide",
  },
  {
    name: "Kobe Muslim Mosque",
    city: "Kobe",
    area: "Chuo",
    address: "2-25-14 Nakayamate Dori, Chuo-ku, Kobe-shi, Hyogo",
    summary:
      "من أقدم وأهم مساجد اليابان، ومفيد جدا لزوار كوبي وكانساي.",
    tags: ["كوبي", "تاريخي", "مسجد"],
    sourceUrl: "https://muslim-guide.jp/mosque/kobe-muslim-mosque/",
    sourceLabel: "Japan Muslim Guide",
  },
];

export const halalRestaurants: Place[] = [
  {
    name: "HALAL WAGYU RAMEN SHINJUKU-TEI Asakusa Tokyo",
    city: "Tokyo",
    area: "Asakusa",
    address: "Asakusa, Taito-ku, Tokyo",
    summary:
      "رامن واجيو حلال؛ مذكور في Japan Muslim Guide كحلال مع مطبخ وأدوات حلال ومساحة صلاة.",
    tags: ["رامن", "حلال", "مساحة صلاة"],
    sourceUrl: "https://muslim-guide.jp/restaurant/city/tokyo/",
    sourceLabel: "Japan Muslim Guide",
  },
  {
    name: "HALAL WAGYU RAMEN SHINJUKU-TEI Ueno Park Tokyo",
    city: "Tokyo",
    area: "Ueno / Yushima",
    address: "Yushima, Bunkyo-ku, Tokyo",
    summary:
      "فرع قريب من أوينو بارك، ومذكور كحلال 100% بشهادة Japan Halal Foundation في Halal Food in Japan.",
    tags: ["رامن", "حلال موثق", "أوينو"],
    sourceUrl: "https://www.halalfoodinjapan.com/en/restaurant/Tokyo/ueno-asakusa-nippori/yushima/R11026/",
    sourceLabel: "Halal Food in Japan",
  },
  {
    name: "Halal Ramen & Dining Honolu Asakusa",
    city: "Tokyo",
    area: "Asakusa",
    address: "Asakusa, Taito-ku, Tokyo",
    summary:
      "رامن ياباني حلال في أساكوسا، مناسب للسياح بعد Senso-ji والمنطقة القديمة.",
    tags: ["رامن", "أساكوسا", "سياح"],
    sourceUrl: "https://www.halalfoodinjapan.com/en/restaurant/Tokyo/ueno-asakusa-nippori/asakusa/R10092/",
    sourceLabel: "Halal Food in Japan",
  },
  {
    name: "HALAL WAGYU YAKINIKU SHOUTAIAN Kanda",
    city: "Tokyo",
    area: "Kanda",
    address: "Kanda, Chiyoda-ku, Tokyo",
    summary:
      "ياكينيكو واجيو حلال، اختيار قوي لمن يريد تجربة لحم ياباني راقية.",
    tags: ["واجيو", "ياكينيكو", "حلال"],
    sourceUrl: "https://muslim-guide.jp/restaurant/city/tokyo/",
    sourceLabel: "Japan Muslim Guide",
  },
  {
    name: "KIMUKATSU HANARE",
    city: "Tokyo",
    area: "Tokyo",
    address: "Tokyo",
    summary:
      "مطعم ياباني مذكور كحلال في Japan Muslim Guide، مناسب لمن يريد تجربة قريبة من الطعام الياباني الكلاسيكي.",
    tags: ["ياباني", "حلال", "مطبخ منفصل"],
    sourceUrl: "https://muslim-guide.jp/restaurant/city/tokyo/",
    sourceLabel: "Japan Muslim Guide",
  },
  {
    name: "KOMEPURA",
    city: "Tokyo",
    area: "Tokyo",
    address: "Tokyo",
    summary:
      "تمبورا يابانية حلال، من الخيارات المفيدة لمن يريد طعاما يابانيا غير الرامن.",
    tags: ["تمبورا", "ياباني", "حلال"],
    sourceUrl: "https://muslim-guide.jp/restaurant/city/tokyo/",
    sourceLabel: "Japan Muslim Guide",
  },
  {
    name: "TokyoSushiBowl",
    city: "Tokyo",
    area: "Tokyo",
    address: "Tokyo",
    summary:
      "خيار مسلم فريندلي للسوشي/الأرز، راجع الصفحة قبل الزيارة لأن حالة الحلال قد تختلف حسب المنيو.",
    tags: ["سوشي", "مسلم فريندلي", "طوكيو"],
    sourceUrl: "https://muslim-guide.jp/restaurant/city/tokyo/",
    sourceLabel: "Japan Muslim Guide",
  },
  {
    name: "HALAL WAGYU RAMEN UMAIR",
    city: "Tokyo",
    area: "Yushima / Ueno",
    address: "Yushima, Bunkyo-ku, Tokyo",
    summary:
      "رامن واجيو حلال في منطقة أوينو/يوشيما مع رابط اتجاهات ومعلومات اتصال في Halal Food in Japan.",
    tags: ["رامن", "واجيو", "أوينو"],
    sourceUrl: "https://www.halalfoodinjapan.com/en/restaurant/Tokyo/ueno-asakusa-nippori/yushima/R11032/",
    sourceLabel: "Halal Food in Japan",
  },
  {
    name: "HALAL WAGYU RAMEN SHINJUKU-TEI Kiyomizu Kyoto",
    city: "Kyoto",
    area: "Kiyomizu",
    address: "Kiyomizu, Higashiyama-ku, Kyoto",
    summary:
      "رامن واجيو حلال قريب من منطقة كيوميزو السياحية.",
    tags: ["كيوتو", "رامن", "حلال"],
    sourceUrl: "https://muslim-guide.jp/restaurant/city/kyoto/",
    sourceLabel: "Japan Muslim Guide",
  },
  {
    name: "Honolu Premier Kyoto Gion",
    city: "Kyoto",
    area: "Gion",
    address: "Gion, Kyoto",
    summary:
      "رامن حلال في جيون، مذكور كمطبخ حلال ومساحة صلاة في Japan Muslim Guide.",
    tags: ["جيون", "رامن", "مساحة صلاة"],
    sourceUrl: "https://muslim-guide.jp/restaurant/city/kyoto/",
    sourceLabel: "Japan Muslim Guide",
  },
  {
    name: "Wagyu Volcano OAGARI Arashiyama",
    city: "Kyoto",
    area: "Arashiyama",
    address: "Arashiyama, Kyoto",
    summary:
      "واجيو حلال في أراشيياما، مفيد جدا في خط سير سياحي غرب كيوتو.",
    tags: ["واجيو", "أراشيياما", "حلال"],
    sourceUrl: "https://muslim-guide.jp/restaurant/city/kyoto/",
    sourceLabel: "Japan Muslim Guide",
  },
  {
    name: "COOKING SUN Japanese Cooking Class",
    city: "Kyoto",
    area: "Kyoto",
    address: "Kyoto",
    summary:
      "تجربة طبخ ياباني مع خيارات حلال/مسلم فريندلي؛ مناسبة للعائلات والزوار.",
    tags: ["تجربة", "طبخ", "مسلم فريندلي"],
    sourceUrl: "https://muslim-guide.jp/restaurant/city/kyoto/",
    sourceLabel: "Japan Muslim Guide",
  },
  {
    name: "Kiyomizu Junsei Okabeya",
    city: "Kyoto",
    area: "Kiyomizu",
    address: "Kiyomizu, Kyoto",
    summary:
      "مطعم يوبا/توفو ياباني مذكور كحلال؛ اختيار جيد لمن يريد طعاما يابانيا هادئا.",
    tags: ["توفو", "ياباني", "كيوتو"],
    sourceUrl: "https://muslim-guide.jp/restaurant/city/kyoto/",
    sourceLabel: "Japan Muslim Guide",
  },
  {
    name: "Halal Ramen HONOLU Osaka Namba",
    city: "Osaka",
    area: "Namba",
    address: "Namba, Osaka",
    summary:
      "رامن حلال في نامبا، مناسب جدا للسياح وسط أوساكا.",
    tags: ["أوساكا", "رامن", "نامبا"],
    sourceUrl: "https://muslim-guide.jp/restaurant/city/osaka/",
    sourceLabel: "Japan Muslim Guide",
  },
  {
    name: "1819OSAKA-Halal",
    city: "Osaka",
    area: "Osaka",
    address: "Osaka",
    summary:
      "واجيو حلال فاخر، مذكور مع مساحة صلاة ومستلزمات اتجاه القبلة في Japan Muslim Guide.",
    tags: ["واجيو", "حلال", "مساحة صلاة"],
    sourceUrl: "https://muslim-guide.jp/restaurant/1819osaka-halal/",
    sourceLabel: "Japan Muslim Guide",
  },
  {
    name: "OSAKA HALAL RESTAURANT SITARA",
    city: "Osaka",
    area: "Osaka",
    address: "Osaka",
    summary:
      "مطعم هندي/باكستاني حلال، غالبا اختيار آمن ومشبع للعائلات والمقيمين.",
    tags: ["هندي", "باكستاني", "حلال"],
    sourceUrl: "https://muslim-guide.jp/restaurant/city/osaka/",
    sourceLabel: "Japan Muslim Guide",
  },
  {
    name: "Mezze horie Turkish cafe",
    city: "Osaka",
    area: "Horie",
    address: "Horie, Osaka",
    summary:
      "كافيه تركي حلال، جيد لمن يريد أكلا قريبا من الذوق العربي/المتوسطي.",
    tags: ["تركي", "كافيه", "حلال"],
    sourceUrl: "https://muslim-guide.jp/restaurant/city/osaka/",
    sourceLabel: "Japan Muslim Guide",
  },
  {
    name: "SOJIBO",
    city: "Osaka",
    area: "Osaka",
    address: "Osaka",
    summary:
      "سوبا/أودون حلال حسب القائمة المنشورة، راجع الفرع والمنيو قبل الذهاب.",
    tags: ["سوبا", "أودون", "حلال"],
    sourceUrl: "https://muslim-guide.jp/restaurant/city/osaka/",
    sourceLabel: "Japan Muslim Guide",
  },
  {
    name: "Samurai Wagyu MUSASHI",
    city: "Osaka",
    area: "Osaka",
    address: "Osaka",
    summary:
      "ستيك هاوس واجيو حلال مع مساحة صلاة حسب Japan Muslim Guide.",
    tags: ["ستيك", "واجيو", "مساحة صلاة"],
    sourceUrl: "https://muslim-guide.jp/restaurant/city/osaka/",
    sourceLabel: "Japan Muslim Guide",
  },
];

export const starterChecklists: ChecklistGroup[] = [
  {
    title: "قبل السفر",
    items: [
      "راجع نوع التأشيرة من موقع وزارة الخارجية أو سفارة اليابان في بلدك.",
      "سجل بيانات الوصول على Visit Japan Web وجهز QR للهجرة والجمارك.",
      "جهز عنوان أول سكن ورقم تواصل ياباني إن وجد، وصورة من القبول/عقد العمل.",
      "احفظ نسخة أوفلاين من جواز السفر، التأشيرة، تذكرة العودة، التأمين، والأدوية.",
      "ابحث عن أقرب مسجد ومطعم حلال للسكن الأول واحفظهم في Google Maps.",
    ],
  },
  {
    title: "أول 14 يوم",
    items: [
      "سجل عنوانك في البلدية على بطاقة الإقامة إذا كنت مقيما.",
      "ادخل نظام التأمين الصحي الوطني أو تأمين الشركة/الجامعة حسب حالتك.",
      "افتح حساب بنك أو جهز وسيلة دفع مناسبة للفواتير والمواصلات.",
      "اشتر شريحة/خطة إنترنت، وحمل تطبيقات الخرائط والترجمة والطوارئ.",
      "تعلم نظام فرز النفايات في منطقتك لأن القواعد تختلف حسب البلدية.",
    ],
  },
  {
    title: "أول 90 يوم",
    items: [
      "ثبت روتين دفع الإيجار والفواتير والضرائب/المعاش إن كانت تنطبق عليك.",
      "احفظ أقرب مستشفى، صيدلية، مركز شرطة، ومركز إخلاء في Google Maps.",
      "اعمل قائمة مطاعم حلال آمنة حول البيت والعمل/الجامعة.",
      "جهز حقيبة طوارئ صغيرة للزلازل: ماء، طعام، بطارية، كشاف، أدوية، نسخ أوراق.",
      "ابدأ ملف مستندات مرتب: إقامة، ضرائب، تأمين، عقود، شهادات، فواتير مهمة.",
    ],
  },
  {
    title: "للسائح المسلم",
    items: [
      "خطط للصلاة حول المساجد أو غرف الصلاة داخل محطات/مولات/مزارات كبيرة.",
      "راجع حالة الحلال وساعات المطعم في نفس اليوم قبل الذهاب.",
      "احمل سناك حلال بسيط لأن الخيارات تقل خارج المدن الكبيرة.",
      "اسأل بوضوح عن لحم الخنزير، الكحول، المرقة، والجيلاتين قبل الطلب.",
      "استخدم IC card أو بطاقة دفع للقطارات، واحفظ آخر قطار للعودة.",
    ],
  },
];

export const phrasebook: Phrase[] = [
  {
    situation: "مطعم",
    arabic: "هل هذا الطعام حلال؟",
    japanese: "この料理はハラールですか。",
    romaji: "Kono ryori wa hararu desu ka.",
  },
  {
    situation: "مطعم",
    arabic: "هل يحتوي على لحم خنزير؟",
    japanese: "豚肉は入っていますか。",
    romaji: "Butaniku wa haitte imasu ka.",
  },
  {
    situation: "مطعم",
    arabic: "هل يحتوي على كحول أو ميرين؟",
    japanese: "アルコールやみりんは入っていますか。",
    romaji: "Arukoru ya mirin wa haitte imasu ka.",
  },
  {
    situation: "مطعم",
    arabic: "من فضلك بدون كحول وبدون لحم خنزير.",
    japanese: "アルコールと豚肉なしでお願いします。",
    romaji: "Arukoru to butaniku nashi de onegai shimasu.",
  },
  {
    situation: "صلاة",
    arabic: "هل يوجد مكان للصلاة؟",
    japanese: "お祈りできる場所はありますか。",
    romaji: "Oinori dekiru basho wa arimasu ka.",
  },
  {
    situation: "صلاة",
    arabic: "أحتاج خمس دقائق للصلاة.",
    japanese: "お祈りのために5分ほど必要です。",
    romaji: "Oinori no tame ni go-fun hodo hitsuyo desu.",
  },
  {
    situation: "بلدية",
    arabic: "أريد تسجيل عنواني.",
    japanese: "住所登録をしたいです。",
    romaji: "Jusho toroku o shitai desu.",
  },
  {
    situation: "بلدية",
    arabic: "هذه بطاقة الإقامة الخاصة بي.",
    japanese: "これは私の在留カードです。",
    romaji: "Kore wa watashi no zairyu kado desu.",
  },
  {
    situation: "سكن",
    arabic: "هل يمكنني استلام البريد على هذا العنوان؟",
    japanese: "この住所で郵便を受け取れますか。",
    romaji: "Kono jusho de yubin o uketoremasu ka.",
  },
  {
    situation: "مستشفى",
    arabic: "أشعر بألم هنا.",
    japanese: "ここが痛いです。",
    romaji: "Koko ga itai desu.",
  },
  {
    situation: "مستشفى",
    arabic: "هل يوجد طبيب يتحدث الإنجليزية؟",
    japanese: "英語を話せる先生はいますか。",
    romaji: "Eigo o hanaseru sensei wa imasu ka.",
  },
  {
    situation: "طوارئ",
    arabic: "اتصلوا بالإسعاف من فضلكم.",
    japanese: "救急車を呼んでください。",
    romaji: "Kyukyusha o yonde kudasai.",
  },
  {
    situation: "طوارئ",
    arabic: "أنا تائه وأحتاج مساعدة.",
    japanese: "道に迷いました。助けてください。",
    romaji: "Michi ni mayoimashita. Tasukete kudasai.",
  },
  {
    situation: "مواصلات",
    arabic: "أين أقرب محطة؟",
    japanese: "一番近い駅はどこですか。",
    romaji: "Ichiban chikai eki wa doko desu ka.",
  },
  {
    situation: "شراء",
    arabic: "هل يمكن الدفع بالبطاقة؟",
    japanese: "カードで払えますか。",
    romaji: "Kado de haraemasu ka.",
  },
];

export const emergencyCards = [
  {
    number: "110",
    title: "الشرطة",
    body: "للجريمة أو الحوادث أو الخطر المباشر.",
  },
  {
    number: "119",
    title: "إسعاف / إطفاء",
    body: "للطوارئ الطبية أو الحريق. قل: Kyukyusha للإسعاف أو Kaji للحريق.",
  },
  {
    number: "118",
    title: "خفر السواحل",
    body: "للحوادث البحرية أو الطوارئ على الساحل.",
  },
  {
    number: "9110",
    title: "استشارة الشرطة",
    body: "للمواقف غير العاجلة التي تحتاج نصيحة من الشرطة.",
  },
];

export const scenarios = [
  {
    title: "جاي كسائح",
    body: "ابدأ بـ Visit Japan Web، خريطة المساجد، مطاعم حول الفندق، وجمل المطعم والصلاة.",
  },
  {
    title: "جاي طالب",
    body: "ركز على البلدية، التأمين الصحي، حساب البنك، بطاقة الطالب، سكن قريب من مواصلات ومسجد.",
  },
  {
    title: "جاي شغل",
    body: "راجع عقد العمل، التأمين، الضرائب، السكن، وحقوقك من بوابة الهجرة الرسمية.",
  },
  {
    title: "عايش بالفعل في اليابان",
    body: "استخدمه كداشبورد تحديث: أماكن حلال، جمل جاهزة، روابط رسمية، وتجهيز طوارئ.",
  },
];
