export type ResourceLink = {
  title: string;
  description: string;
  url: string;
  label: string;
  category: "official" | "pdf" | "muslim" | "daily" | "emergency" | "apps" | "transport";
};

export type JapanLifePlaceKind = "mosque" | "prayer" | "food" | "market" | "service";
export type HalalConfidence = "certified" | "muslim-owned" | "muslim-friendly" | "verify";

export type JapanLifePlace = {
  id: string;
  kind: JapanLifePlaceKind;
  name: string;
  city: string;
  region: string;
  area: string;
  address: string;
  lat: number;
  lng: number;
  summary: string;
  tags: string[];
  bestFor: string;
  confidence: HalalConfidence;
  sourceUrl: string;
  sourceLabel: string;
};

export type Place = JapanLifePlace;
export type Phrase = { situation: string; arabic: string; japanese: string; romaji: string };
export type ChecklistGroup = { title: string; items: string[] };
export type RegionGuide = { region: string; cities: string; summary: string; focus: string[] };
export type CityCoverageHub = { city: string; region: string; center: string; lat: number; lng: number; note: string };

export function mapsUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function placeMapsUrl(place: Pick<JapanLifePlace, "lat" | "lng" | "name">) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${place.lat},${place.lng} ${place.name}`)}`;
}

export function placeDirectionsUrl(place: Pick<JapanLifePlace, "lat" | "lng">) {
  return `https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}`;
}

export function hubSearchUrl(hub: Pick<CityCoverageHub, "lat" | "lng">, query: string) {
  return `https://www.google.com/maps/search/${encodeURIComponent(query)}/@${hub.lat},${hub.lng},13z`;
}

export const officialResources: ResourceLink[] = [
  { title: "دليل العيش والعمل في اليابان", description: "الدليل الرسمي من وكالة خدمات الهجرة للإقامة، العمل، الصحة، التعليم، الضرائب، السكن، والكوارث.", url: "https://www.moj.go.jp/isa/support/portal/guidebook_all.html?lang=en", label: "Immigration Services Agency", category: "official" },
  { title: "بوابة دعم المقيمين الأجانب", description: "روابط رسمية للحياة اليومية: السكن، المرور، النفايات، العمل، الصحة، والتعليم.", url: "https://www.moj.go.jp/isa/support/portal/daily.html?lang=en", label: "Foreign Resident Support Portal", category: "daily" },
  { title: "Visit Japan Web", description: "الخدمة الرسمية لتسجيل إجراءات الدخول والجمارك قبل الوصول إلى اليابان.", url: "https://services.digital.go.jp/en/visit-japan-web/", label: "Digital Agency", category: "official" },
  { title: "تأشيرات اليابان", description: "صفحة وزارة الخارجية اليابانية لمعرفة متطلبات التأشيرة حسب بلدك والسفارة المسؤولة.", url: "https://www.mofa.go.jp/j_info/visit/visa/index.html", label: "MOFA Japan", category: "official" },
  { title: "إقرار الجمارك الإلكتروني", description: "معلومات الجمارك الرسمية للمسافرين، والأدوية، والأموال، والأغراض التي تحتاج تصريح.", url: "https://www.customs.go.jp/english/passenger/declaration/declaration_app.html", label: "Japan Customs", category: "official" },
  { title: "TOKYO MUSLIM Travelers' Guide 2026-2027", description: "دليل طوكيو الرسمي للمسلمين: مطاعم، أماكن صلاة، فنادق، ومتاجر تساعد الزائر المسلم.", url: "https://www.gotokyo.org/book/en/list/1664/", label: "GO TOKYO", category: "muslim" },
  { title: "JNTO Muslim Travelers Guide", description: "الدليل السياحي الرسمي للمسافر المسلم، مع تنبيه أن اليابان لا تملك جهة اعتماد حلال مركزية واحدة.", url: "https://www.japan.travel/en/guide/muslim-travelers/", label: "JNTO", category: "muslim" },
  { title: "Halal Gourmet Japan", description: "قاعدة بحث كبيرة للمطاعم الحلال/المسلم فريندلي، المساجد، وغرف الصلاة مع فلاتر حسب المكان.", url: "https://halalgourmet.jp/", label: "Halal Gourmet", category: "muslim" },
  { title: "Japan Muslim Guide", description: "دليل مطاعم وفنادق ومساجد ومساحات صلاة للمسلمين في اليابان.", url: "https://muslim-guide.jp/", label: "Japan Muslim Guide", category: "muslim" },
  { title: "Halal Navi", description: "تطبيق/ويب للبحث عن المطاعم الحلال والمساجد وغرف الصلاة، مفيد للبحث من محطة أو منطقة سياحية.", url: "https://www.halal-navi.com/", label: "Halal Navi", category: "apps" },
  { title: "Safety tips", description: "تطبيق JNTO الرسمي للتنبيهات: زلازل، تسونامي، طقس شديد، ومعلومات سلامة بعدة لغات.", url: "https://www.jnto.go.jp/safety-tips/eng/app.html", label: "JNTO Safety tips", category: "emergency" },
  { title: "NERV Disaster Prevention", description: "تطبيق تنبيهات كوارث حسب موقعك: زلازل، تسونامي، براكين، أمطار، وانهيارات.", url: "https://nerv.app/en/", label: "NERV", category: "emergency" },
  { title: "Tokyo Living Guide", description: "دليل عملي للمقيمين الجدد في طوكيو: البلدية، السكن، الصحة، المدارس، اللغة، والنفايات.", url: "https://tabunka.tokyo-tsunagari.or.jp/english/useful/yourguide.html", label: "Tokyo TIPS", category: "pdf" },
  { title: "NAVITIME for Japan Travel", description: "تخطيط مواصلات داخل اليابان، مفيد للقطارات والمشي وربط المزارات بالمطاعم وأماكن الصلاة.", url: "https://japantravel.navitime.com/en/", label: "NAVITIME", category: "transport" },
  { title: "Google Translate", description: "حمل اليابانية أوفلاين قبل السفر؛ الكاميرا مهمة جدا للمنيو واللافتات ومكونات المنتجات.", url: "https://translate.google.com/", label: "Google Translate", category: "apps" },
];

