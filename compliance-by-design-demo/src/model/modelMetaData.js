export const ActData = {
  "<<inwilligen aanvraag tegemoetkoming in de schade geleden door de maatregelen ter bestrijding van de verdere verspreiding van COVID-19>>": {
    date: new Date("2020-05-12"),
    title: "Tegemoetkoming geleden schade ten gevolge van de Coronamaatregelen",
    requestUrl:
      "https://www.rvo.nl/subsidie-en-financieringswijzer/tegemoetkoming-schade-covid-19/aanvraagproces/aanvraagprocedure",
  },
  "<<inwilligen aanvraag algemene bijstand op grond van de Tozo>>": {
    date: new Date("2020-05-15"),
    title: "Aanvullende uitkering voor levensonderhoud op grond van de Tozo",
    requestInfo:
      "De aanvullende uitkering kunt u aanvragen bij uw woongemeente. Kijk op de website van uw gemeente voor meer informatie over de Tozo.",
  },
  "<<inwilligen aanvraag bijstand ter voorziening in de behoefte aan bedrijfskapitaal op grond van de Tozo>>": {
    date: new Date("2020-05-15"),
    title: "Lening voor bedrijfskapitaal op grond van de Tozo",
    requestInfo:
      "De lening kunt u aanvragen bij uw woongemeente. Kijk op de website van uw gemeente voor meer informatie over de Tozo.",
  },
};

