(function () {
  if (!window.i18next) return;

  const hu = {
    "Work": "Munkák",
    "About": "Rólam",
    "Process": "Folyamat",
    "Packages": "Csomagok",
    "FAQs": "GYIK",
    "Get Started": "Kapcsolat",
    "View Packages": "Csomagok megtekintése",
    "Home": "Főoldal",
    "Company": "Cég",
    "Resources": "Források",
    "Get in Touch": "Kapcsolat",
    "Ready to discuss your Shopify development needs?": "Beszéljünk a Shopify fejlesztési igényeidről.",
    "White-label Shopify development for agencies and technical teams - apps, integrations, and advanced builds.": "White-label Shopify fejlesztés ügynökségeknek és technikai csapatoknak - appok, integrációk és haladó fejlesztések.",
    "CheckoutLabs. All rights reserved.": "CheckoutLabs. Minden jog fenntartva.",
    "Privacy Policy": "Adatvédelmi tájékoztató",
    "Terms of Service": "Felhasználási feltételek",
    "Senior Shopify Development for Agencies": "Senior Shopify fejlesztés ügynökségeknek",
    "Senior Shopify Development": "Senior Shopify fejlesztés",
    "Without the Full-Time Hire": "teljes munkaidős felvétel nélkül",
    "I help agencies and technical teams ship advanced Shopify work - custom apps, integrations, checkout customizations and complex storefront builds, delivered async on a flexible monthly basis.": "Ügynökségeknek és technikai csapatoknak segítek haladó Shopify fejlesztéseket leszállítani - egyedi appokat, integrációkat, checkout testreszabásokat és komplex storefront munkákat, rugalmas havi együttműködésben.",
    "Advanced Shopify Engineering": "Haladó Shopify engineering",
    "Custom apps, complex business logic, and checkout-level customizations when needed.": "Egyedi appok, komplex üzleti logika és checkout-szintű testreszabások, amikor erre van szükség.",
    "Maintainable, Native-First Solutions": "Karbantartható, native-first megoldások",
    "B2B pricing patterns, MOQ rules, and workflows using Shopify-native capabilities whenever possible.": "B2B árazási minták, MOQ szabályok és workflow-k Shopify-native megoldásokkal, ahol ez ésszerű.",
    "White-Label Delivery for Agencies": "White-label delivery ügynökségeknek",
    "I plug into your tickets + comms and ship like an in-house senior developer.": "Becsatlakozom a ticketekbe és kommunikációba, és úgy szállítok, mint egy belsős senior fejlesztő.",
    "No long-term contracts â€˘ Cancel anytime": "Nincs hosszú távú szerződés - bármikor lemondható",
    "Selected brands & teams I've worked with": "Válogatott brandek és csapatok, akikkel dolgoztam",
    "Experience spanning Shopify brands, e-commerce agencies and software engineering teams.": "Tapasztalat Shopify brandekkel, e-commerce ügynökségekkel és szoftverfejlesztő csapatokkal.",
    "Flexible Monthly Capacity Packages": "Rugalmas havi kapacitás csomagok",
    "Choose the package that fits your team’s needs. Scale up or down as your projects require.": "Válaszd azt a csomagot, amely illik a csapatod igényeihez. A projektjeid szerint skálázható.",
    "10 Hours/Month": "10 óra / hónap",
    "20 Hours/Month": "20 óra / hónap",
    "Perfect for ongoing maintenance and smaller enhancements": "Folyamatos karbantartáshoz és kisebb fejlesztésekhez",
    "Ideal for active development and feature builds": "Aktív fejlesztéshez és feature-építéshez ideális",
    "What I Handle": "Miben tudok segíteni",
    "Senior Shopify engineering focused on performance, maintainability, and conversion - delivered white-label when needed.": "Senior Shopify engineering fókuszban teljesítménnyel, karbantarthatósággal és konverzióval - szükség esetén white-label módon.",
    "Native B2B Pricing & Rules": "Native B2B árazás és szabályok",
    "Checkout UI Extensions": "Checkout UI extensionök",
    "Product Configurators": "Termékkonfigurátorok",
    "Conversion Quizzes": "Konverziós kvízek",
    "A straightforward process for agencies and technical teams who need reliable senior Shopify support.": "Egyszerű folyamat ügynökségeknek és technikai csapatoknak, akik megbízható senior Shopify támogatást keresnek.",
    "Intro Call": "Intro hívás",
    "I will map your team's needs, technical requirements, and where a monthly capacity package can support delivery.": "Feltérképezem a csapatod igényeit, a technikai követelményeket, és hogy hol tud segíteni a havi kapacitás.",
    "Proposal & Package": "Ajánlat és csomag",
    "I will provide a clear proposal with the selected monthly package, scope boundaries, and an async-first communication setup.": "Világos ajánlatot adok a kiválasztott havi csomaggal, scope határokkal és async-first kommunikációs felállással.",
    "Ongoing Support": "Folyamatos támogatás",
    "I integrate with your workflow, deliver white-label work, and provide async updates with clear ownership. Scale as your needs evolve.": "Beilleszkedem a workflow-dba, white-label módon szállítok, és egyértelmű ownership mellett adok async státuszokat. A kapacitás az igényekkel skálázható.",
    "Who I Work With": "Kikkel dolgozom",
    "CheckoutLabs is my senior Shopify development practice for agencies, technical teams, and digital partners who need advanced builds and checkout customizations without adding headcount.": "A CheckoutLabs a senior Shopify fejlesztői praxisom ügynökségeknek, technikai csapatoknak és digitális partnereknek, akik headcount növelése nélkül keresnek haladó fejlesztést és checkout testreszabást.",
    "Shopify Agencies": "Shopify ügynökségek",
    "Technical Teams": "Technikai csapatok",
    "Digital Partners": "Digitális partnerek",
    "Offer Shopify development to your clients under your brand with my white-label support.": "Shopify fejlesztést kínálhatsz az ügyfeleidnek a saját branded alatt, az én white-label támogatásommal.",
    "View selected Shopify work ->": "Válogatott Shopify munkák ->",
    "Frequently Asked Questions": "Gyakori kérdések",
    "Everything you need to know about my monthly capacity packages and how I work.": "A legfontosabb tudnivalók a havi kapacitás csomagokról és a közös munkáról.",
    "What happens to unused hours each month?": "Mi történik a fel nem használt órákkal?",
    "How do communication and collaboration work?": "Hogyan működik a kommunikáció és az együttműködés?",
    "What’s your cancellation policy?": "Mi a lemondási feltétel?",
    "Can you work white-label for our clients?": "Tudsz white-label módon dolgozni az ügyfeleinknek?",
    "Still have questions?": "Maradt kérdésed?",
    "Need Reliable Senior Shopify Development Capacity?": "Megbízható senior Shopify fejlesztői kapacitásra van szükséged?",
    "Let's discuss how my monthly capacity packages can support your agency or technical team without the overhead of hiring full-time.": "Beszéljük át, hogyan tudják a havi kapacitás csomagjaim támogatni az ügynökségedet vagy technikai csapatodat teljes munkaidős felvétel nélkül.",
    "Send me a message": "Írj üzenetet",
    "I will explore your needs and see if there is a good fit. No pressure, no commitment.": "Átnézem az igényeidet, és megnézzük, van-e jó illeszkedés. Nincs nyomás, nincs kötelezettség.",
    "Work Email": "Munkahelyi email",
    "What do you need help with?": "Miben kell segítség?",
    "A short summary (store link optional).": "Rövid összefoglaló (store link opcionális).",
    "Send message": "Üzenet küldése",
    "Book a 15-min intro call": "15 perces intro hívás foglalása",
    "I will respond within 1 business day - No sales pressure": "1 munkanapon belül válaszolok - nincs sales nyomás",
    "Selected Shopify Work": "Válogatott Shopify munkák",
    "Shopify development built around real business problems.": "Shopify fejlesztés valós üzleti problémák köré építve.",
    "This page includes selected work completed independently and as part of agency development teams.": "Ez az oldal önállóan és ügynökségi fejlesztőcsapatok részeként végzett munkákból mutat válogatást.",
    "Selected Work": "Válogatott munkák",
    "Representative Shopify and e-commerce development work, with scope phrased conservatively where delivery happened inside a broader agency or team environment.": "Reprezentatív Shopify és e-commerce fejlesztési munkák; ahol a delivery tágabb ügynökségi vagy csapatkörnyezetben történt, ott a scope szándékosan konzervatívan van megfogalmazva.",
    "Ticketing & Shopify Platform Development": "Ticketing és Shopify platform fejlesztés",
    "Custom 3D Product Configurator": "Egyedi 3D termékkonfigurátor",
    "Checkout UI Extension for Delivery Date Selection": "Checkout UI extension kiszállítási dátum választáshoz",
    "Shopify Development": "Shopify fejlesztés",
    "B2B Shopify Development": "B2B Shopify fejlesztés",
    "Custom Shopify Product Experience": "Egyedi Shopify termékélmény",
    "Additional Store Work": "További store munkák",
    "Load more": "Tov\u00e1bbiak bet\u00f6lt\u00e9se",
    "Agencies I've worked with": "Ügynökségek, akikkel dolgoztam",
    "Broader software engineering experience": "Szélesebb szoftverfejlesztői tapasztalat",
    "Education & AI background": "Tanulmányok és AI háttér",
    "Technical Expertise": "Technikai szakterületek",
    "The kinds of Shopify work CheckoutLabs is built to handle.": "Azok a Shopify munkatípusok, amelyekre a CheckoutLabs épült.",
    "How I Work": "Hogyan dolgozom",
    "About CheckoutLabs": "A CheckoutLabs-ről",
    "The developer behind CheckoutLabs.": "A fejlesztő a CheckoutLabs mögött.",
    "I am Roland Nagy, a senior Shopify and full-stack developer. CheckoutLabs is my focused development practice for agencies, technical teams, and merchants that need senior Shopify capacity without hiring full-time.": "Roland Nagy vagyok, senior Shopify és full-stack fejlesztő. A CheckoutLabs a fókuszált fejlesztői praxisom ügynökségeknek, technikai csapatoknak és kereskedőknek, akik senior Shopify kapacitást keresnek teljes munkaidős felvétel nélkül.",
    "View work": "Munkák megtekintése",
    "Get in touch": "Kapcsolat",
    "How I Got Here": "Hogyan jutottam ide",
    "Education & Technical Background": "Tanulmányok és technikai háttér",
    "Academic Project Areas": "Egyetemi projektterületek",
    "Need senior Shopify development capacity?": "Senior Shopify fejlesztői kapacitásra van szükséged?",
    "Start a conversation": "Beszéljünk",
    "No long-term contracts • Cancel anytime": "Nincs hosszú távú szerződés • bármikor lemondható",
    "Billed monthly • No long-term commitment": "Havi számlázás • nincs hosszú távú elköteleződés",
    "10 dedicated development hours": "10 dedikált fejlesztői óra",
    "20 dedicated development hours": "20 dedikált fejlesztői óra",
    "Direct Slack/email communication": "Közvetlen Slack/email kommunikáció",
    "Priority Slack/email communication": "Prioritásos Slack/email kommunikáció",
    "Weekly progress updates": "Heti státuszfrissítések",
    "Advanced Shopify & checkout customization support": "Haladó Shopify és checkout testreszabási támogatás",
    "White-label delivery": "White-label delivery",
    "Optional check-ins for alignment (async-first)": "Opcionális egyeztetések az összehangoláshoz (async-first)",
    "Senior support for complex Shopify builds (incl. checkout customization)": "Senior támogatás komplex Shopify fejlesztésekhez (checkout testreszabással együtt)",
    "Faster turnaround times": "Gyorsabb átfutási idők",
    "Emergency Shopify Support": "Sürgős Shopify támogatás",
    "Urgent bug fixes & blocked releases": "Sürgős hibajavítások és blokkolt release-ek",
    "Senior debugging (Liquid, JS, checkout)": "Senior debugging (Liquid, JS, checkout)",
    "One-off custom features": "Egyedi egyszeri fejlesztések",
    "24-72h turnaround": "24-72 órás átfutás",
    "White-label if needed": "White-label, ha szükséges",
    "Request Emergency Help →": "Sürgős segítség kérése →",
    "Start with 10 Hours →": "Kezdés 10 órával →",
    "Choose 20 Hours →": "20 óra választása →",
    "Let’s Talk →": "Beszéljünk →",
    "Most Popular": "Legnépszerűbb",
    "Professional": "Professional",
    "View selected projects": "Projektek megtekintése",
    "Senior Shopify Experience": "Senior Shopify tapasztalat",
    "A compact view of the technical background behind CheckoutLabs.": "Rövid áttekintés a CheckoutLabs mögötti technikai háttérről.",
    "years in software development": "év szoftverfejlesztésben",
    "years in web and full-stack development": "év webes és full-stack fejlesztésben",
    "custom storefronts, integrations, Liquid and APIs": "egyedi storefrontok, integrációk, Liquid és API-k",
    "experience with established e-commerce brands and delivery teams": "tapasztalat ismert e-commerce brandekkel és delivery csapatokkal",
    "Visit site ->": "Weboldal ->",
    "Selected technical project": "Válogatott technikai projekt",
    "Ongoing platform work": "Folyamatos platformmunka",
    "Checkout extension work": "Checkout extension munka",
    "Work as part of a development team": "Fejlesztőcsapat részeként végzett munka",
    "Conservative scope attribution": "Konzervatív scope megfogalmazás",
    "Selected e-commerce development": "Válogatott e-commerce fejlesztés",
    "Scope details can be expanded later": "A scope részletei később bővíthetők",
    "Custom 3D product configurator integrated with Shopify products": "Egyedi 3D termékkonfigurátor Shopify termékekkel integrálva",
    "BOM-based multi-line-item add-to-cart logic": "BOM-alapú, több line itemes add-to-cart logika",
    "Persisted and shareable configuration links": "Mentett és megosztható konfigurációs linkek",
    "Shopify Markets, multiple domains, multilingual setup": "Shopify Markets, több domain, többnyelvű setup",
    "Custom Liquid and JavaScript development": "Egyedi Liquid és JavaScript fejlesztés",
    "Ongoing Shopify development and support": "Folyamatos Shopify fejlesztés és támogatás",
    "Custom ticketing workflows": "Egyedi ticketing workflow-k",
    "Date and season-based product logic": "Dátum- és szezon-alapú terméklogika",
    "Integration with supporting systems": "Integráció támogató rendszerekkel",
    "Production troubleshooting and maintenance": "Éles környezeti hibakeresés és karbantartás",
    "Checkout delivery date picker UI extension": "Checkout kiszállítási dátumválasztó UI extension",
    "Postcode and cart-content based delivery availability logic": "Irányítószám- és kosártartalom-alapú kiszállítási elérhetőségi logika",
    "Shipping method display aligned to the selected delivery date": "Szállítási módok megjelenítése a kiválasztott kiszállítási dátum alapján",
    "Integrations & Backend": "Integrációk és backend",
    "Advanced Commerce": "Haladó commerce",
    "Direct with merchants": "Közvetlenül kereskedőkkel",
    "Embedded in agencies": "Ügynökségekbe beágyazva",
    "Ongoing partner": "Folyamatos partner",
    "Complex features": "Komplex funkciók",
    "Need a Shopify developer who can handle the parts that don't fit in a theme setting?": "Olyan Shopify fejlesztő kell, aki kezeli azt is, ami nem fér bele egy theme settingbe?",
    "Share the store, the business problem, and the technical constraints. I'll help you turn it into a clear development path.": "Küldd el a store-t, az üzleti problémát és a technikai korlátokat. Segítek világos fejlesztési útvonallá alakítani.",
    "Senior Shopify and full-stack developer focused on complex commerce logic, integrations, checkout extensions, and maintainable storefront work.": "Senior Shopify és full-stack fejlesztő, fókuszban komplex commerce logikával, integrációkkal, checkout extensionökkel és karbantartható storefront munkával.",
    "BSc Computer Science": "BSc programtervező informatikus",
    "MSc Artificial Intelligence": "MSc mesterséges intelligencia",
    "Professional Engineering": "Professzionális engineering",
    "Software Engineering & Web Applications": "Szoftverfejlesztés és webalkalmazások",
    "Data Structures, Algorithms & Databases": "Adatszerkezetek, algoritmusok és adatbázisok",
    "AI & Applied Machine Learning": "AI és alkalmazott gépi tanulás",
    "If the work needs more than a theme tweak, I can help turn the business problem into a clear technical path.": "Ha a munka több, mint egy theme módosítás, segítek az üzleti problémát világos technikai tervvé alakítani."
  };

  const de = {
    "Work": "Arbeiten",
    "About": "Über mich",
    "Process": "Prozess",
    "Packages": "Pakete",
    "FAQs": "FAQ",
    "Get Started": "Kontakt",
    "View Packages": "Pakete ansehen",
    "Home": "Startseite",
    "Company": "Unternehmen",
    "Resources": "Ressourcen",
    "Get in Touch": "Kontakt",
    "Ready to discuss your Shopify development needs?": "Bereit, deine Shopify-Entwicklungsanforderungen zu besprechen?",
    "White-label Shopify development for agencies and technical teams - apps, integrations, and advanced builds.": "White-Label-Shopify-Entwicklung für Agenturen und technische Teams - Apps, Integrationen und anspruchsvolle Builds.",
    "CheckoutLabs. All rights reserved.": "CheckoutLabs. Alle Rechte vorbehalten.",
    "Privacy Policy": "Datenschutzerklärung",
    "Terms of Service": "Nutzungsbedingungen",
    "Senior Shopify Development for Agencies": "Senior Shopify-Entwicklung für Agenturen",
    "Senior Shopify Development": "Senior Shopify-Entwicklung",
    "Without the Full-Time Hire": "ohne Vollzeit-Einstellung",
    "I help agencies and technical teams ship advanced Shopify work - custom apps, integrations, checkout customizations and complex storefront builds, delivered async on a flexible monthly basis.": "Ich helfe Agenturen und technischen Teams, anspruchsvolle Shopify-Arbeit zu liefern - individuelle Apps, Integrationen, Checkout-Anpassungen und komplexe Storefront-Builds, async und flexibel auf Monatsbasis.",
    "Advanced Shopify Engineering": "Anspruchsvolles Shopify Engineering",
    "Custom apps, complex business logic, and checkout-level customizations when needed.": "Individuelle Apps, komplexe Geschäftslogik und Checkout-Anpassungen, wenn sie gebraucht werden.",
    "Maintainable, Native-First Solutions": "Wartbare, native-first Lösungen",
    "B2B pricing patterns, MOQ rules, and workflows using Shopify-native capabilities whenever possible.": "B2B-Preismodelle, MOQ-Regeln und Workflows mit Shopify-nativen Möglichkeiten, wo es sinnvoll ist.",
    "White-Label Delivery for Agencies": "White-Label Delivery für Agenturen",
    "I plug into your tickets + comms and ship like an in-house senior developer.": "Ich arbeite in euren Tickets und Kommunikationswegen mit und liefere wie ein interner Senior Developer.",
    "No long-term contracts â€˘ Cancel anytime": "Keine langfristigen Verträge - jederzeit kündbar",
    "Selected brands & teams I've worked with": "Ausgewählte Marken und Teams, mit denen ich gearbeitet habe",
    "Experience spanning Shopify brands, e-commerce agencies and software engineering teams.": "Erfahrung mit Shopify-Marken, E-Commerce-Agenturen und Software-Engineering-Teams.",
    "Flexible Monthly Capacity Packages": "Flexible monatliche Kapazitätspakete",
    "Choose the package that fits your team’s needs. Scale up or down as your projects require.": "Wähle das Paket, das zu deinem Team passt. Skaliere je nach Projektbedarf hoch oder runter.",
    "10 Hours/Month": "10 Stunden / Monat",
    "20 Hours/Month": "20 Stunden / Monat",
    "Perfect for ongoing maintenance and smaller enhancements": "Ideal für laufende Wartung und kleinere Verbesserungen",
    "Ideal for active development and feature builds": "Ideal für aktive Entwicklung und Feature-Builds",
    "What I Handle": "Wobei ich helfe",
    "Senior Shopify engineering focused on performance, maintainability, and conversion - delivered white-label when needed.": "Senior Shopify Engineering mit Fokus auf Performance, Wartbarkeit und Conversion - bei Bedarf white-label geliefert.",
    "Native B2B Pricing & Rules": "Native B2B-Preise und Regeln",
    "Checkout UI Extensions": "Checkout UI Extensions",
    "Product Configurators": "Produktkonfiguratoren",
    "Conversion Quizzes": "Conversion-Quizzes",
    "A straightforward process for agencies and technical teams who need reliable senior Shopify support.": "Ein einfacher Prozess für Agenturen und technische Teams, die zuverlässige Senior-Shopify-Unterstützung brauchen.",
    "Intro Call": "Intro Call",
    "I will map your team's needs, technical requirements, and where a monthly capacity package can support delivery.": "Ich erfasse die Anforderungen deines Teams, die technischen Rahmenbedingungen und wo ein monatliches Kapazitätspaket die Lieferung unterstützen kann.",
    "Proposal & Package": "Vorschlag und Paket",
    "I will provide a clear proposal with the selected monthly package, scope boundaries, and an async-first communication setup.": "Ich erstelle einen klaren Vorschlag mit dem passenden Monatspaket, Scope-Grenzen und einem async-first Kommunikationssetup.",
    "Ongoing Support": "Laufende Unterstützung",
    "I integrate with your workflow, deliver white-label work, and provide async updates with clear ownership. Scale as your needs evolve.": "Ich integriere mich in euren Workflow, liefere white-label und gebe async Updates mit klarer Ownership. Die Kapazität kann mit dem Bedarf skalieren.",
    "Who I Work With": "Mit wem ich arbeite",
    "CheckoutLabs is my senior Shopify development practice for agencies, technical teams, and digital partners who need advanced builds and checkout customizations without adding headcount.": "CheckoutLabs ist meine Senior-Shopify-Development-Praxis für Agenturen, technische Teams und digitale Partner, die anspruchsvolle Builds und Checkout-Anpassungen ohne zusätzliches Headcount benötigen.",
    "Shopify Agencies": "Shopify-Agenturen",
    "Technical Teams": "Technische Teams",
    "Digital Partners": "Digitale Partner",
    "Offer Shopify development to your clients under your brand with my white-label support.": "Biete deinen Kunden Shopify-Entwicklung unter deiner Marke an - mit meiner White-Label-Unterstützung.",
    "View selected Shopify work ->": "Ausgewählte Shopify-Arbeiten ansehen ->",
    "Frequently Asked Questions": "Häufige Fragen",
    "Everything you need to know about my monthly capacity packages and how I work.": "Alles Wichtige zu meinen monatlichen Kapazitätspaketen und meiner Arbeitsweise.",
    "What happens to unused hours each month?": "Was passiert mit ungenutzten Stunden?",
    "How do communication and collaboration work?": "Wie funktionieren Kommunikation und Zusammenarbeit?",
    "What’s your cancellation policy?": "Wie ist die Kündigungsregelung?",
    "Can you work white-label for our clients?": "Kannst du white-label für unsere Kunden arbeiten?",
    "Still have questions?": "Noch Fragen?",
    "Need Reliable Senior Shopify Development Capacity?": "Brauchst du zuverlässige Senior-Shopify-Entwicklungskapazität?",
    "Let's discuss how my monthly capacity packages can support your agency or technical team without the overhead of hiring full-time.": "Lass uns besprechen, wie meine monatlichen Kapazitätspakete deine Agentur oder dein technisches Team ohne Vollzeit-Einstellung unterstützen können.",
    "Send me a message": "Nachricht senden",
    "I will explore your needs and see if there is a good fit. No pressure, no commitment.": "Ich schaue mir deinen Bedarf an und prüfe, ob es passt. Kein Druck, keine Verpflichtung.",
    "Work Email": "Arbeits-E-Mail",
    "What do you need help with?": "Wobei brauchst du Hilfe?",
    "A short summary (store link optional).": "Kurze Zusammenfassung (Store-Link optional).",
    "Send message": "Nachricht senden",
    "Book a 15-min intro call": "15-minütigen Intro Call buchen",
    "I will respond within 1 business day - No sales pressure": "Ich antworte innerhalb eines Werktags - kein Verkaufsdruck",
    "Selected Shopify Work": "Ausgewählte Shopify-Arbeiten",
    "Shopify development built around real business problems.": "Shopify-Entwicklung rund um echte Geschäftsprobleme.",
    "This page includes selected work completed independently and as part of agency development teams.": "Diese Seite zeigt ausgewählte Arbeiten, die ich eigenständig und als Teil von Agentur-Entwicklungsteams umgesetzt habe.",
    "Selected Work": "Ausgewählte Arbeiten",
    "Representative Shopify and e-commerce development work, with scope phrased conservatively where delivery happened inside a broader agency or team environment.": "Repräsentative Shopify- und E-Commerce-Entwicklungsarbeit; wo die Lieferung in einem größeren Agentur- oder Teamkontext stattfand, ist der Scope bewusst konservativ formuliert.",
    "Ticketing & Shopify Platform Development": "Ticketing & Shopify-Plattformentwicklung",
    "Custom 3D Product Configurator": "Individueller 3D-Produktkonfigurator",
    "Checkout UI Extension for Delivery Date Selection": "Checkout UI Extension für Lieferdatenauswahl",
    "Shopify Development": "Shopify-Entwicklung",
    "B2B Shopify Development": "B2B Shopify-Entwicklung",
    "Custom Shopify Product Experience": "Individuelle Shopify-Produktexperience",
    "Additional Store Work": "Weitere Store-Arbeiten",
    "Load more": "Mehr laden",
    "Agencies I've worked with": "Agenturen, mit denen ich gearbeitet habe",
    "Broader software engineering experience": "Breitere Software-Engineering-Erfahrung",
    "Education & AI background": "Ausbildung und AI-Hintergrund",
    "Technical Expertise": "Technische Expertise",
    "The kinds of Shopify work CheckoutLabs is built to handle.": "Die Arten von Shopify-Arbeit, für die CheckoutLabs ausgelegt ist.",
    "How I Work": "Wie ich arbeite",
    "About CheckoutLabs": "Über CheckoutLabs",
    "The developer behind CheckoutLabs.": "Der Entwickler hinter CheckoutLabs.",
    "I am Roland Nagy, a senior Shopify and full-stack developer. CheckoutLabs is my focused development practice for agencies, technical teams, and merchants that need senior Shopify capacity without hiring full-time.": "Ich bin Roland Nagy, Senior Shopify- und Full-Stack-Entwickler. CheckoutLabs ist meine fokussierte Development-Praxis für Agenturen, technische Teams und Händler, die Senior-Shopify-Kapazität ohne Vollzeit-Einstellung benötigen.",
    "View work": "Arbeiten ansehen",
    "Get in touch": "Kontakt aufnehmen",
    "How I Got Here": "Wie ich hierher gekommen bin",
    "Education & Technical Background": "Ausbildung und technischer Hintergrund",
    "Academic Project Areas": "Akademische Projektbereiche",
    "Need senior Shopify development capacity?": "Brauchst du Senior-Shopify-Entwicklungskapazität?",
    "Start a conversation": "Gespräch starten",
    "No long-term contracts • Cancel anytime": "Keine langfristigen Verträge • jederzeit kündbar",
    "Billed monthly • No long-term commitment": "Monatliche Abrechnung • keine langfristige Bindung",
    "10 dedicated development hours": "10 dedizierte Entwicklungsstunden",
    "20 dedicated development hours": "20 dedizierte Entwicklungsstunden",
    "Direct Slack/email communication": "Direkte Slack-/E-Mail-Kommunikation",
    "Priority Slack/email communication": "Priorisierte Slack-/E-Mail-Kommunikation",
    "Weekly progress updates": "Wöchentliche Fortschrittsupdates",
    "Advanced Shopify & checkout customization support": "Unterstützung für anspruchsvolle Shopify- und Checkout-Anpassungen",
    "White-label delivery": "White-Label Delivery",
    "Optional check-ins for alignment (async-first)": "Optionale Check-ins zur Abstimmung (async-first)",
    "Senior support for complex Shopify builds (incl. checkout customization)": "Senior-Unterstützung für komplexe Shopify-Builds (inkl. Checkout-Anpassung)",
    "Faster turnaround times": "Schnellere Durchlaufzeiten",
    "Emergency Shopify Support": "Dringender Shopify-Support",
    "Urgent bug fixes & blocked releases": "Dringende Bugfixes und blockierte Releases",
    "Senior debugging (Liquid, JS, checkout)": "Senior-Debugging (Liquid, JS, Checkout)",
    "One-off custom features": "Einmalige individuelle Features",
    "24-72h turnaround": "24-72h Durchlaufzeit",
    "White-label if needed": "White-label bei Bedarf",
    "Request Emergency Help →": "Dringende Hilfe anfragen →",
    "Start with 10 Hours →": "Mit 10 Stunden starten →",
    "Choose 20 Hours →": "20 Stunden wählen →",
    "Let’s Talk →": "Lass uns sprechen →",
    "Most Popular": "Beliebt",
    "Professional": "Professional",
    "View selected projects": "Projekte ansehen",
    "Senior Shopify Experience": "Senior Shopify-Erfahrung",
    "A compact view of the technical background behind CheckoutLabs.": "Ein kompakter Überblick über den technischen Hintergrund hinter CheckoutLabs.",
    "years in software development": "Jahre in der Softwareentwicklung",
    "years in web and full-stack development": "Jahre in Web- und Full-Stack-Entwicklung",
    "custom storefronts, integrations, Liquid and APIs": "individuelle Storefronts, Integrationen, Liquid und APIs",
    "experience with established e-commerce brands and delivery teams": "Erfahrung mit etablierten E-Commerce-Marken und Delivery-Teams",
    "Visit site ->": "Website ->",
    "Selected technical project": "Ausgewähltes technisches Projekt",
    "Ongoing platform work": "Laufende Plattformarbeit",
    "Checkout extension work": "Checkout-Extension-Arbeit",
    "Work as part of a development team": "Arbeit als Teil eines Entwicklungsteams",
    "Conservative scope attribution": "Konservative Scope-Zuordnung",
    "Selected e-commerce development": "Ausgewählte E-Commerce-Entwicklung",
    "Scope details can be expanded later": "Scope-Details können später erweitert werden",
    "Custom 3D product configurator integrated with Shopify products": "Individueller 3D-Produktkonfigurator integriert mit Shopify-Produkten",
    "BOM-based multi-line-item add-to-cart logic": "BOM-basierte Add-to-Cart-Logik mit mehreren Line Items",
    "Persisted and shareable configuration links": "Persistente und teilbare Konfigurationslinks",
    "Shopify Markets, multiple domains, multilingual setup": "Shopify Markets, mehrere Domains, mehrsprachiges Setup",
    "Custom Liquid and JavaScript development": "Individuelle Liquid- und JavaScript-Entwicklung",
    "Ongoing Shopify development and support": "Laufende Shopify-Entwicklung und Support",
    "Custom ticketing workflows": "Individuelle Ticketing-Workflows",
    "Date and season-based product logic": "Datums- und saisonbasierte Produktlogik",
    "Integration with supporting systems": "Integration mit unterstützenden Systemen",
    "Production troubleshooting and maintenance": "Production-Troubleshooting und Wartung",
    "Checkout delivery date picker UI extension": "Checkout UI Extension für Lieferdatenauswahl",
    "Postcode and cart-content based delivery availability logic": "Lieferverfügbarkeitslogik basierend auf Postleitzahl und Warenkorb",
    "Shipping method display aligned to the selected delivery date": "Anzeige der Versandmethoden passend zum gewählten Lieferdatum",
    "Integrations & Backend": "Integrationen & Backend",
    "Advanced Commerce": "Advanced Commerce",
    "Direct with merchants": "Direkt mit Händlern",
    "Embedded in agencies": "Eingebettet in Agenturen",
    "Ongoing partner": "Laufender Partner",
    "Complex features": "Komplexe Features",
    "Need a Shopify developer who can handle the parts that don't fit in a theme setting?": "Brauchst du einen Shopify-Entwickler, der die Teile übernimmt, die nicht in eine Theme-Einstellung passen?",
    "Share the store, the business problem, and the technical constraints. I'll help you turn it into a clear development path.": "Teile den Store, das Geschäftsproblem und die technischen Einschränkungen. Ich helfe, daraus einen klaren Entwicklungsweg zu machen.",
    "Senior Shopify and full-stack developer focused on complex commerce logic, integrations, checkout extensions, and maintainable storefront work.": "Senior Shopify- und Full-Stack-Entwickler mit Fokus auf komplexe Commerce-Logik, Integrationen, Checkout Extensions und wartbare Storefront-Arbeit.",
    "BSc Computer Science": "BSc Informatik",
    "MSc Artificial Intelligence": "MSc Künstliche Intelligenz",
    "Professional Engineering": "Professionelles Engineering",
    "Software Engineering & Web Applications": "Software Engineering & Webanwendungen",
    "Data Structures, Algorithms & Databases": "Datenstrukturen, Algorithmen & Datenbanken",
    "AI & Applied Machine Learning": "AI & angewandtes maschinelles Lernen",
    "If the work needs more than a theme tweak, I can help turn the business problem into a clear technical path.": "Wenn die Arbeit mehr als ein Theme-Tweak ist, helfe ich, das Geschäftsproblem in einen klaren technischen Weg zu übersetzen."
  };

  function normalizeText(value) {
    return value.replace(/\s+/g, " ").trim();
  }

  function translateTextNodes() {
    const skipTags = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "SVG", "PATH", "RECT", "CIRCLE", "DEFS", "G"]);
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent || skipTags.has(parent.tagName)) return NodeFilter.FILTER_REJECT;
        return normalizeText(node.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });

    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);

    nodes.forEach((node) => {
      const key = normalizeText(node.nodeValue);
      const translated = window.i18next.t(key);
      if (translated === key) return;
      node.nodeValue = node.nodeValue.replace(key, translated);
    });
  }

  function translateAttributes() {
    document.querySelectorAll("[placeholder], [aria-label], [title]").forEach((el) => {
      ["placeholder", "aria-label", "title"].forEach((attr) => {
        const value = el.getAttribute(attr);
        if (!value) return;
        const translated = window.i18next.t(value);
        if (translated !== value) el.setAttribute(attr, translated);
      });
    });
  }

  function stripLanguagePrefix(pathname) {
    const normalizedPath = pathname || "/";
    const match = normalizedPath.match(/^\/(hu|de)(\/.*)?$/);
    if (!match) return normalizedPath;
    return match[2] || "/";
  }

  function getLanguageFromPath() {
    const firstSegment = window.location.pathname.split("/").filter(Boolean)[0];
    return firstSegment === "hu" || firstSegment === "de" ? firstSegment : "en";
  }

  function buildLocalizedPath(language, pathname) {
    const basePath = stripLanguagePrefix(pathname);
    if (language === "en") return basePath;
    return `/${language}${basePath === "/" ? "/" : basePath}`;
  }

  function buildLocalizedUrl(language) {
    return `${buildLocalizedPath(language, window.location.pathname)}${window.location.search}${window.location.hash}`;
  }

  function localizeInternalHref(href, language) {
    if (!href || href.startsWith("#")) return href;
    if (/^(mailto:|tel:|https?:\/\/)/i.test(href)) return href;

    const url = new URL(href, window.location.origin);
    if (url.origin !== window.location.origin) return href;

    return `${buildLocalizedPath(language, url.pathname)}${url.search}${url.hash}`;
  }

  function updateLocalizedLinks(language) {
    document.querySelectorAll("a[href]").forEach((link) => {
      const href = link.getAttribute("href");
      const localizedHref = localizeInternalHref(href, language);
      if (localizedHref !== href) link.setAttribute("href", localizedHref);
    });
  }

  function updateLanguageButtons(language) {
    document.querySelectorAll("[data-language]").forEach((button) => {
      const isActive = button.dataset.language === language;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
      button.setAttribute("aria-label", `View site in ${button.textContent.trim()}`);
    });
  }

  function applyTranslations() {
    const language = getLanguageFromPath();
    document.documentElement.lang = language;
    updateLocalizedLinks(language);
    translateTextNodes();
    translateAttributes();
    updateLanguageButtons(language);
  }

  window.i18next.init({
    lng: getLanguageFromPath(),
    fallbackLng: "en",
    resources: {
      en: { translation: {} },
      hu: { translation: hu },
      de: { translation: de }
    },
    keySeparator: false,
    nsSeparator: false,
    returnEmptyString: false
  }).then(applyTranslations);

  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-language]");
    if (!button) return;

    const language = button.dataset.language;
    window.location.href = buildLocalizedUrl(language);
  });
})();