export const cityCoverageHubs: CityCoverageHub[] = [
  { city: "Tokyo", region: "Kanto", center: "Tokyo Station", lat: 35.6812, lng: 139.7671, note: "ابدأ من Tokyo Station ثم افتح Ueno/Shinjuku/Shibuya حسب خط سيرك." },
  { city: "Shinjuku", region: "Kanto", center: "Shinjuku Station", lat: 35.6896, lng: 139.7006, note: "منطقة قوية للأكل والمتاجر، خصوصا Shin-Okubo وما حولها." },
  { city: "Ueno", region: "Kanto", center: "Ueno Station", lat: 35.7138, lng: 139.7773, note: "قريبة من As-Salaam Masjid ومطاعم كثيرة حول Okachimachi." },
  { city: "Asakusa", region: "Kanto", center: "Asakusa Station", lat: 35.7114, lng: 139.7966, note: "مهم للسياحة السريعة حول Senso-ji وSkytree." },
  { city: "Yokohama", region: "Kanto", center: "Yokohama Station", lat: 35.4658, lng: 139.6223, note: "استخدمه لو يومك بين Yokohama وMinato Mirai." },
  { city: "Narita", region: "Kanto", center: "Narita Airport", lat: 35.772, lng: 140.3929, note: "أهم نقطة وصول؛ احفظ الصلاة والأكل قبل النزول من المطار." },
  { city: "Saitama", region: "Kanto", center: "Omiya Station", lat: 35.9063, lng: 139.6235, note: "منطقة سكنية/عمل كبيرة، الخيارات تحتاج بحث قريب." },
  { city: "Nagoya", region: "Chubu", center: "Nagoya Station", lat: 35.1709, lng: 136.8815, note: "راجع Nagoya Mosque وخيارات Sakae/Osu." },
  { city: "Gifu", region: "Chubu", center: "Gifu Station", lat: 35.4095, lng: 136.7565, note: "مفيد للطلاب والمقيمين في تشوبو خارج ناغويا." },
  { city: "Kanazawa", region: "Hokuriku", center: "Kanazawa Station", lat: 36.5781, lng: 136.648, note: "تغطية أقل؛ استخدم البحث الحي واحفظ البدائل قبل الرحلة." },
  { city: "Toyama", region: "Hokuriku", center: "Toyama Station", lat: 36.7014, lng: 137.213, note: "مدينة انتقالية مهمة بين هوكوريكو والألب اليابانية." },
  { city: "Nagano", region: "Chubu", center: "Nagano Station", lat: 36.6433, lng: 138.1889, note: "الخيارات قليلة؛ خطط للأكل قبل الرحلات الجبلية." },
  { city: "Kyoto", region: "Kansai", center: "Kyoto Station", lat: 34.9858, lng: 135.7588, note: "وزع يومك بين Kyoto Station وGion وArashiyama." },
  { city: "Osaka", region: "Kansai", center: "Namba Station", lat: 34.6657, lng: 135.5019, note: "Namba/Umeda/Shin-Osaka أفضل نقاط بداية للأكل الحلال." },
  { city: "Kobe", region: "Kansai", center: "Sannomiya Station", lat: 34.6941, lng: 135.1955, note: "Kobe Mosque قريب من Sannomiya ومفيد جدا في خط سير كوبي." },
  { city: "Nara", region: "Kansai", center: "Kintetsu Nara Station", lat: 34.6844, lng: 135.8271, note: "رحلة يوم واحد؛ خلي بديل نباتي/حلال قبل الوصول." },
  { city: "Hiroshima", region: "Chugoku", center: "Hiroshima Station", lat: 34.3973, lng: 132.4757, note: "ابدأ من المحطة ثم ابحث حول Peace Park وMiyajima route." },
  { city: "Okayama", region: "Chugoku", center: "Okayama Station", lat: 34.6664, lng: 133.9186, note: "محطة تحويل مهمة بين Kansai وChugoku/Shikoku." },
  { city: "Fukuoka", region: "Kyushu", center: "Hakata Station", lat: 33.5902, lng: 130.4208, note: "Fukuoka Masjid قريب من Hakozaki؛ Hakata نقطة بداية ممتازة." },
  { city: "Kumamoto", region: "Kyushu", center: "Kumamoto Station", lat: 32.7908, lng: 130.6898, note: "استخدم البحث الحي قبل رحلات Aso أو المدن الصغيرة." },
  { city: "Sapporo", region: "Hokkaido", center: "Sapporo Station", lat: 43.0687, lng: 141.3508, note: "راجع Sapporo Masjid والمطاعم حول Susukino." },
  { city: "Sendai", region: "Tohoku", center: "Sendai Station", lat: 38.2602, lng: 140.8824, note: "تغطية الشمال أقل، فاحفظ نتائج الخرائط قبل التحرك." },
  { city: "Naha", region: "Okinawa", center: "Kencho-mae Station", lat: 26.2145, lng: 127.6792, note: "في أوكيناوا لازم تأكد المواعيد والحالة من المصدر قبل الخروج." },
];