export const FactData = {
  "[Minister van Economische Zaken en Klimaat]": {},
  "[RVO]": {},
  "[SBI-code hoofdactiviteit onderneming]": {
    question: "Wat is de SBI-code van de hoofdactiviteit van uw onderneming?",
    type: "string",
  },
  "[aantal personen dat werkt bij onderneming blijkend uit de inschrijving in het handelsregister op 15 maart 2020]": {
    question:
      "Op 15 maart 2020 waren het volgende aantal mensen werkzaam bij uw onderneming",
    type: "number",
  },
  "[aanvraag aanvraag is ingediend in de periode van 27 maart 2020 tot en met 26 juni 2020]": {
    question:
      "Gaat u uw aanvraag indienen in de periode van nu tot en met 26 juni 2020?",
  },
  "[aanvraag aanvullende uitkering voor levensonderhoud op grond van de Tozo]": {
    question:
      "Wilt u een aanvraag indienen voor een aanvullende uitkering voor levensonderhoud op grond van de Tozo?",
  },
  "[aanvraag lening voor bedrijfskapitaal op grond van de Tozo]": {
    question:
      "Wilt u een aanvraag indienen voor een lening voor bedrijfskapitaal op grond van de Tozo?",
  },
  "[aanvraag omvat gegevens over de contactpersoon bij de gedupeerde onderneming]": {
    question: "Wat zijn de gegevens van de contactpersoon bij uw onderneming?",
    type: "string",
    controlOptions: {
      as: "textarea",
    },
  },
  "[aanvraag omvat het bezoekadres van de gedupeerde onderneming]": {
    question: "Wat is het bezoekadres van uw onderneming?",
    type: "string",
    controlOptions: {
      as: "textarea",
    },
  },
  "[aanvraag omvat het nummer waarmee de gedupeerde onderneming geregistreerd is bij de Kamer van Koophandel]": {
    question: "Wat is het KvK-nummer van uw onderneming?",
    type: "string",
  },
  "[aanvraag omvat het post- en bezoekadres en het rekeningnummer dat op naam van de gedupeerde onderneming staat]": {
    question:
      "Uw aanvraag omvat het post- en bezoekadres en een rekeningnummer dat op naam staam van uw onderneming",
  },
  "[aanvraag omvat het postadres van de gedupeerde onderneming]": {
    question: "Wat is het postadres van uw onderneming?",
    type: "string",
    controlOptions: {
      as: "textarea",
    },
  },
  "[aanvraag omvat het rekeningnummer dat op naam van de gedupeerde onderneming staat]": {
    question:
      "Heeft u een rekeningnummer, dat op naam van uw onderneming moet staan, waarop u de tegemoetkoming wilt ontvangen?",
  },
  "[aanvraag tegemoetkoming in de schade geleden door de maatregelen ter bestrijding van de verdere verspreiding van COVID-19]": {
    question:
      "Wilt u een aanvraag indienen voor een tegemoetkoming in de schade geleden door de maatregelen ter bestrijding van de verdere verspreiding van COVID-19?",
  },
  "[bankrekeningnummer op dat op naam van de onderneming staat]": {
    question: "Bankrekeningnummer dat op naam staat van uw onderneming",
    type: "string",
  },
  "[bedrijf van zelfstandige is in Nederland gevestigd]": {
    question: "Is uw bedrijf gevestigd in Nederland?",
  },
  "[bij de rechtbank is een verzoek tot verlening van surseance van betaling aan de gedupeerde onderneming ingediend]": {
    question:
      "Is er bij de rechtbank is een verzoek tot verlening van surseance van betaling ingediend voor uw onderneming?",
  },
  "[datum van inschrijving van onderneming in het KVK Handelsregister]": {
    question: "Uw bedrijf is ingeschreven bij de Kamer van Koophandel op",
    type: "date",
  },
  "[datum van oprichting van onderneming]": {
    question: "Uw bedrijf is opgericht op",
    type: "date",
  },
  "[de DGA heeft naar waarheid verklaard en aannemelijk gemaakt dat zijn/haar B.V. nu geen salaris kan uitbetalen]": {
    question: "Verklaart de DGA dat uw bedrijf nu geen salaris kan uitbetalen?",
  },
  "[de hoofdzakelijke werkzaamheden van zelfstandige vinden plaats in Nederland]": {
    question: "Uw hoofdzakelijke werkaamheden vinden plaats in Nederland",
  },
  "[directeur-grootaandeelhouder (DGA) van een besloten vennootschap]": {
    question:
      "Bent u directeur-grootaandeelhouder (DGA) van een besloten vennootschap?",
  },
  "[e-mailadres contactpersoon bij de gedupeerde onderneming]": {
    question: "Wat is het e-mailadres van de contactpersoon bij uw onderneming",
    type: "string",
    controlOptions: { type: "email" },
  },
  "[eenmansbedrijf]": { question: "Is uw onderneming een Eenmansbedrijf?" },
  "[er moet sprake zijn van het van dragen van de financiële risico’s]": {
    question: "Is er sprake van het van dragen van de financiële risico’s?",
  },
  "[er moet sprake zijn van volledige zeggenschap over de besloten vennootschap]": {
    question:
      "Is er sprake van volledige zeggenschap over de besloten vennootschap?",
  },
  "[gedupeerde onderneming heeft ten minste één horecagelegenheid in eigendom]": {
    question:
      "Heeft uw onderneming ten minste één horecagelegenheid in eigendom?",
  },
  "[gedupeerde onderneming heeft ten minste één vestiging met een ander adres dan het privéadres van de eigenaar van de onderneming]": {
    question:
      "Heeft uw onderneming ten minste één vestiging met een ander adres dan het privéadres van de eigenaar in eigendom?",
  },
  "[gedupeerde onderneming heeft ten minste één vestiging met een ander adres dan het privéadres van de eigenaren van de onderneming]": {
    question:
      "Heeft uw onderneming ten minste één vestiging met een ander adres dan het privéadres van de eigenaren van de onderneming?",
  },
  "[gedupeerde onderneming huurt ten minste één horecagelegenheid huurt, pacht of in eigendom heeft]": {
    question:
      "Uw onderneming huurt, pacht ten minste één horecagelegenheid of heeft deze in eigendom",
  },
  "[gedupeerde onderneming huurt ten minste één horecagelegenheid]": {
    question: "Huurt uw onderneming ten minste één horecagelegenheid?",
  },
  "[gedupeerde onderneming is een horecaonderneming]": {
    question: "Is uw onderneming een horecaonderneming?",
  },
  "[gedupeerde onderneming pacht ten minste één horecagelegenheid huurt, pacht of in eigendom heeft]": {
    question:
      "Uw onderneming huurt, pacht ten minste één horecagelegenheid of heeft deze in eigendom",
  },
  "[gedupeerde onderneming pacht ten minste één horecagelegenheid]": {
    question: "Pacht uw onderneming ten minste één horecagelegenheid?",
  },
  "[gedupeerde onderneming verkeert in staat van faillissement dan wel bij de rechtbank is een verzoek tot verlening van surseance van betaling aan de onderneming ingediend]": {
    question:
      "Uw onderneming verkeert in staat van faillissement of er is een verzoek tot verlening van surseance van betaling ingediend",
  },
  "[gedupeerde onderneming verkeert in staat van faillissement]": {
    question: "Verkeert uw onderneming in staat van faillisement?",
  },
  "[gedupeerde onderneming verwacht in de periode van 16 maart 2020 tot en met 15 juni 2020 ten minste € 4000,- aan omzetverlies te lijden als gevolg van de maatregelen ter bestrijding van de verdere verspreiding van COVID-19]": {
    question:
      "Verwacht u in de periode van 16 maart 2020 tot en met 15 juni 2020 ten minste € 4000,- aan omzetverlies te lijden als gevolg van de maatregelen?",
  },
  "[gedupeerde onderneming verwacht ten minste € 4.000,- aan vaste lasten te hebben, ook na gebruik van andere door de overheid beschikbaar gestelde steunmaatregelen in het kader van de bestrijding van de verdere verspreiding van COVID-19]": {
    question:
      "Verwacht u ten minste € 4.000,- aan vaste lasten te hebben, ook na gebruik van andere door de overheid beschikbaar gestelde steunmaatregelen?",
  },
  "[gedupeerde onderneming]": { question: "Uw onderneming" },
  "[gemeente]": { question: "De gemeente" },
  "[het totale bedrag aan de-minimissteun dat per lidstaat aan één onderneming wordt verleend, ligt hoger dan 200 000 EUR over een periode van drie belastingjaren]": {
    question:
      "Ligt het totale bedrag aan de-minimissteun voor uw organisatie vanuit de overheid hoger dan € 200.000,- over een periode van drie belastingjaren als gevolg van deze aanvraag?",
  },
  "[horecaonderneming die ten minste één horecagelegenheid huurt, pacht of in eigendom heeft]": {
    question:
      "Uw horecaonderneming huurt of pacht ten minste één horecagelegenheid of heeft deze in eigendom",
  },
  "[in Nederland gevestigde onderneming als bedoeld in artikel 5 van de Handelsregisterwet 2007]": {
    question:
      "Uw bedrijf is een in Nederland gevestigde onderneming als bedoeld in artikel 5 van de Handelsregisterwet 2007",
  },
  "[indienen]": { question: "Indienen van de aanvraag" },
  "[ingeschreven onder een hoofdactiviteit die in bijlage 1 is opgenomen, met de daarbij behorende code van de Standaard Bedrijfsindeling]": {
    question: "",
  },
  "[naam contactpersoon bij de gedupeerde onderneming]": {
    question: "Wat is de naam van de contactpersoon bij uw onderneming?",
    type: "string",
  },
  "[ondernemer]": { question: "U, de ondernemer" },
  "[onderneming die op 15 maart 2020 in het handelsregister stond ingeschreven die op 15 maart 2020 in het handelsregister stond ingeschreven onder een hoofdactiviteit die in bijlage 1 is opgenomen, met de daarbij behorende code van de Standaard Bedrijfsindeling]": {
    question:
      "Uw onderneming stond op 15 maar 2020 ingeschreven in het handelsregister onder een hoofdactiviteit die in bijlage 1 is van de regeling is opgenomen, met de daarbij behorende code van de Standaard Bedrijfsindeling",
  },
  "[onderneming die op 15 maart 2020 stond ingeschreven in het handelsregister onder de code 56.10.1, 56.10.2 of 56.30 van de Standaard Bedrijfsindeling]": {
    question:
      "Uw onderneming stond op 15 maart 2020 ingeschreven in het handelsregister onder de code 56.10.1, 56.10.2 of 56.30 van de Standaard Bedrijfsindeling",
  },
  "[onderneming heeft een fysieke vestiging in Nederland]": {
    question: "Uw onderneming heeft een fysiek vestiging in Nederland",
  },
  "[onderneming heeft geen verzoek tot verlening van surseance van betaling ingediend bij de rechtbank]": {
    question:
      "Uw onderneming heeft geen verzoek tot verlening van surseance van betaling ingediend",
  },
  "[onderneming heeft ten minste één vestiging met een ander adres te hebben dan het privéadres van de eigenaar/eigenaren]": {
    question:
      "Uw onderneming heeft ten minste één vestiging met een ander adres te hebben dan het privéadres van de eigenaar/eigenaren",
  },
  "[onderneming huurt, pacht of heeft in eigendom in elk geval één horecagelegenheid]": {
    question:
      "Uw onderneming huurt of pacht ten minste één horecagelegenheid of heeft deze in eigendom",
  },
  "[onderneming is een overheidsbedrijf]": {
    question: "Is uw onderneming een overheidsbedrijf?",
  },
  "[onderneming is niet failliet]": {
    question: "Uw onderneming is niet failliet",
  },
  "[onderneming is voor 15 maart 2020 ingeschreven in het KVK Handelsregister]": {
    question:
      "Uw onderneming is voor 15 maart 2020 ingeschreven in het KVK Handelsregister",
  },
  "[onderneming is voor 15 maart 2020 opgericht en ingeschreven in het KVK Handelsregister]": {
    question:
      "Uw onderneming is voor 15 maart 2020 opgericht en ingeschreven in het KVK Handelsregister",
  },
  "[onderneming is voor 15 maart 2020 opgericht]": {
    question: "Uw onderneming is voor 15 maart 2020 opgericht",
  },
  "[onderneming waar ten hoogste 250 personen werkzaam zijn, blijkend uit de inschrijving in het handelsregister op 15 maart 2020]": {
    question: "Bij uw onderneming zijn ten hoogste 250 personen werkzaam",
  },
  "[onderneming was op peildatum 15 maart 2020 ingeschreven in het handelsregister]": {
    question:
      "Uw onderneming was op de peildatum 15 maart 2020 ingeschreven bij het handelsregister",
  },
  "[onderneming]": { question: "Uw onderneming" },
  "[ontvangen overheidssteun over het huidige en de afgelopen 2 belastingjaren is niet meer dan € 200.000 aan overheidssteun]": {
    question:
      "De door uw onderneming ontvangen overheidssteun in het huidge en de afgelopen 2 belastingjaren is niet meer dan € 200.000",
  },
  "[tegemoetkoming kan worden verstrekt op grond van de algemene de-minimisverordening]": {
    question:
      "De tegemoetkoming kan worden verstrekt op grond van de algemene de-minimisverordening",
  },
  "[telefoonnummer contactpersoon bij de gedupeerde onderneming]": {
    question:
      "Wat is het telefoonnummer van de contactpersoon bij uw onderneming?",
    type: "string",
  },
  "[verwacht omzetverlies in de periode van 16 maart 2020 t/m 15 juni 2020 van ten minste € 4.000]": {
    question:
      "Verwacht u in de periode van 16 maart 2020 t/m 15 juni 2020 van ten minste € 4.000 omzetverlies?",
  },
  "[verwachte vaste lasten na gebruik van andere door de overheid beschikbaar gestelde steunmaatregelen in de periode van 16 maart 2020 t/m 15 juni 2020 ten minste € 4.000]": {
    question:
      "Verwacht u dat de vaste lasten na gebruik van andere door de overheid beschikbaar gestelde steunmaatregelen in de periode van 16 maart 2020 t/m 15 juni 2020 ten minste € 4.000 bedragen?",
  },
  "[verzoek om aanvullende uitkering voor levensonderhoud op grond van de Tozo]": {
    question:
      "Wilt een een aanvraag indienen voor aanvullende uitkering voor levensonderhoud op grond van de Tozo",
  },
  "[verzoek om lening voor bedrijfskapitaal op grond van de Tozo]": {
    question:
      "Wilt u een aanvraag indienen voor een lening voor bedrijfskapitaal op grond van de Tozo?",
  },
  "[verzoek tegemoetkoming in de schade geleden door de maatregelen ter bestrijding van de verdere verspreiding van COVID-19]": {
    question:
      "Wilt u een aanvraag indienen voor een tegemoetkoming in de schade geleden door de maatregelen ter bestrijding van de verdere verspreiding van COVID-19?",
  },
  "[verzoek]": { question: "Dit verzoek" },
  "[zelfstandige heeft naar waarheid te verklaard en aannemelijk gemaakt dat er sprake is van liquiditeitsprobleem als gevolg van de coronacrisis]": {
    question:
      "Is er sprake van liquiditeitsprobleem als gevolg van de coronacrisis?",
  },
  "[zelfstandige heeft naar waarheid verklaard dat het inkomen naar verwachting in de periode van ondersteuning minder zal bedragen dan het toepasselijke sociaal minimum als gevolg van de coronacrisis]": {
    question:
      "Verwacht u dat uw inkomen in de periode van ondersteuning minder zal bedragen dan het toepasselijke sociaal minimum als gevolg van de coronacrisis?",
  },
  "[zelfstandige is bedrijfsmatig actief geweest, waaronder ingeschreven zijn bij de Kamer van Koophandel, voordat deze regeling is aangekondigd, dus voor 17 maart 2020]": {
    question:
      "Bent u als zelfstandige bedrijfsmatig actief geweest en ingeschreven bij de KvK voor 17 maart 2020?",
  },
  "[zelfstandige moet in Nederland woonachtig zijn]": {
    question: "Bent u in Nederland woonachtig?",
  },
  "[zelfstandige voldoet aan het urencriterium]": {
    question:
      "Werkt u onder normale omstandigheden gemiddeld 23,5 uur per week in uw onderneming? (1225 uur op jaarbasis)",
  },
  "[zelfstandige]": { question: "Bent u zelfstandige?" },
  "[zelfstandige is een in Nederland woonachtige Nederlander die hier te lande in zodanige omstandigheden verkeert of dreigt te geraken dat hij niet over de middelen beschikt om in de noodzakelijke kosten van bestaan te voorzien]": {
    question:
      "Bent u een in Nederland woonachtige Nederlander die hier te lande in zodanige omstandigheden verkeert of dreigt te geraken dat hij niet over de middelen beschikt om in de noodzakelijke kosten van bestaan te voorzien?",
  },
  "[zelfstandige is een hier te lande woonachtige vreemdeling die rechtmatig in Nederland verblijf houdt in de zin van art. 8, onder a tot en met e en l, Vw]": {
    question:
      "Bent u een in Nederland woonachtige vreemdeling die rechtmatig in Nederland verblijf houdt?",
  },
  "[vreemdeling is gedurende de eerste drie maanden van verblijf in Nederland]": {
    question: "Bent u korter dan drie maanden in Nederland?",
  },
  "[vreemdeling is een burger van de Unie die het grondgebied van het gastland is binnengekomen om werk te zoeken]": {
    question:
      "Bent u een EU-burger die in Nederland is gekomen om werk te zoeken?",
  },
  "[vreemdeling zoekt nog immer werk]": { question: "Zoekt u nog werk?" },
  "[zelfstandige is achttien jaar of ouder]": {
    question: "Bent u 18 jaar of ouder?",
  },
  "[zelfstandige heeft pensioengerechtigde leeftijd bereikt]": {
    question: "Heeft u de pensioengerechtigde leeftijd bereikt?",
  },
  "[zelfstandige is voor de voorziening in het bestaan aangewezen op arbeid in eigen bedrijf of zelfstandig beroep hier te lande]": {
    question:
      "Bent u voor de voorziening in het bestaan aangewezen op arbeid in eigen bedrijf of zelfstandig beroep?",
  },
  "[zelfstandige voldoet aan de wettelijke vereisten voor de uitoefening van arbeid in eigen bedrijf of zelfstandig beroep]": {
    question:
      "Voldoet u aan de wettelijke vereisten voor de uitoefening van arbeid in eigen bedrijf of zelfstandig beroep?",
  },
  "[zelfstandige besteedt ten minste 1.225 uur per jaar aan werkzaamheden voor het bedrijf of zelfstandig beroep]": {
    question:
      "Besteedt u ten minste 1.225 uur per jaar aan werkzaamheden voor het bedrijf of zelfstandig beroep?",
  },
  "[zelfstandige heeft alleen of samen met degene met wie hij het bedrijf of zelfstandig beroep uitoefent de volledige zeggenschap]": {
    question:
      "Heeft u alleen of samen met degene met wie u het bedrijf of zelfstandig beroep uitoefent de volledige zeggenschap?",
  },
  "[zelfstandige draagt alleen of samen met degene met wie hij het bedrijf of zelfstandig beroep uitoefent de financiële risico’s]": {
    question:
      "Draagt u alleen of samen met degene met wie u het bedrijf of zelfstandig beroep uitoefent de financiële risico’s?",
  },
  "[zelfstandige ontvangt algemene bijstand op grond van het Besluit bijstandverlening zelfstandigen 2004]": {
    question:
      "Ontvangt u algemene bijstand op grond van het Besluit bijstandverlening zelfstandigen 2004?",
  },
  "[zelfstandige verklaart schriftelijk dat diens bedrijf of zelfstandig beroep financieel is geraakt als gevolg van de crisis in verband met COVID-19]": {
    question:
      "Verklaart u schriftelijk dat uw bedrijf of zelfstandig beroep financieel is geraakt als gevolg van de crisis in verband met COVID-19?",
  },
  "[aanvraag is ingediend voor 1 juni 2020]": {
    question: "Dient u de aanvraag in voor 1 juni 2020?",
  },
  "[zelfstandige verwacht voor de kalendermaanden waarover algemene bijstand wordt aangevraagd, een in aanmerking te nemen inkomen te hebben dat lager is dan de bijstandsnorm]": {
    question:
      "Verwacht u voor de kalendermaanden waarover algemene bijstand wordt aangevraagd, een in aanmerking te nemen inkomen te hebben dat lager is dan de bijstandsnorm?",
  },
  "[zelfstandige verklaart schriftelijk dat hij als gevolg van de crisis in verband met COVID-19 over onvoldoende direct beschikbare geldmiddelen beschikt om aan de financiële verplichtingen verbonden aan diens bedrijf of zelfstandig beroep te kunnen voldoen]": {
    question:
      "Verklaart u dat u als gevolg van de crisis in verband met COVID-19 over onvoldoende direct beschikbare geldmiddelen beschikt om aan de financiële verplichtingen verbonden aan diens bedrijf of zelfstandig beroep te kunnen voldoen?",
  },
  "[zelfstandige maakt aannemelijk dat hij als gevolg van de crisis in verband met COVID-19 over onvoldoende direct beschikbare geldmiddelen beschikt om aan de financiële verplichtingen verbonden aan diens bedrijf of zelfstandig beroep te kunnen voldoen]": {
    question:
      "Beschikt u als gevolg van de crisis in verband met COVID-19 over onvoldoende direct beschikbare geldmiddelen om aan de financiële verplichtingen verbonden aan diens bedrijf of zelfstandig beroep te kunnen voldoen?",
  },
  "[bijstand ter voorziening in de behoefte aan bedrijfskapitaal leidt tot een overschrijding van het de-minimisplafond, bedoeld in art. 3 lid 2, van de algemene de-minimisverordening]": {
    question:
      " Zou bijstand ter voorziening in de behoefte aan bedrijfskapitaal leiden tot een overschrijding van het de-minimisplafond?",
  },
  "[zelfstandige die het bedrijf of zelfstandig beroep uitoefent in de vorm van een maatschap]": {
    question:
      "Oefent u het bedrijf of zelfstandig beroep in de vorm van een maatschap?",
  },
  "[zelfstandige die het bedrijf of zelfstandig beroep uitoefent in de vorm van een vennootschap onder firma]": {
    question:
      "Oefent u het bedrijf of zelfstandig beroep in de vorm van een vennootschap onder firma?",
  },
  "[zelfstandige die het bedrijf of zelfstandig beroep uitoefent in de vorm van een commanditaire vennootschap]": {
    question:
      "Oefent u het bedrijf of zelfstandig beroep in de vorm van een commanditaire vennootschap?",
  },
  "[zelfstandige die het bedrijf of zelfstandig beroep uitoefent in de vorm van een besloten vennootschap]": {
    question:
      "Oefent u het bedrijf of zelfstandig beroep in de vorm van een besloten vennootschap?",
  },
  "[zelfstandige die het bedrijf of zelfstandig beroep uitoefent in de vorm van een coöperatieve vereniging met wettelijke aansprakelijkheid]": {
    question:
      "Oefent u het bedrijf of zelfstandig beroep in de vorm van een coöperatieve vereniging met wettelijke aansprakelijkheid?",
  },
  "[hoofdelijke aansprakelijkheid voor de uit de bijstandsverlening voortvloeiende verplichtingen wordt aanvaard door alle vennoten of leden waarmee het bedrijf of zelfstandig beroep wordt uitgeoefend]": {
    question:
      "Wordt de hoofdelijke aansprakelijkheid voor de uit de bijstandsverlening voortvloeiende verplichtingen aanvaard door alle vennoten of leden waarmee het bedrijf of zelfstandig beroep wordt uitgeoefend?",
  },
  "[hoofdelijke aansprakelijkheid voor de uit de bijstandsverlening voortvloeiende verplichtingen wordt aanvaard door de besloten vennootschap en de coöperatieve vereniging met wettelijke aansprakelijkheid]": {
    question:
      "Wordt de hoofdelijke aansprakelijkheid voor de uit de bijstandsverlening voortvloeiende verplichtingen aanvaard door de besloten vennootschap en de coöperatieve vereniging met wettelijke aansprakelijkheid?",
  },
  "[hoofdelijke aansprakelijkheid voor de uit de bijstandsverlening voortvloeiende verplichtingen wordt aanvaard door de commanditaire vennoot wiens inbreng uitsluitend uit kapitaal bestaat]": {
    question:
      "Wordt de hoofdelijke aansprakelijkheid voor de uit de bijstandsverlening voortvloeiende verplichtingen aanvaard door de commanditaire vennoot wiens inbreng uitsluitend uit kapitaal bestaat?",
  },
  "[zelfstandige heeft een vennoot in een maatschap die daar alleen arbeid inbrengt]": {
    question:
      "Heeft u een vennoot in een maatschap die alleen arbeid inbrengt?",
  },
  "[hoofdelijke aansprakelijkheid voor de uit de bijstandsverlening voortvloeiende verplichtingen wordt aanvaard door vennoot in een maatschap die daar alleen arbeid inbrengt]": {
    question:
      "Wordt de hoofdelijke aansprakelijkheid voor de uit de bijstandsverlening voortvloeiende verplichtingen aanvaard door vennoot in een maatschap die daar alleen arbeid inbrengt?",
  },
  "[onderneming heeft een nevenactiviteit onder de code 55.20.1, 55.20.2, 55.30 of 93.29.9]": {
    question:
      "Heeft uw onderneming een nevenactiviteit onder de code 55.20.1, 55.20.2, 55.30 of 93.29.9?",
  },
  "[Alleen voor zover de onderneming een thuiszorgwinkel betreft]": {
    question: "Betreft uw onderneming een thuiszorgwinkel?",
  },
  "[omzetverlies gedupeerde onderneming verwacht in de periode van 16 maart 2020 tot en met 15 juni 2020 heeft betrekking op zijn nevenactiviteit op zijn nevenactiviteit met de code 55.20.1, 55.20.2, 55.30 of 93.29.9 van de Standaard Bedrijfsindeling]": {
    question:
      "Heeft het verwachte omzetverlies betrekking op uw nevenactiviteit met de code 55.20.1, 55.20.2, 55.30 of 93.29.9 van de Standaard Bedrijfsindeling",
  },
  "[de onderneming is voor minimaal zeventig procent van zijn omzet afhankelijk is van direct gedupeerde ondernemingen]": {
    question:
      "Is uw onderneming voor minimaal zeventig procent van zijn omzet afhankelijk is van direct gedupeerde ondernemingen?",
  },
  "[de onderneming is voor minimaal zeventig procent van zijn omzet afhankelijk is van activiteiten die als gevolg van de overheidsmaatregelen ter bestrijding van de verdere verspreiding van COVID-19 verboden zijn of ontraden worden]": {
    question:
      "Is uw de onderneming voor minimaal zeventig procent van zijn omzet afhankelijk is van activiteiten die als gevolg van de overheidsmaatregelen ter bestrijding van de verdere verspreiding van COVID-19 verboden zijn of ontraden worden?",
  },
  "[gedupeerde zorgonderneming verwacht, ook na aftrek van de tegemoetkoming van zorginkopers ter compensatie van het omzetverlies als gevolg van de maatregelen ter bestrijding van COVID-19 ten minste € 4000,- aan omzetverlies te lijden]": {
    question:
      "Verwacht u ook na aftrek van de tegemoetkoming van zorginkopers ter compensatie van het omzetverlies als gevolg van de maatregelen ter bestrijding van COVID-19 ten minste € 4000,- aan omzetverlies te lijden?",
  },
  "[gedupeerde zorgonderneming verwacht, ook na aftrek van de tegemoetkoming van zorginkopers ter compensatie van het omzetverlies als gevolg van de maatregelen ter bestrijding van COVID-19 ten minste € 4.000,- aan vaste lasten te hebben]": {
    question:
      "Verwacht u ook na aftrek van de tegemoetkoming van zorginkopers ter compensatie van het omzetverlies als gevolg van de maatregelen ter bestrijding van COVID-19 ten minste € 4.000,- aan vaste lasten te hebben?",
  },
  "[gedupeerde onderneming betreft een eenmanszaak]": {
    question: "Betreft uw onderneming een eenmanszaak?",
  },
  "[eenmanszaak heeft zakelijke rekening]": {
    question: "Heeft uw onderneming een zakelijke rekening?",
  },
  "[aanvraag omvat het rekeningnummer van de eigenaar van de eenmanszaak]": {
    question: "Wat is uw persoonlijke rekeningnummer?",
    type: "string",
  },
  "[gedupeerde onderneming is een ambulante onderneming]": {
    question: "Is uw onderneming een ambulante onderneming?",
  },
  "[aanvraag bevat kopie van een zakelijke huur- of koopovereenkomst van een vestiging van de gedupeerde onderneming]": {
    question:
      "Heeft u een kopie van een zakelijke huur- of koopovereenkomst van een vestiging van uw onderneming?",
  },
  "[aanvraag bevat een kopie van de belastingaangifte van het jaar 2019 of 2020 waaruit blijkt dat de vestiging van de gedupeerde onderneming een werkruimte is waarvan de vaste lasten en kosten fiscaal aftrekbaar zijn als bedoeld in artikel 3.16, eerste lid, van de Wet inkomstenbelasting 2001]": {
    question:
      "Heeft u een kopie van de belastingaangifte van het jaar 2019 of 2020 waaruit blijkt dat de vestiging van de gedupeerde onderneming een werkruimte is waarvan de vaste lasten en kosten fiscaal aftrekbaar zijn als bedoeld in artikel 3.16, eerste lid, van de Wet inkomstenbelasting 200?",
  },

  "[onderneming stond op 15 maart 2020 tevens in het handelsregister ingeschreven met een nevenactiviteit onder de SBI-code 55.20.1, 55.20.2, 55.30 of 93.29.9 (gedupeerde agrarische recreatieondernemingen)]": {
    question:
      "Stond uw onderneming op 15 maart 2020 tevens in het handelsregister ingeschreven met een nevenactiviteit onder de SBI-code 55.20.1, 55.20.2, 55.30 of 93.29.9 (gedupeerde agrarische recreatieondernemingen)?",
  },
  "[onderneming is een thuiszorgwinkel]": {
    question: "Is uw onderneming een thuiszorgwinkel?",
  },
};