export const japanLifePlaces: JapanLifePlace[] = [
  { id: "tokyo-camii", kind: "mosque", name: "Tokyo Camii & Diyanet Turkish Culture Center", city: "Tokyo", region: "Kanto", area: "Yoyogi-Uehara", address: "1-19 Oyamacho, Shibuya-ku, Tokyo", lat: 35.6699, lng: 139.6802, summary: "أشهر مسجد في طوكيو ومناسب كأول نقطة صلاة وتعريف بالمجتمع المسلم.", tags: ["جمعة", "وضوء", "مركز ثقافي"], bestFor: "أول زيارة في طوكيو", confidence: "muslim-owned", sourceUrl: "https://tokyocamii.org/welcome-message/", sourceLabel: "Tokyo Camii" },
  { id: "otsuka-masjid", kind: "mosque", name: "Otsuka Masjid", city: "Tokyo", region: "Kanto", area: "Otsuka / Ikebukuro", address: "3-42-7 Minami Otsuka, Toshima-ku, Tokyo", lat: 35.7286, lng: 139.7297, summary: "مسجد نشط يخدم منطقة أوتسوكا/إكيبوكورو ومناسب للطلاب والمقيمين.", tags: ["جمعة", "توشيما", "إكيبوكورو"], bestFor: "شمال وسط طوكيو", confidence: "muslim-owned", sourceUrl: "https://muslim-guide.jp/mosque/otsuka-masjid/", sourceLabel: "Japan Muslim Guide" },
  { id: "as-salaam-masjid", kind: "mosque", name: "As-Salaam Masjid", city: "Tokyo", region: "Kanto", area: "Ueno / Okachimachi", address: "4-6-7 Taito, Taito-ku, Tokyo", lat: 35.7037, lng: 139.7788, summary: "مسجد قريب من أوينو وأوكاتشيماشي مع مطاعم وأسواق حلال قريبة.", tags: ["جمعة", "أوينو", "مطاعم قريبة"], bestFor: "يوم أوينو/أكيهابارا", confidence: "muslim-owned", sourceUrl: "https://muslim-guide.jp/mosque/as-salaam-masjid/", sourceLabel: "Japan Muslim Guide" },
  { id: "hiroo-mosque", kind: "mosque", name: "Arabic Islamic Institute / Hiroo Mosque", city: "Tokyo", region: "Kanto", area: "Hiroo / Motoazabu", address: "3-4-15 Motoazabu, Minato City, Tokyo", lat: 35.6532, lng: 139.7279, summary: "مركز عربي إسلامي في هيرو/أزابو، مفيد للعرب لقربه من مؤسسات عربية.", tags: ["عربي", "مسجد", "مركز إسلامي"], bestFor: "العرب في وسط طوكيو", confidence: "muslim-owned", sourceUrl: "https://halalwins.com/mosques/the-arabic-islamic-institute-in-tokyo-hiroo-mosque/", sourceLabel: "HalalWins" },
  { id: "asakusa-mosque", kind: "mosque", name: "Asakusa Mosque", city: "Tokyo", region: "Kanto", area: "Asakusa", address: "Asakusa, Taito-ku, Tokyo", lat: 35.7178, lng: 139.7956, summary: "مسجد قريب من أساكوسا وسينسوجي، مفيد جدا للسياح.", tags: ["أساكوسا", "سياحة", "جمعة"], bestFor: "يوم أساكوسا وسكاي تري", confidence: "muslim-owned", sourceUrl: "https://halalgourmet.jp/pray/place-types/mosques", sourceLabel: "Halal Gourmet" },
  { id: "kamata-masjid", kind: "mosque", name: "Kamata Masjid", city: "Tokyo", region: "Kanto", area: "Ota / Kamata", address: "Kamata, Ota-ku, Tokyo", lat: 35.5628, lng: 139.7157, summary: "مسجد مفيد جنوب طوكيو وقريب نسبيا من خطوط الوصول لهانيدا.", tags: ["جنوب طوكيو", "هانيدا", "جمعة"], bestFor: "هانيدا وجنوب طوكيو", confidence: "muslim-owned", sourceUrl: "https://halalgourmet.jp/pray/place-types/mosques", sourceLabel: "Halal Gourmet" },
  { id: "hira-masjid-gyotoku", kind: "mosque", name: "Hira Masjid Gyotoku", city: "Chiba", region: "Kanto", area: "Gyotoku", address: "3-3-19 Gyotoku Ekimae, Ichikawa-shi, Chiba", lat: 35.6815, lng: 139.9137, summary: "مسجد مهم للناس الساكنة شرق طوكيو أو في إيتشيكاوا/تشيبـا.", tags: ["تشيبـا", "شرق طوكيو", "جمعة"], bestFor: "إيتشيكاوا وخط Tozai", confidence: "muslim-owned", sourceUrl: "https://muslim-guide.jp/mosque/hira-masjid/", sourceLabel: "Japan Muslim Guide" },
  { id: "yokohama-jamia", kind: "mosque", name: "Yokohama Jamia Masjid", city: "Yokohama", region: "Kanto", area: "Yokohama", address: "Yokohama, Kanagawa", lat: 35.4413, lng: 139.6429, summary: "نقطة صلاة رئيسية في يوكوهاما وكاناغاوا.", tags: ["كاناغاوا", "يوكوهاما", "جمعة"], bestFor: "يوكوهاما وميناتو ميراي", confidence: "muslim-owned", sourceUrl: "https://halalgourmet.jp/pray/place-types/mosques", sourceLabel: "Halal Gourmet" },
  { id: "nagoya-mosque", kind: "mosque", name: "Nagoya Mosque", city: "Nagoya", region: "Chubu", area: "Nakamura", address: "2-26-7 Honjindori, Nakamura-ku, Nagoya, Aichi", lat: 35.1766, lng: 136.8706, summary: "المسجد الرئيسي في ناغويا ومركز مهم للمقيمين في آيتشي وتشوبو.", tags: ["ناغويا", "آيتشي", "جمعة"], bestFor: "ناغويا وما حولها", confidence: "muslim-owned", sourceUrl: "https://muslim-guide.jp/mosque/nagoya-mosque/", sourceLabel: "Japan Muslim Guide" },
  { id: "gifu-mosque", kind: "mosque", name: "Gifu Mosque", city: "Gifu", region: "Chubu", area: "Gifu", address: "Gifu, Gifu Prefecture", lat: 35.4132, lng: 136.7566, summary: "مسجد مهم للطلاب والمقيمين في غيفو ومنطقة تشوبو.", tags: ["غيفو", "طلاب", "جمعة"], bestFor: "غيفو والمناطق الجامعية", confidence: "muslim-owned", sourceUrl: "https://halalgourmet.jp/pray/place-types/mosques", sourceLabel: "Halal Gourmet" },
  { id: "kyoto-masjid", kind: "mosque", name: "Kyoto Masjid", city: "Kyoto", region: "Kansai", area: "Kamigyo", address: "Miyagaki-cho 92, Kamigyo-ku, Kyoto-shi, Kyoto", lat: 35.0275, lng: 135.7601, summary: "مسجد كيوتو التابع للمركز الإسلامي، نقطة مهمة للطلاب والزوار.", tags: ["كيوتو", "طلاب", "جمعة"], bestFor: "وسط كيوتو والجامعات", confidence: "muslim-owned", sourceUrl: "https://muslim-guide.jp/mosque/kyoto-masjid/", sourceLabel: "Japan Muslim Guide" },
  { id: "kyoto-central-masjid", kind: "mosque", name: "Kyoto Central Masjid", city: "Kyoto", region: "Kansai", area: "Sakyo", address: "66 Tanaka Minamiokubocho, Sakyo Ward, Kyoto", lat: 35.0332, lng: 135.7808, summary: "مسجد مركزي في كيوتو، مفيد عند التنقل بين مناطق الجامعة والسياحة.", tags: ["كيوتو", "ساكيو", "جمعة"], bestFor: "شرق كيوتو", confidence: "muslim-owned", sourceUrl: "https://www.halalfoodmaps.com/venue/1eKnLlCFdUPO2SEytywp?lang=en", sourceLabel: "Halal Food Maps" },
  { id: "osaka-masjid", kind: "mosque", name: "Osaka Masjid", city: "Osaka", region: "Kansai", area: "Nishiyodogawa", address: "4-12-16 Owada, Nishiyodogawa-ku, Osaka", lat: 34.7105, lng: 135.4447, summary: "من أشهر مساجد أوساكا ونقطة بداية جيدة للمقيمين في كانساي.", tags: ["أوساكا", "كانساي", "جمعة"], bestFor: "أوساكا وكوبي", confidence: "muslim-owned", sourceUrl: "https://halalgourmet.jp/pray/prefectures/osaka", sourceLabel: "Halal Gourmet" },
  { id: "osaka-ibaraki-mosque", kind: "mosque", name: "Osaka Ibaraki Mosque", city: "Osaka", region: "Kansai", area: "Ibaraki", address: "4-6-13 Toyokawa, Ibaraki City, Osaka", lat: 34.8317, lng: 135.5553, summary: "مسجد في شمال أوساكا، مناسب للطلاب والمقيمين حول إباراكي وسويتا.", tags: ["شمال أوساكا", "طلاب", "جمعة"], bestFor: "سويتا وإباراكي", confidence: "muslim-owned", sourceUrl: "https://muslim-guide.jp/mosque/osaka-ibaraki-mosque/", sourceLabel: "Japan Muslim Guide" },
  { id: "kobe-muslim-mosque", kind: "mosque", name: "Kobe Muslim Mosque", city: "Kobe", region: "Kansai", area: "Chuo", address: "2-25-14 Nakayamate Dori, Chuo-ku, Kobe-shi, Hyogo", lat: 34.6964, lng: 135.1883, summary: "من أقدم وأهم مساجد اليابان، ومفيد جدا لزوار كوبي وكانساي.", tags: ["كوبي", "تاريخي", "جمعة"], bestFor: "كوبي وساننوميا", confidence: "muslim-owned", sourceUrl: "https://muslim-guide.jp/mosque/kobe-muslim-mosque/", sourceLabel: "Japan Muslim Guide" },
  { id: "fukuoka-masjid", kind: "mosque", name: "Fukuoka Masjid Al Nour Islamic Culture Center", city: "Fukuoka", region: "Kyushu", area: "Hakozaki", address: "3-2-18 Hakozaki, Higashi-ku, Fukuoka", lat: 33.6188, lng: 130.4216, summary: "المسجد الرئيسي في فوكوكا ومركز مهم للمسلمين في كيوشو.", tags: ["فوكوكا", "كيوشو", "جمعة"], bestFor: "فوكوكا وكيوشو", confidence: "muslim-owned", sourceUrl: "https://halalgourmet.jp/pray/place-types/mosques", sourceLabel: "Halal Gourmet" },
  { id: "sapporo-masjid", kind: "mosque", name: "Sapporo Masjid", city: "Sapporo", region: "Hokkaido", area: "Kita Ward", address: "Kita-ku, Sapporo, Hokkaido", lat: 43.0711, lng: 141.3495, summary: "مسجد سابورو، مهم للمقيمين والزوار في هوكايدو.", tags: ["سابورو", "هوكايدو", "جمعة"], bestFor: "سابورو والسياحة الشتوية", confidence: "muslim-owned", sourceUrl: "https://halalgourmet.jp/pray/place-types/mosques", sourceLabel: "Halal Gourmet" },
  { id: "narita-t1-prayer", kind: "prayer", name: "Narita Airport Prayer Room Terminal 1", city: "Narita", region: "Kanto", area: "Narita Airport", address: "Narita International Airport Terminal 1, Chiba", lat: 35.7719, lng: 140.3929, summary: "غرفة صلاة في المطار، ممتازة قبل/بعد الرحلة الدولية.", tags: ["مطار", "غرفة صلاة", "سفر"], bestFor: "الوصول والمغادرة من ناريتا", confidence: "muslim-friendly", sourceUrl: "https://halalgourmet.jp/pray/place-types/spaces", sourceLabel: "Halal Gourmet" },
  { id: "haneda-t3-prayer", kind: "prayer", name: "Haneda Airport Terminal 3 Prayer Room", city: "Tokyo", region: "Kanto", area: "Haneda Airport", address: "Haneda Airport Terminal 3, Ota-ku, Tokyo", lat: 35.5448, lng: 139.7685, summary: "غرفة صلاة في هانيدا، مهمة جدا للترانزيت والرحلات الدولية.", tags: ["مطار", "غرفة صلاة", "هانيدا"], bestFor: "رحلات هانيدا", confidence: "muslim-friendly", sourceUrl: "https://halalgourmet.jp/pray/place-types/spaces", sourceLabel: "Halal Gourmet" },
  { id: "kix-t1-prayer", kind: "prayer", name: "Kansai International Airport T1 Prayer Room", city: "Osaka", region: "Kansai", area: "Kansai Airport", address: "Kansai International Airport Terminal 1, Osaka", lat: 34.4355, lng: 135.2441, summary: "غرف صلاة في كانساي الدولي، مفيدة قبل دخول أوساكا/كيوتو أو عند المغادرة.", tags: ["مطار", "كانساي", "غرفة صلاة"], bestFor: "رحلات كانساي", confidence: "muslim-friendly", sourceUrl: "https://halalgourmet.jp/pray/place-types/spaces", sourceLabel: "Halal Gourmet" },
  { id: "tokyo-dome-prayer", kind: "prayer", name: "Tokyo Dome City Prayer Room", city: "Tokyo", region: "Kanto", area: "Korakuen", address: "1-3 Koraku, Bunkyo-ku, Tokyo", lat: 35.7056, lng: 139.7535, summary: "غرفة صلاة داخل Tokyo Dome City؛ مفيدة حول كوراكuen/أكيهابارا.", tags: ["غرفة صلاة", "مول", "وضوء"], bestFor: "Tokyo Dome وKorakuen", confidence: "muslim-friendly", sourceUrl: "https://halalgourmet.jp/pray/391574", sourceLabel: "Halal Gourmet" },
  { id: "halal-sakura", kind: "food", name: "Halal Sakura", city: "Tokyo", region: "Kanto", area: "Uguisudani / Ueno", address: "2-18-11 Negishi, Taito-ku, Tokyo", lat: 35.7238, lng: 139.7787, summary: "مطعم حلال معروف يقدم رامن وأطباق أوزبكية/يابانية قرب أوينو.", tags: ["رامن", "حلال موثق", "أوينو"], bestFor: "وجبة آمنة بعد أوينو", confidence: "certified", sourceUrl: "https://halalgourmet.jp/restaurant/195236", sourceLabel: "Halal Gourmet" },
  { id: "honolu-ebisu", kind: "food", name: "Halal Ramen & Dining Honolu Ebisu", city: "Tokyo", region: "Kanto", area: "Ebisu", address: "1F, 1-23-1 Ebisuminami, Shibuya-ku, Tokyo", lat: 35.6457, lng: 139.7103, summary: "رامن حلال مع مساحة صلاة؛ قريب من إبيسو وشibuya.", tags: ["رامن", "مساحة صلاة", "إبيسو"], bestFor: "رامن سريع في غرب طوكيو", confidence: "muslim-friendly", sourceUrl: "https://halalgourmet.jp/restaurant/726147", sourceLabel: "Halal Gourmet" },
  { id: "gyumon-shibuya", kind: "food", name: "Gyumon Shibuya", city: "Tokyo", region: "Kanto", area: "Shibuya", address: "Shibuya Ato Building 5F, 2-18-7 Higashi, Shibuya-ku, Tokyo", lat: 35.6534, lng: 139.7119, summary: "من أوائل مطاعم واجيو ياكينيكو الحلال في اليابان؛ تجربة يابانية قوية.", tags: ["واجيو", "ياكينيكو", "شibuya"], bestFor: "عشاء واجيو في طوكيو", confidence: "muslim-owned", sourceUrl: "https://gyumon-group.com/", sourceLabel: "Gyumon Group" },
  { id: "shinjukutei-sapporo", kind: "food", name: "HALAL WAGYU RAMEN SHINJUKU-TEI Sapporo", city: "Sapporo", region: "Hokkaido", area: "Susukino", address: "2F, 1-6 Minami 3-jo Higashi, Chuo-ku, Sapporo, Hokkaido", lat: 43.0576, lng: 141.3591, summary: "رامن واجيو حلال في سابورو مع غرفة صلاة وقائمة متعددة اللغات.", tags: ["رامن", "واجيو", "غرفة صلاة"], bestFor: "سياحة سابورو وسوسوكينو", confidence: "certified", sourceUrl: "https://www.halal-shinjukutei.com/sapporo-store", sourceLabel: "Shinjukutei" },
  { id: "ramen-gyukotsu-king", kind: "food", name: "Ramen Gyukotsu King Shin-Osaka", city: "Osaka", region: "Kansai", area: "Shin-Osaka", address: "Arde! Shin-Osaka 2F, 5-16-1 Nishinakajima, Yodogawa-ku, Osaka", lat: 34.7335, lng: 135.5003, summary: "رامن عظام بقر حلال داخل منطقة شين-أوساكا، ممتاز قبل/بعد الشينكانسن.", tags: ["رامن", "شينكانسن", "حلال موثق"], bestFor: "ترانزيت شين-أوساكا", confidence: "certified", sourceUrl: "https://halalgourmet.jp/restaurant/314819", sourceLabel: "Halal Gourmet" },
  { id: "naritaya-asakusa", kind: "food", name: "Naritaya Asakusa", city: "Tokyo", region: "Kanto", area: "Asakusa", address: "Asakusa, Taito-ku, Tokyo", lat: 35.7119, lng: 139.7938, summary: "رامن حلال مشهور للسياح قرب Senso-ji، مناسب ليوم أساكوسا.", tags: ["رامن", "أساكوسا", "سياح"], bestFor: "بعد زيارة Senso-ji", confidence: "muslim-friendly", sourceUrl: "https://halalgourmet.jp/prefectures/tokyo", sourceLabel: "Halal Gourmet" },
  { id: "panga-ueno", kind: "food", name: "A5 Wagyu Yakiniku PANGA Ueno", city: "Tokyo", region: "Kanto", area: "Ueno / Okachimachi", address: "Ueno, Taito-ku, Tokyo", lat: 35.7066, lng: 139.7757, summary: "ياكينيكو واجيو حلال قريب من أوينو وأوكاتشيماشي.", tags: ["واجيو", "ياكينيكو", "أوينو"], bestFor: "عشاء واجيو بعد التسوق", confidence: "muslim-friendly", sourceUrl: "https://www.halalgourmet.jp/features/tableware", sourceLabel: "Halal Gourmet" },
  { id: "tokyo-muslim-hanten", kind: "food", name: "Tokyo Muslim Hanten", city: "Tokyo", region: "Kanto", area: "Okachimachi / Ueno", address: "Ueno area, Tokyo", lat: 35.7071, lng: 139.7763, summary: "مطعم صيني حلال في منطقة أوينو، اختيار جيد للمجموعات والعائلات.", tags: ["صيني", "حلال", "عائلات"], bestFor: "أكل مشبع حول أوينو", confidence: "muslim-owned", sourceUrl: "https://halalgourmet.jp/", sourceLabel: "Halal Gourmet" },
  { id: "shinjukutei-akasaka", kind: "food", name: "HALAL WAGYU RESTAURANT SHINJUKU-TEI Akasaka", city: "Tokyo", region: "Kanto", area: "Akasaka", address: "2-21-1 Akasaka, Minato-ku, Tokyo", lat: 35.6718, lng: 139.7373, summary: "رامن/واجيو حلال في أكاساكا، مفيد وسط طوكيو وبين روبونغي وأكاساكا.", tags: ["واجيو", "رامن", "أكاساكا"], bestFor: "وسط طوكيو", confidence: "certified", sourceUrl: "https://halalgourmet.jp/prefectures/tokyo", sourceLabel: "Halal Gourmet" },
  { id: "honolu-nihonbashi", kind: "food", name: "Halal Ramen Honolu Nihonbashi", city: "Tokyo", region: "Kanto", area: "Nihonbashi", address: "4-9 Kobuna-cho, Nihonbashi, Chuo-ku, Tokyo", lat: 35.6871, lng: 139.7796, summary: "فرع هونولو في نيهونباشي، قريب من طوكيو ستيشن ومناطق الأعمال.", tags: ["رامن", "نيهونباشي", "وسط المدينة"], bestFor: "Tokyo Station/Nihonbashi", confidence: "muslim-friendly", sourceUrl: "https://fooddiversity.today/en/article_16405.html", sourceLabel: "Food Diversity" },
  { id: "halal-ramen-japan-nagoya", kind: "food", name: "Halal Ramen Japan Nagoya Sakae", city: "Nagoya", region: "Chubu", area: "Sakae", address: "Sakae, Nagoya, Aichi", lat: 35.1689, lng: 136.9084, summary: "رامن حلال في قلب ساكاي، مناسب ليوم التسوق وسط ناغويا.", tags: ["رامن", "ناغويا", "ساكاي"], bestFor: "وسط ناغويا", confidence: "certified", sourceUrl: "https://halalgourmet.jp/coupons", sourceLabel: "Halal Gourmet" },
  { id: "honolu-kyoto-gion", kind: "food", name: "Honolu Premier Kyoto Gion", city: "Kyoto", region: "Kansai", area: "Gion", address: "Gion, Kyoto", lat: 35.0038, lng: 135.7751, summary: "رامن حلال في جيون، قريب من كيوتو السياحية التقليدية.", tags: ["رامن", "جيون", "كيوتو"], bestFor: "يوم جيون/كيوميزو", confidence: "muslim-friendly", sourceUrl: "https://muslim-guide.jp/restaurant/city/kyoto/", sourceLabel: "Japan Muslim Guide" },
  { id: "wagyu-volcano-arashiyama", kind: "food", name: "Wagyu Volcano OAGARI Arashiyama", city: "Kyoto", region: "Kansai", area: "Arashiyama", address: "Arashiyama, Kyoto", lat: 35.015, lng: 135.6778, summary: "واجيو حلال/مسلم فريندلي في أراشيياما، مفيد جدا في خط سير غرب كيوتو.", tags: ["واجيو", "أراشيياما", "ياباني"], bestFor: "بعد غابة البامبو", confidence: "muslim-friendly", sourceUrl: "https://halalgourmet.jp/restaurants/prefectures/kyoto/genres/japanese", sourceLabel: "Halal Gourmet" },
  { id: "gyumon-kyoto", kind: "food", name: "Halal Wagyu GYUMON Kyoto Kawaramachi", city: "Kyoto", region: "Kansai", area: "Kawaramachi", address: "Kawaramachi, Kyoto", lat: 35.0049, lng: 135.7697, summary: "رامن/واجيو حلال في وسط كيوتو، مناسب حول كاواراماتشي وجيون.", tags: ["واجيو", "رامن", "كاواراماتشي"], bestFor: "وسط كيوتو", confidence: "certified", sourceUrl: "https://halalgourmet.jp/coupons", sourceLabel: "Halal Gourmet" },
  { id: "honolu-osaka-namba", kind: "food", name: "Halal Ramen Honolu Osaka Namba", city: "Osaka", region: "Kansai", area: "Namba", address: "Namba, Osaka", lat: 34.6644, lng: 135.5033, summary: "رامن حلال في نامبا، مناسب جدا للسياح وسط أوساكا.", tags: ["رامن", "نامبا", "أوساكا"], bestFor: "دوتونبوري/نامبا", confidence: "muslim-friendly", sourceUrl: "https://muslim-guide.jp/restaurant/city/osaka/", sourceLabel: "Japan Muslim Guide" },
  { id: "matsuri-osaka", kind: "food", name: "Matsuri Osaka", city: "Osaka", region: "Kansai", area: "Noda", address: "Noda, Osaka", lat: 34.6933, lng: 135.4744, summary: "مطعم ياباني مسلم فريندلي يقدم أكلات محلية بشكل مناسب للمسلمين.", tags: ["ياباني", "عائلات", "أوساكا"], bestFor: "تجربة أكل ياباني متنوعة", confidence: "muslim-friendly", sourceUrl: "https://muslim-guide.jp/restaurant/city/osaka/", sourceLabel: "Japan Muslim Guide" },
  { id: "alis-kitchen-osaka", kind: "food", name: "Ali's Kitchen Osaka", city: "Osaka", region: "Kansai", area: "Shinsaibashi", address: "Shinsaibashi, Osaka", lat: 34.6742, lng: 135.5017, summary: "مطعم باكستاني/هندي حلال في شينسايباشي؛ آمن ومشبع للمجموعات.", tags: ["باكستاني", "هندي", "حلال"], bestFor: "أكل آمن حول شينسايباشي", confidence: "muslim-owned", sourceUrl: "https://halalgourmet.jp/restaurants/prefectures/osaka", sourceLabel: "Halal Gourmet" },
  { id: "marhaba-osaka", kind: "food", name: "Best Halal Ramen Marhaba!", city: "Osaka", region: "Kansai", area: "Umeda", address: "Umeda, Osaka", lat: 34.7055, lng: 135.4983, summary: "رامن حلال في أوميدا، مناسب للناس حول أوساكا/أوميدا ستيشن.", tags: ["رامن", "أوميدا", "أوساكا"], bestFor: "Umeda / Osaka Station", confidence: "muslim-friendly", sourceUrl: "https://halalgourmet.jp/restaurant/785810", sourceLabel: "Halal Gourmet" },
  { id: "gyumon-hiroshima", kind: "food", name: "Halal Wagyu Ramen & Gyukatsu GYUMON Hiroshima", city: "Hiroshima", region: "Chugoku", area: "Hiroshima", address: "Hiroshima, Hiroshima Prefecture", lat: 34.3929, lng: 132.4601, summary: "رامن/جيوكاتسو واجيو حلال في هيروشيما؛ إضافة قوية خارج طوكيو/كانساي.", tags: ["واجيو", "رامن", "هيروشيما"], bestFor: "هيروشيما ومياجيما", confidence: "certified", sourceUrl: "https://halalgourmet.jp/genres/ramen", sourceLabel: "Halal Gourmet" },
  { id: "kobe-beef-nagomi", kind: "food", name: "Halal Kobe Beef Nagomi", city: "Kobe", region: "Kansai", area: "Sannomiya", address: "Kobe, Hyogo", lat: 34.6923, lng: 135.1903, summary: "مطعم متخصص في كوبي بيف حلال؛ مناسب لتجربة فاخرة في كوبي.", tags: ["كوبي بيف", "حلال", "فاخر"], bestFor: "تجربة كوبي بيف", confidence: "certified", sourceUrl: "https://halalgourmet.jp/features/prayer", sourceLabel: "Halal Gourmet" },
  { id: "national-mart-shinokubo", kind: "market", name: "National Mart Shin-Okubo", city: "Tokyo", region: "Kanto", area: "Shin-Okubo", address: "Shin-Okubo, Shinjuku-ku, Tokyo", lat: 35.7018, lng: 139.7004, summary: "سوبرماركت/متجر مكونات حلال وجنوب آسيوية، مفيد للمقيمين والطبخ في البيت.", tags: ["بقالة", "حلال", "شين-أوكوبو"], bestFor: "شراء لحم ومكونات للبيت", confidence: "muslim-friendly", sourceUrl: "https://halalgourmet.jp/", sourceLabel: "Halal Gourmet" },
  { id: "nasco-halal-food", kind: "market", name: "Nasco Halal Food", city: "Tokyo", region: "Kanto", area: "Shin-Okubo", address: "Shin-Okubo, Tokyo", lat: 35.7024, lng: 139.7008, summary: "متجر مكونات حلال حول شين-أوكوبو، مناسب للطلاب والمقيمين.", tags: ["بقالة", "لحم", "توابل"], bestFor: "تجهيز مطبخ البيت", confidence: "muslim-friendly", sourceUrl: "https://halalgourmet.jp/", sourceLabel: "Halal Gourmet" },
  { id: "fresc", kind: "service", name: "Foreign Residents Support Center FRESC", city: "Tokyo", region: "Kanto", area: "Yotsuya", address: "Yotsuya, Shinjuku-ku, Tokyo", lat: 35.6863, lng: 139.7289, summary: "مركز دعم رسمي للمقيمين الأجانب للاستشارات المتعلقة بالإقامة والعمل والحياة.", tags: ["رسمي", "إقامة", "دعم"], bestFor: "مشاكل الإقامة أو الاستقرار", confidence: "verify", sourceUrl: "https://www.moj.go.jp/isa/support/fresc/fresc01.html", sourceLabel: "Immigration Services Agency" },
];

export const mosquePlaces = japanLifePlaces.filter((place) => place.kind === "mosque");
export const prayerRooms = japanLifePlaces.filter((place) => place.kind === "prayer");
export const halalRestaurants = japanLifePlaces.filter((place) => place.kind === "food");
export const halalMarkets = japanLifePlaces.filter((place) => place.kind === "market");
export const supportServices = japanLifePlaces.filter((place) => place.kind === "service");

export const regionGuides: RegionGuide[] = [
  { region: "Kanto", cities: "Tokyo, Chiba, Yokohama", summary: "أكبر كثافة للمطاعم والمساجد. احفظ Tokyo Camii، Ueno/Okachimachi، Asakusa، وShin-Okubo.", focus: ["رامن حلال", "مساجد كثيرة", "متاجر مكونات", "مواصلات ممتازة"] },
  { region: "Kansai", cities: "Osaka, Kyoto, Kobe, Nara", summary: "أوساكا للأكل، كيوتو للمزارات، كوبي للمسجد التاريخي. التخطيط مهم لأن المسافات بين المزارات كبيرة.", focus: ["KIX prayer", "كيوتو تحتاج تخطيط", "أوساكا خيارات أكثر", "نارا يوم واحد"] },
  { region: "Chubu", cities: "Nagoya, Gifu", summary: "ناغويا فيها مسجد ومطاعم جيدة، لكن خارجها لازم تحفظ بدائل وتراجع المواعيد قبل الخروج.", focus: ["Nagoya Mosque", "Sakae/Osu", "بدائل نباتية", "قطارات"] },
  { region: "Hokkaido", cities: "Sapporo", summary: "سابورو بدأت تتحسن للمسافرين المسلمين، لكن البرد والمسافات يخلوا التخطيط أهم من طوكيو.", focus: ["Sapporo Masjid", "رامن حلال", "طقس", "حقيبة شتاء"] },
  { region: "Kyushu / Chugoku", cities: "Fukuoka, Hiroshima", summary: "التغطية أقل من كبرى المدن؛ احفظ المسجد/المطعم الأساسي قبل الرحلة وخلي خرائطك أوفلاين.", focus: ["Fukuoka Masjid", "Hiroshima", "مواعيد محدودة", "خطة بديلة"] },
];

export const foodSafetyRules = [
  "كلمة Muslim-friendly لا تعني دائما مطبخ حلال منفصل؛ اقرأ التفاصيل أو اسأل.",
  "اسأل عن pork/lard/gelatin/alcohol/mirin/dashi قبل الأكل الياباني التقليدي.",
  "لو المطعم يقدم كحول أو غير حلال، تحقق من الأدوات والزيت والمقلاة المشتركة.",
  "احفظ مطعمين بديلين حول نفس المنطقة، خصوصا في العطلات أو بعد الساعة 8 مساء.",
  "المطارات ومحطات كبرى مفيدة للصلاة، لكن بعض غرف الصلاة تحتاج سؤال الموظفين.",
];

export const starterChecklists: ChecklistGroup[] = [
  { title: "قبل السفر", items: ["راجع نوع التأشيرة من موقع وزارة الخارجية أو سفارة اليابان في بلدك.", "سجل بيانات الوصول على Visit Japan Web وجهز QR للهجرة والجمارك.", "حمل Google Maps offline للمدن التي ستزورها، وحمل اليابانية في Google Translate.", "ثبت Safety tips أو NERV للتنبيهات، وجهز تأمين سفر يغطي العلاج.", "احفظ أقرب مسجد ومطعم حلال للفندق الأول كروابط خرائط."] },
  { title: "أول 14 يوم للمقيم", items: ["سجل عنوانك في البلدية على بطاقة الإقامة إذا كانت مدة إقامتك تنطبق عليها القواعد.", "ادخل نظام التأمين الصحي الوطني أو تأمين الشركة/الجامعة حسب حالتك.", "افتح حساب بنك أو جهز وسيلة دفع للفواتير والمواصلات.", "اعرف قواعد النفايات في منطقتك لأن الأيام والألوان تختلف حسب البلدية.", "احفظ أقرب مستشفى، صيدلية، مركز شرطة، ومركز إخلاء في خرائطك."] },
  { title: "روتين مسلم عملي", items: ["اعرف المسجد أو غرفة الصلاة حول البيت والعمل/الجامعة.", "اعمل قائمة مطاعم آمنة حول المسارات اليومية وليس حول البيت فقط.", "احتفظ بكارت جمل يابانية للسؤال عن الخنزير والكحول والمرق.", "لو هتخرج يوم كامل، حدد صلاة واحدة على الأقل في مسجد أو غرفة صلاة مؤكدة.", "احمل سناك حلال بسيط عند زيارة مدن صغيرة أو مناطق جبلية."] },
  { title: "طوارئ وكوارث", items: ["110 للشرطة، 119 للإسعاف/الإطفاء، 118 لخفر السواحل.", "احفظ عنوان البيت بالياباني واسم أقرب محطة، لأنهما مهمان في الطوارئ.", "جهز حقيبة طوارئ: ماء، طعام، بطارية، كشاف، أدوية، نسخ أوراق.", "حدد مركز الإخلاء القريب من بيتك من موقع البلدية.", "وقت الزلزال: انزل تحت طاولة أو احم رأسك، ثم اتبع إرشادات المبنى والبلدية."] },
];

export const phrasebook: Phrase[] = [
  { situation: "مطعم", arabic: "هل هذا الطعام حلال؟", japanese: "この料理はハラールですか。", romaji: "Kono ryori wa hararu desu ka." },
  { situation: "مطعم", arabic: "هل لديكم شهادة حلال؟", japanese: "ハラール認証はありますか。", romaji: "Hararu ninsho wa arimasu ka." },
  { situation: "مطعم", arabic: "هل المطبخ أو الأدوات منفصلة؟", japanese: "調理器具は分けていますか。", romaji: "Chori kigu wa wakete imasu ka." },
  { situation: "مطعم", arabic: "هل يحتوي على لحم خنزير أو دهن خنزير؟", japanese: "豚肉やラードは入っていますか。", romaji: "Butaniku ya rado wa haitte imasu ka." },
  { situation: "مطعم", arabic: "هل يحتوي على كحول أو ميرين؟", japanese: "アルコールやみりんは入っていますか。", romaji: "Arukoru ya mirin wa haitte imasu ka." },
  { situation: "مطعم", arabic: "من فضلك بدون كحول وبدون لحم خنزير.", japanese: "アルコールと豚肉なしでお願いします。", romaji: "Arukoru to butaniku nashi de onegai shimasu." },
  { situation: "مطعم", arabic: "هل يوجد طبق نباتي بدون كحول؟", japanese: "アルコールなしのベジタリアン料理はありますか。", romaji: "Arukoru nashi no bejitarian ryori wa arimasu ka." },
  { situation: "صلاة", arabic: "هل يوجد مكان للصلاة؟", japanese: "お祈りできる場所はありますか。", romaji: "Oinori dekiru basho wa arimasu ka." },
  { situation: "صلاة", arabic: "أحتاج خمس دقائق للصلاة.", japanese: "お祈りのために5分ほど必要です。", romaji: "Oinori no tame ni go-fun hodo hitsuyo desu." },
  { situation: "بلدية", arabic: "أريد تسجيل عنواني.", japanese: "住所登録をしたいです。", romaji: "Jusho toroku o shitai desu." },
  { situation: "بلدية", arabic: "أريد الاشتراك في التأمين الصحي الوطني.", japanese: "国民健康保険に加入したいです。", romaji: "Kokumin kenko hoken ni kanyushitai desu." },
  { situation: "مستشفى", arabic: "هل يوجد طبيب يتحدث الإنجليزية؟", japanese: "英語を話せる先生はいますか。", romaji: "Eigo o hanaseru sensei wa imasu ka." },
  { situation: "طوارئ", arabic: "اتصلوا بالإسعاف من فضلكم.", japanese: "救急車を呼んでください。", romaji: "Kyukyusha o yonde kudasai." },
  { situation: "طوارئ", arabic: "يوجد حريق.", japanese: "火事です。", romaji: "Kaji desu." },
  { situation: "مواصلات", arabic: "أين أقرب محطة؟", japanese: "一番近い駅はどこですか。", romaji: "Ichiban chikai eki wa doko desu ka." },
  { situation: "شراء", arabic: "أبحث عن طعام بدون جيلاتين.", japanese: "ゼラチンなしの食品を探しています。", romaji: "Zerachin nashi no shokuhin o sagashite imasu." },
];

export const emergencyCards = [
  { number: "110", title: "الشرطة", body: "للجريمة أو الحوادث أو الخطر المباشر." },
  { number: "119", title: "إسعاف / إطفاء", body: "للطوارئ الطبية أو الحريق. قل: Kyukyusha للإسعاف أو Kaji للحريق." },
  { number: "118", title: "خفر السواحل", body: "للحوادث البحرية أو الطوارئ على الساحل." },
  { number: "9110", title: "استشارة الشرطة", body: "للمواقف غير العاجلة التي تحتاج نصيحة من الشرطة." },
];

export const scenarios = [
  { title: "سائح مسلم", body: "ابدأ بالموقع الحالي: أقرب صلاة، أقرب أكل، ثم خط سير اليوم." },
  { title: "طالب", body: "ركز على البلدية، التأمين، المسجد القريب، ومتاجر مكونات حلال للبيت." },
  { title: "شغل", body: "راجع الإقامة والعمل والتأمين، واحفظ أماكن الصلاة حول المكتب والسكن." },
  { title: "مقيم", body: "استخدمه كداشبورد يومي: طوارئ، مطاعم، متاجر، وروابط رسمية." },
];
