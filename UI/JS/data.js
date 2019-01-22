// list of political offices by their types
const offices=[
	{
		"Type":["--Select Type of Office--"],
		"Office":["-- Select Office --"]
	},
	{
		"Type": ["Federal"],
		"Office":["President-Nigeria"]
	},
	{
		"Type":["State"],
		"Office":[
			"Governor-Abia",	"Governor-Adamawa",	"Governor-Akwa-Ibom",	"Governor-Anambra",	"Governor-Bauchi",	"Governor-Bayelsa",
			"Governor-Borno",	"Governor-Cross-River",	"Governor-Delta",	"Governor-Ebonyi",	"Governor-Enugu",	"Governor-Edo",
			"Governor-Ekiti",	"Governor-Gombe",	"Governor-Imo",	"Governor-Jigawa",	"Governor-Kaduna",	"Governor-Kano",
			"Governor-Kastina",	"Governor-Kebbi",	"Governor-Kogi",	"Governor-Kwara",	"Governor-Lagos", "Governor-Nasarawa",	"Governor-Niger",
			"Governor-Ogun",	"Governor-Ondo",	"Governor-Osun",	"Governor-Oyo",	"Governor-Plateau",	"Governor-Rivers",	"Governor-Sokoto",
			"Governor-Taraba","Governor-Yobe",	"Governor-Zamfara"
		]

	},
	{
  	"Type":["Legislative"],
		"Office":[
			"Senator-Abia-North",	"Senator-Abia-Central",	"Senator-Abia-South",	"Senator-Adamawa-North",	"Senator-Adamawa-Central",
			"Senator-Adamawa-South",	"Senator-Akwa-Ibom-North",	"Senator-Akwa-Ibom-Central",	"Senator-Akwa-Ibom-South",	"Senator-Anambra-North",
			"Senator-Anambra-Central",	"Senator-Anambra-South",	"Senator-Bauchi-North",	"Senator-Bauchi-Central",	"Senator-Bauchi-South",
			"Senator-Bayelsa-North",	"Senator-Bayelsa-Central",	"Senator-Bayelsa-South",	"Senator-Borno-North",	"Senator-Borno-Central",
			"Senator-Borno-South","Senator-Benue-North",	"Senator-Benue-Central","Senator-Benue-South",	"Senator-Cross-River-North",	"Senator-Cross-River-Central",	"Senator-Cross-River-South",	"Senator-Delta-North",
			"Senator-Delta-Central",	"Senator-Delta-South",	"Senator-Ebonyi-North",	"Senator-Ebonyi-Central",	"Senator-Ebonyi-South",
			"Senator-Enugu-North",	"Senator-Enugu-Central",	"Senator-Enugu-South",	"Senator-Edo-North",	"Senator-Edo-Central",
			"Senator-Edo-South",	"Senator-Ekiti-North",	"Senator-Ekiti-Central",	"Senator-Ekiti-South",	"Senator-FCT-North",	"Senator-FCT-Central",
			"Senator-FCT-South",	"Senator-Gombe-North",	"Senator-Gombe-Central",	"Senator-Gombe-South",	"Senator-Imo-North",	"Senator-Imo-Central",
			"Senator-Imo-South",	"Senator-Jigawa-North",	"Senator-Jigawa-Central",	"Senator-Jigawa-South",	"Senator-Kaduna-North",
			"Senator-Kaduna-Central",	"Senator-Kaduna-South",	"Senator-Kano-North",	"Senator-Kano-Central",	"Senator-Kano-South",	"Senator-Kastina-North",
			"Senator-Kastina-Central",	"Senator-Kastina-South",	"Senator-Kebbi-North",	"Senator-Kebbi-Central",	"Senator-Kebbi-South",
			"Senator-Kogi-North",	"Senator-Kogi-Central",	"Senator-Kogi-South",	"Senator-Kwara-North",	"Senator-Kwara-Central",	"Senator-Kwara-South",
			"Senator-Lagos-North",	"Senator-Lagos-Central",	"Senator-Lagos-South",	"Senator-Nasarawa-North",	"Senator-Nasarawa-Central",
			"Senator-Nasarawa-South",	"Senator-Niger-North",	"Senator-Niger-Central",	"Senator-Niger-South",	"Senator-Ogun-North",
			"Senator-Ogun-Central",	"Senator-Ogun-South",	"Senator-Ondo-North",	"Senator-Ondo-Central",	"Senator-Ondo-South",	"Senator-Osun-North",
			"Senator-Osun-Central",	"Senator-Osun-South",	"Senator-Oyo-North",	"Senator-Oyo-Central",	"Senator-Oyo-South",	"Senator-Plateau-North",
			"Senator-Plateau-Central",	"Senator-Plateau-South",	"Senator-Rivers-North",	"Senator-Rivers-Central",	"Senator-Rivers-South",
			"Senator-Sokoto-North",	"Senator-Sokoto-Central",	"Senator-Sokoto-South",	"Senator-Taraba-North",	"Senator-Taraba-Central",
			"Senator-Taraba-South",	"Senator-Yobe-North",	"Senator-Yobe-Central",	"Senator-Yobe-South", "Senator-Zamfara-North",	"Senator-Zamfara-Central",	"Senator-Zamfara-South",
			"Representative-Abia-Federal-Constituency-I",	"Representative-Abia-Federal-Constituency-II",	"Representative-Abia-Federal-Constituency-III",
			"Representative-Abia-Federal-Constituency-IV",	"Representative-Abia-Federal-Constituency-V",	"Representative-Abia-Federal-Constituency-VI",	"Representative-Abia-Federal-Constituency-VII",	"Representative-Abia-Federal-Constituency-VIII",	"Representative-Abia-Federal-Constituency-IX",	"Representative-Abia-Federal-Constituency-X",	"Representative-Adamawa-Federal-Constituency-I",	"Representative-Adamawa-Federal-Constituency-II",	"Representative-Adamawa-Federal-Constituency-III",	"Representative-Adamawa-Federal-Constituency-IV",	"Representative-Adamawa-Federal-Constituency-V",	"Representative-Adamawa-Federal-Constituency-VI",	"Representative-Adamawa-Federal-Constituency-VII",	"Representative-Adamawa-Federal-Constituency-VIII",	"Representative-Adamawa-Federal-Constituency-IX",	"Representative-Adamawa-Federal-Constituency-X",	"Representative-Akwa-Ibom-Federal-Constituency-I",	"Representative-Akwa-Ibom-Federal-Constituency-II",	"Representative-Akwa-Ibom-Federal-Constituency-III",	"Representative-Akwa-Ibom-Federal-Constituency-IV",	"Representative-Akwa-Ibom-Federal-Constituency-V",	"Representative-Akwa-Ibom-Federal-Constituency-VI",	"Representative-Akwa-Ibom-Federal-Constituency-VII",	"Representative-Akwa-Ibom-Federal-Constituency-VIII",	"Representative-Akwa-Ibom-Federal-Constituency-IX",	"Representative-Akwa-Ibom-Federal-Constituency-X",	"Representative-Anambra-Federal-Constituency-I",	"Representative-Anambra-Federal-Constituency-II",	"Representative-Anambra-Federal-Constituency-III",	"Representative-Anambra-Federal-Constituency-IV",	"Representative-Anambra-Federal-Constituency-V",	"Representative-Anambra-Federal-Constituency-VI",	"Representative-Anambra-Federal-Constituency-VII",	"Representative-Anambra-Federal-Constituency-VIII",	"Representative-Anambra-Federal-Constituency-IX",	"Representative-Anambra-Federal-Constituency-X",	"Representative-Bauchi-Federal-Constituency-I",	"Representative-Bauchi-Federal-Constituency-II",	"Representative-Bauchi-Federal-Constituency-III",	"Representative-Bauchi-Federal-Constituency-IV",	"Representative-Bauchi-Federal-Constituency-V",	"Representative-Bauchi-Federal-Constituency-VI",	"Representative-Bauchi-Federal-Constituency-VII",	"Representative-Bauchi-Federal-Constituency-VIII",	"Representative-Bauchi-Federal-Constituency-IX",	"Representative-Bauchi-Federal-Constituency-X",	"Representative-Bayelsa-Federal-Constituency-I",	"Representative-Bayelsa-Federal-Constituency-II",	"Representative-Bayelsa-Federal-Constituency-III",	"Representative-Bayelsa-Federal-Constituency-IV",	"Representative-Bayelsa-Federal-Constituency-V",	"Representative-Bayelsa-Federal-Constituency-VI",	"Representative-Bayelsa-Federal-Constituency-VII",	"Representative-Bayelsa-Federal-Constituency-VIII",	"Representative-Bayelsa-Federal-Constituency-IX",	"Representative-Bayelsa-Federal-Constituency-X",	"Representative-Borno-Federal-Constituency-I",	"Representative-Borno-Federal-Constituency-II",	"Representative-Borno-Federal-Constituency-III",	"Representative-Borno-Federal-Constituency-IV",	"Representative-Borno-Federal-Constituency-V",	"Representative-Borno-Federal-Constituency-VI",	"Representative-Borno-Federal-Constituency-VII",	"Representative-Borno-Federal-Constituency-VIII",	"Representative-Borno-Federal-Constituency-IX",	"Representative-Borno-Federal-Constituency-X",	"Representative-Benue-Federal-Constituency-I",	"Representative-Benue-Federal-Constituency-II",	"Representative-Benue-Federal-Constituency-III",	"Representative-Benue-Federal-Constituency-IV",	"Representative-Benue-Federal-Constituency-V",	"Representative-Benue-Federal-Constituency-VI",	"Representative-Benue-Federal-Constituency-VII",	"Representative-Benue-Federal-Constituency-VIII",	"Representative-Benue-Federal-Constituency-IX",	"Representative-Benue-Federal-Constituency-X",	"Representative-Cross-River-Federal-Constituency-I",	"Representative-Cross-River-Federal-Constituency-II",	"Representative-Cross-River-Federal-Constituency-III",	"Representative-Cross-River-Federal-Constituency-IV",	"Representative-Cross-River-Federal-Constituency-V",	"Representative-Cross-River-Federal-Constituency-VI",	"Representative-Cross-River-Federal-Constituency-VII",	"Representative-Cross-River-Federal-Constituency-VIII",	"Representative-Cross-River-Federal-Constituency-IX",	"Representative-Cross-River-Federal-Constituency-X",	"Representative-Delta-Federal-Constituency-I",	"Representative-Delta-Federal-Constituency-II",	"Representative-Delta-Federal-Constituency-III",	"Representative-Delta-Federal-Constituency-IV",	"Representative-Delta-Federal-Constituency-V",	"Representative-Delta-Federal-Constituency-VI",	"Representative-Delta-Federal-Constituency-VII",	"Representative-Delta-Federal-Constituency-VIII",	"Representative-Delta-Federal-Constituency-IX",	"Representative-Delta-Federal-Constituency-X",	"Representative-Enugu-Federal-Constituency-I",	"Representative-Enugu-Federal-Constituency-II",	"Representative-Enugu-Federal-Constituency-III",	"Representative-Enugu-Federal-Constituency-IV",	"Representative-Enugu-Federal-Constituency-V",	"Representative-Enugu-Federal-Constituency-VI",	"Representative-Enugu-Federal-Constituency-VII",	"Representative-Enugu-Federal-Constituency-VIII",	"Representative-Enugu-Federal-Constituency-IX",	"Representative-Enugu-Federal-Constituency-X",	"Representative-Ebonyi-Federal-Constituency-I",	"Representative-Ebonyi-Federal-Constituency-II",	"Representative-Ebonyi-Federal-Constituency-III",	"Representative-Ebonyi-Federal-Constituency-IV",	"Representative-Ebonyi-Federal-Constituency-V",	"Representative-Ebonyi-Federal-Constituency-VI",	"Representative-Ebonyi-Federal-Constituency-VII",	"Representative-Ebonyi-Federal-Constituency-VIII",	"Representative-Ebonyi-Federal-Constituency-IX",	"Representative-Ebonyi-Federal-Constituency-X",	"Representative-Edo-Federal-Constituency-I",	"Representative-Edo-Federal-Constituency-II",	"Representative-Edo-Federal-Constituency-III",	"Representative-Edo-Federal-Constituency-IV",	"Representative-Edo-Federal-Constituency-V",	"Representative-Edo-Federal-Constituency-VI",	"Representative-Edo-Federal-Constituency-VII",	"Representative-Edo-Federal-Constituency-VIII",	"Representative-Edo-Federal-Constituency-IX",	"Representative-Edo-Federal-Constituency-X",	"Representative-Ekiti-Federal-Constituency-I",	"Representative-Ekiti-Federal-Constituency-II",	"Representative-Ekiti-Federal-Constituency-III",	"Representative-Ekiti-Federal-Constituency-IV",	"Representative-Ekiti-Federal-Constituency-V",	"Representative-Ekiti-Federal-Constituency-VI",	"Representative-Ekiti-Federal-Constituency-VII",	"Representative-Ekiti-Federal-Constituency-VIII",	"Representative-Ekiti-Federal-Constituency-IX",	"Representative-Ekiti-Federal-Constituency-X",	"Representative-Gombe-Federal-Constituency-I",	"Representative-Gombe-Federal-Constituency-II",	"Representative-Gombe-Federal-Constituency-III",	"Representative-Gombe-Federal-Constituency-IV",	"Representative-Gombe-Federal-Constituency-V",	"Representative-Gombe-Federal-Constituency-VI",	"Representative-Gombe-Federal-Constituency-VII",	"Representative-Gombe-Federal-Constituency-VIII",	"Representative-Gombe-Federal-Constituency-IX",	"Representative-Gombe-Federal-Constituency-X",	"Representative-Imo-Federal-Constituency-I",	"Representative-Imo-Federal-Constituency-II",	"Representative-Imo-Federal-Constituency-III",	"Representative-Imo-Federal-Constituency-IV",	"Representative-Imo-Federal-Constituency-V",	"Representative-Imo-Federal-Constituency-VI",	"Representative-Imo-Federal-Constituency-VII",	"Representative-Imo-Federal-Constituency-VIII",	"Representative-Imo-Federal-Constituency-IX",	"Representative-Imo-Federal-Constituency-X",	"Representative-Jigawa-Federal-Constituency-I",	"Representative-Jigawa-Federal-Constituency-II",	"Representative-Jigawa-Federal-Constituency-III",	"Representative-Jigawa-Federal-Constituency-IV",	"Representative-Jigawa-Federal-Constituency-V",	"Representative-Jigawa-Federal-Constituency-VI",	"Representative-Jigawa-Federal-Constituency-VII",	"Representative-Jigawa-Federal-Constituency-VIII",	"Representative-Jigawa-Federal-Constituency-IX",	"Representative-Jigawa-Federal-Constituency-X",	"Representative-Kaduna-Federal-Constituency-I",	"Representative-Kaduna-Federal-Constituency-II",	"Representative-Kaduna-Federal-Constituency-III",	"Representative-Kaduna-Federal-Constituency-IV",	"Representative-Kaduna-Federal-Constituency-V",	"Representative-Kaduna-Federal-Constituency-VI",	"Representative-Kaduna-Federal-Constituency-VII",	"Representative-Kaduna-Federal-Constituency-VIII",	"Representative-Kaduna-Federal-Constituency-IX",	"Representative-Kaduna-Federal-Constituency-X",	"Representative-Kano-Federal-Constituency-I",	"Representative-Kano-Federal-Constituency-II",	"Representative-Kano-Federal-Constituency-III",	"Representative-Kano-Federal-Constituency-IV",	"Representative-Kano-Federal-Constituency-V",	"Representative-Kano-Federal-Constituency-VI",	"Representative-Kano-Federal-Constituency-VII",	"Representative-Kano-Federal-Constituency-VIII",	"Representative-Kano-Federal-Constituency-IX",	"Representative-Kano-Federal-Constituency-X",	"Representative-Kastina-Federal-Constituency-I",	"Representative-Kastina-Federal-Constituency-II",	"Representative-Kastina-Federal-Constituency-III",	"Representative-Kastina-Federal-Constituency-IV",	"Representative-Kastina-Federal-Constituency-V",	"Representative-Kastina-Federal-Constituency-VI",	"Representative-Kastina-Federal-Constituency-VII",	"Representative-Kastina-Federal-Constituency-VIII",	"Representative-Kastina-Federal-Constituency-IX",	"Representative-Kastina-Federal-Constituency-X",	"Representative-Kebbi-Federal-Constituency-I",	"Representative-Kebbi-Federal-Constituency-II",	"Representative-Kebbi-Federal-Constituency-III",	"Representative-Kebbi-Federal-Constituency-IV",	"Representative-Kebbi-Federal-Constituency-V",	"Representative-Kebbi-Federal-Constituency-VI",	"Representative-Kebbi-Federal-Constituency-VII",	"Representative-Kebbi-Federal-Constituency-VIII",	"Representative-Kebbi-Federal-Constituency-IX",	"Representative-Kebbi-Federal-Constituency-X",	"Representative-Kogi-Federal-Constituency-I",	"Representative-Kogi-Federal-Constituency-II",	"Representative-Kogi-Federal-Constituency-III",	"Representative-Kogi-Federal-Constituency-IV",	"Representative-Kogi-Federal-Constituency-V",	"Representative-Kogi-Federal-Constituency-VI",	"Representative-Kogi-Federal-Constituency-VII",	"Representative-Kogi-Federal-Constituency-VIII",	"Representative-Kogi-Federal-Constituency-IX",	"Representative-Kogi-Federal-Constituency-X",	"Representative-Kwara-Federal-Constituency-I",	"Representative-Kwara-Federal-Constituency-II",	"Representative-Kwara-Federal-Constituency-III",	"Representative-Kwara-Federal-Constituency-IV",	"Representative-Kwara-Federal-Constituency-V",	"Representative-Kwara-Federal-Constituency-VI",	"Representative-Kwara-Federal-Constituency-VII",	"Representative-Kwara-Federal-Constituency-VIII",	"Representative-Kwara-Federal-Constituency-IX",	"Representative-Kwara-Federal-Constituency-X",	"Representative-Lagos-Federal-Constituency-I",	"Representative-Lagos-Federal-Constituency-II",	"Representative-Lagos-Federal-Constituency-III",	"Representative-Lagos-Federal-Constituency-IV",	"Representative-Lagos-Federal-Constituency-V",	"Representative-Lagos-Federal-Constituency-VI",	"Representative-Lagos-Federal-Constituency-VII",	"Representative-Lagos-Federal-Constituency-VIII",	"Representative-Lagos-Federal-Constituency-IX",	"Representative-Lagos-Federal-Constituency-X",	"Representative-Nasarawa-Federal-Constituency-I",	"Representative-Nasarawa-Federal-Constituency-II",	"Representative-Nasarawa-Federal-Constituency-III",	"Representative-Nasarawa-Federal-Constituency-IV",	"Representative-Nasarawa-Federal-Constituency-V",	"Representative-Nasarawa-Federal-Constituency-VI",	"Representative-Nasarawa-Federal-Constituency-VII",	"Representative-Nasarawa-Federal-Constituency-VIII",	"Representative-Nasarawa-Federal-Constituency-IX",	"Representative-Nasarawa-Federal-Constituency-X",	"Representative-Niger-Federal-Constituency-I",	"Representative-Niger-Federal-Constituency-II",	"Representative-Niger-Federal-Constituency-III",	"Representative-Niger-Federal-Constituency-IV",	"Representative-Niger-Federal-Constituency-V",	"Representative-Niger-Federal-Constituency-VI",	"Representative-Niger-Federal-Constituency-VII",	"Representative-Niger-Federal-Constituency-VIII",	"Representative-Niger-Federal-Constituency-IX",	"Representative-Niger-Federal-Constituency-X",	"Representative-Ogun-Federal-Constituency-I",	"Representative-Ogun-Federal-Constituency-II",	"Representative-Ogun-Federal-Constituency-III",	"Representative-Ogun-Federal-Constituency-IV",	"Representative-Ogun-Federal-Constituency-V",	"Representative-Ogun-Federal-Constituency-VI",	"Representative-Ogun-Federal-Constituency-VII",	"Representative-Ogun-Federal-Constituency-VIII",	"Representative-Ogun-Federal-Constituency-IX",	"Representative-Ogun-Federal-Constituency-X",	"Representative-Ondo-Federal-Constituency-I",	"Representative-Ondo-Federal-Constituency-II",	"Representative-Ondo-Federal-Constituency-III",	"Representative-Ondo-Federal-Constituency-IV",	"Representative-Ondo-Federal-Constituency-V",	"Representative-Ondo-Federal-Constituency-VI",	"Representative-Ondo-Federal-Constituency-VII",	"Representative-Ondo-Federal-Constituency-VIII",	"Representative-Ondo-Federal-Constituency-IX",	"Representative-Ondo-Federal-Constituency-X",	"Representative-Osun-Federal-Constituency-I",	"Representative-Osun-Federal-Constituency-II",	"Representative-Osun-Federal-Constituency-III",	"Representative-Osun-Federal-Constituency-IV",	"Representative-Osun-Federal-Constituency-V",	"Representative-Osun-Federal-Constituency-VI",	"Representative-Osun-Federal-Constituency-VII",	"Representative-Osun-Federal-Constituency-VIII",	"Representative-Osun-Federal-Constituency-IX",	"Representative-Osun-Federal-Constituency-X",	"Representative-Oyo-Federal-Constituency-I",	"Representative-Oyo-Federal-Constituency-II",	"Representative-Oyo-Federal-Constituency-III",	"Representative-Oyo-Federal-Constituency-IV",	"Representative-Oyo-Federal-Constituency-V",	"Representative-Oyo-Federal-Constituency-VI",	"Representative-Oyo-Federal-Constituency-VII",	"Representative-Oyo-Federal-Constituency-VIII",	"Representative-Oyo-Federal-Constituency-IX",	"Representative-Oyo-Federal-Constituency-X",	"Representative-Plateau-Federal-Constituency-I",	"Representative-Plateau-Federal-Constituency-II",	"Representative-Plateau-Federal-Constituency-III",	"Representative-Plateau-Federal-Constituency-IV",	"Representative-Plateau-Federal-Constituency-V",	"Representative-Plateau-Federal-Constituency-VI",	"Representative-Plateau-Federal-Constituency-VII",	"Representative-Plateau-Federal-Constituency-VIII",	"Representative-Plateau-Federal-Constituency-IX",	"Representative-Plateau-Federal-Constituency-X",	"Representative-Rivers-Federal-Constituency-I",	"Representative-Rivers-Federal-Constituency-II",	"Representative-Rivers-Federal-Constituency-III",	"Representative-Rivers-Federal-Constituency-IV",	"Representative-Rivers-Federal-Constituency-V",	"Representative-Rivers-Federal-Constituency-VI",	"Representative-Rivers-Federal-Constituency-VII",	"Representative-Rivers-Federal-Constituency-VIII",	"Representative-Rivers-Federal-Constituency-IX",	"Representative-Rivers-Federal-Constituency-X",	"Representative-Sokoto-Federal-Constituency-I",	"Representative-Sokoto-Federal-Constituency-II",	"Representative-Sokoto-Federal-Constituency-III",	"Representative-Sokoto-Federal-Constituency-IV",	"Representative-Sokoto-Federal-Constituency-V",	"Representative-Sokoto-Federal-Constituency-VI",	"Representative-Sokoto-Federal-Constituency-VII",	"Representative-Sokoto-Federal-Constituency-VIII",	"Representative-Sokoto-Federal-Constituency-IX",	"Representative-Sokoto-Federal-Constituency-X",	"Representative-Taraba-Federal-Constituency-I",	"Representative-Taraba-Federal-Constituency-II",	"Representative-Taraba-Federal-Constituency-III",	"Representative-Taraba-Federal-Constituency-IV",	"Representative-Taraba-Federal-Constituency-V",	"Representative-Taraba-Federal-Constituency-VI",	"Representative-Taraba-Federal-Constituency-VII",	"Representative-Taraba-Federal-Constituency-VIII",	"Representative-Taraba-Federal-Constituency-IX",	"Representative-Taraba-Federal-Constituency-X",	"Representative-Yobe-Federal-Constituency-I",	"Representative-Yobe-Federal-Constituency-II",	"Representative-Yobe-Federal-Constituency-III",	"Representative-Yobe-Federal-Constituency-IV",	"Representative-Yobe-Federal-Constituency-V",	"Representative-Yobe-Federal-Constituency-VI",	"Representative-Yobe-Federal-Constituency-VII",	"Representative-Yobe-Federal-Constituency-VIII",	"Representative-Yobe-Federal-Constituency-IX",	"Representative-Yobe-Federal-Constituency-X",	"Representative-Zamfara-Federal-Constituency-I",	"Representative-Zamfara-Federal-Constituency-II",	"Representative-Zamfara-Federal-Constituency-III",	"Representative-Zamfara-Federal-Constituency-IV",	"Representative-Zamfara-Federal-Constituency-V",	"Representative-Zamfara-Federal-Constituency-VI",	"Representative-Zamfara-Federal-Constituency-VII",	"Representative-Zamfara-Federal-Constituency-VIII",	"Representative-Zamfara-Federal-Constituency-IX",	"Representative-Zamfara-Federal-Constituency-X",

		]
	},
	{
		"Type":["Local Government"],
		"Office": [
			"Chairman-Aba-North",	"Chairman-Aba-South",	"Chairman-Aro-Chukwu",	"Chairman-Bende",	"Chairman-Ikwuano",	"Chairman-Isiala-Ngwa-North",
			"Chairman-Isiala-Ngwa-South",	"Chairman-Isuikwuato",	"Chairman-Obi-Ngwa",	"Chairman-Ohafia",	"Chairman-Osisioma",	"Chairman-Ugwunagbo",
			"Chairman-Ukwa-East",	"Chairman-Ukwa-West",	"Chairman-Umuahia-North",	"Chairman-Umuahia-South",	"Chairman-Umu-Nneo-Chi",
			"Chairman-Demsa",	"Chairman-Fufure",	"Chairman-Ganye",	"Chairman-Gayuk",	"Chairman-Gombi",	"Chairman-Grie",	"Chairman-Hong",
			"Chairman-Jada",	"Chairman-Lamurde",	"Chairman-Madagali",	"Chairman-Maiha",	"Chairman-Mayo-Belwa",	"Chairman-Michika",
			"Chairman-Mubi-North",	"Chairman-Mubi-South",	"Chairman-Numan",	"Chairman-Shelleng",	"Chairman-Song",	"Chairman-Toungo",
			"Chairman-Yola-North",	"Chairman-Yola-South",	"Chairman-Abak",	"Chairman-Eastern-Obolo",	"Chairman-Eket",	"Chairman-Esit-Eket",
			"Chairman-Essien-Udim",	"Chairman-Etim-Ekpo",	"Chairman-Etinan",	"Chairman-Ibeno",	"Chairman-Ibesikpo-Asutan",	"Chairman-Ibiono-Ibom",
			"Chairman-Ika",	"Chairman-Ikono",	"Chairman-Ikot-Abasi",	"Chairman-Ikot-Ekpene",	"Chairman-Ini",	"Chairman-Itu",	"Chairman-Mbo",
			"Chairman-Mkpat-Enin",	"Chairman-Nsit-Atai",	"Chairman-Nsit-Ibom",	"Chairman-Nsit-Ubium",	"Chairman-Obot-Akara",	"Chairman-Okobo",
			"Chairman-Onna",	"Chairman-Oron",	"Chairman-Oruk-Anam",	"Chairman-Udung-Uko",	"Chairman-Ukanafun",	"Chairman-Uruan",
			"Chairman-Urue-Offong/Oruko",	"Chairman-Uyo",	"Chairman-Aguata",	"Chairman-Anambra-East",	"Chairman-Anambra-West",	"Chairman-Anaocha",
			"Chairman-Awka-North",	"Chairman-Awka-South",	"Chairman-Ayamelum",	"Chairman-Dunukofia",	"Chairman-Ekwusigo",	"Chairman-Idemili-North",
			"Chairman-Idemili-South",	"Chairman-Ihiala",	"Chairman-Njikoka",	"Chairman-Nnewi-North",	"Chairman-Nnewi-South",	"Chairman-Ogbaru",
			"Chairman-Onitsha-North",	"Chairman-Onitsha-South",	"Chairman-Orumba-North",	"Chairman-Orumba-South",	"Chairman-Oyi",	"Chairman-Alkaleri",
			"Chairman-Bauchi",	"Chairman-Bogoro",	"Chairman-Damban",	"Chairman-Darazo",	"Chairman-Dass",	"Chairman-Gamawa",	"Chairman-Ganjuwa",
			"Chairman-Giade",	"Chairman-Itas/Gadau",	"Chairman-Jama-are",	"Chairman-Katagum",	"Chairman-Kirfi",	"Chairman-Misau",	"Chairman-Ningi",
			"Chairman-Shira",	"Chairman-Tafawa-Balewa",	"Chairman-Toro",	"Chairman-Warji",	"Chairman-Zaki",	"Chairman-Brass",	"Chairman-Ekeremor",
			"Chairman-Kolokuma/Opokuma",	"Chairman-Nembe",	"Chairman-Ogbia",	"Chairman-Sagbama",	"Chairman-Southern-Ijaw",	"Chairman-Yenagoa",
			"Chairman-Agatu",	"Chairman-Apa",	"Chairman-Ado",	"Chairman-Buruku",	"Chairman-Gboko",	"Chairman-Guma",	"Chairman-Gwer-East",
			"Chairman-Gwer-West",	"Chairman-Katsina-Ala",	"Chairman-Konshisha",	"Chairman-Kwande",	"Chairman-Logo",	"Chairman-Makurdi",
			"Chairman-Obi",	"Chairman-Ogbadibo",	"Chairman-Ohimini",	"Chairman-Oju",	"Chairman-Okpokwu",	"Chairman-Oturkpo",	"Chairman-Tarka",
			"Chairman-Ukum",	"Chairman-Ushongo",	"Chairman-Vandeikya",	"Chairman-Abadam",	"Chairman-Askira/Uba",	"Chairman-Bama",	"Chairman-Bayo",
			"Chairman-Biu",	"Chairman-Chibok",	"Chairman-Damboa",	"Chairman-Dikwa",	"Chairman-Gubio",	"Chairman-Guzamala",	"Chairman-Gwoza",
			"Chairman-Hawul",	"Chairman-Jere",	"Chairman-Kaga",	"Chairman-Kala/Balge",	"Chairman-Konduga",	"Chairman-Kukawa",	"Chairman-Kwaya-Kusar",
			"Chairman-Mafa",	"Chairman-Magumeri",	"Chairman-Maiduguri",	"Chairman-Marte",	"Chairman-Mobbar",	"Chairman-Monguno",	"Chairman-Ngala",
			"Chairman-Nganzai",	"Chairman-Shani",	"Chairman-Abi",	"Chairman-Akamkpa",	"Chairman-Akpabuyo",	"Chairman-Bakassi",	"Chairman-Bekwarra",
			"Chairman-Biase",	"Chairman-Boki",	"Chairman-Calabar-Municipal",	"Chairman-Calabar-South",	"Chairman-Etung",	"Chairman-Ikom",
			"Chairman-Obanliku",	"Chairman-Obubra",	"Chairman-Obudu",	"Chairman-Odukpani",	"Chairman-Ogoja",	"Chairman-Yakuur",	"Chairman-Yala",
			"Chairman-Aniocha-North",	"Chairman-Aniocha-South",	"Chairman-Bomadi",	"Chairman-Burutu",	"Chairman-Ethiope-East",
			"Chairman-Ethiope-West",	"Chairman-Ika-North-East",	"Chairman-Ika-South",	"Chairman-Isoko-North",	"Chairman-Isoko-South",
			"Chairman-Ndokwa-East",	"Chairman-Ndokwa-West",	"Chairman-Okpe",	"Chairman-Oshimili-North",	"Chairman-Oshimili-South",
			"Chairman-Patani",	"Chairman-Sapele",	"Chairman-Udu",	"Chairman-Ughelli-North",	"Chairman-Ughelli-South",	"Chairman-Ukwuani",
			"Chairman-Uvwie",	"Chairman-Warri-North",	"Chairman-Warri-South",	"Chairman-Warri-South-West",	"Chairman-Abakaliki",
			"Chairman-Afikpo-North",	"Chairman-Afikpo-South",	"Chairman-Ebonyi",	"Chairman-Ezza-North",	"Chairman-Ezza-South",
			"Chairman-Ikwo",	"Chairman-Ishielu",	"Chairman-Ivo",	"Chairman-Izzi",	"Chairman-Ohaozara",	"Chairman-Ohaukwu",	"Chairman-Onicha",
			"Chairman-Akoko-Edo",	"Chairman-Egor",	"Chairman-Esan-Central",	"Chairman-Esan-North-East",	"Chairman-Esan-South-East",
			"Chairman-Esan-West",	"Chairman-Etsako-Central",	"Chairman-Etsako-East",	"Chairman-Etsako-West",	"Chairman-Igueben",
			"Chairman-Ikpoba-Okha",	"Chairman-Orhionmwon",	"Chairman-Oredo",	"Chairman-Ovia-North-East",	"Chairman-Ovia-South-West",
			"Chairman-Owan-East",	"Chairman-Owan-West",	"Chairman-Uhunmwonde",	"Chairman-Ado-Ekiti",	"Chairman-Efon",	"Chairman-Ekiti-East",
			"Chairman-Ekiti-South-West",	"Chairman-Ekiti-West",	"Chairman-Emure",	"Chairman-Gbonyin",	"Chairman-Ido-Osi",	"Chairman-Ijero",
			"Chairman-Ikere",	"Chairman-Ikole",	"Chairman-Ilejemeje",	"Chairman-Irepodun/Ifelodun",	"Chairman-Ise/Orun",	"Chairman-Moba",
			"Chairman-Oye",	"Chairman-Aninri",	"Chairman-Awgu",	"Chairman-Enugu-East",	"Chairman-Enugu-North",	"Chairman-Enugu-South",
			"Chairman-Ezeagu",	"Chairman-Igbo-Etiti",	"Chairman-Igbo-Eze-North",	"Chairman-Igbo-Eze-South",	"Chairman-Isi-Uzo",	"Chairman-Nkanu-East",
			"Chairman-Nkanu-West",	"Chairman-Nsukka",	"Chairman-Oji-River",	"Chairman-Udenu",	"Chairman-Udi",	"Chairman-Uzo-Uwani",	"Chairman-Abaji",
			"Chairman-Bwari",	"Chairman-Gwagwalada",	"Chairman-Kuje",	"Chairman-Kwali",	"Chairman-Municipal-Area-Council",	"Chairman-Akko",
			"Chairman-Balanga",	"Chairman-Billiri",	"Chairman-Dukku",	"Chairman-Funakaye",	"Chairman-Gombe",	"Chairman-Kaltungo",	"Chairman-Kwami",
			"Chairman-Nafada",	"Chairman-Shongom",	"Chairman-Yamaltu/Deba",	"Chairman-Aboh-Mbaise",	"Chairman-Ahiazu-Mbaise",	"Chairman-Ehime-Mbano",
			"Chairman-Ezinihitte",	"Chairman-Ideato-North",	"Chairman-Ideato-South",	"Chairman-Ihitte/Uboma",	"Chairman-Ikeduru",
			"Chairman-Isiala-Mbano",	"Chairman-Isu",	"Chairman-Mbaitoli",	"Chairman-Ngor-Okpala",	"Chairman-Njaba",	"Chairman-Nkwerre",
			"Chairman-Nwangele",	"Chairman-Obowo",	"Chairman-Oguta",	"Chairman-Ohaji/Egbema",	"Chairman-Okigwe",	"Chairman-Orlu",	"Chairman-Orsu",
			"Chairman-Oru-East",	"Chairman-Oru-West",	"Chairman-Owerri-Municipal",	"Chairman-Owerri-North",	"Chairman-Owerri-West",	"Chairman-Unuimo",
			"Chairman-Auyo",	"Chairman-Babura",	"Chairman-Biriniwa",	"Chairman-Birnin-Kudu",	"Chairman-Buji",	"Chairman-Dutse",	"Chairman-Gagarawa",
			"Chairman-Garki",	"Chairman-Gumel",	"Chairman-Guri",	"Chairman-Gwaram",	"Chairman-Gwiwa",	"Chairman-Hadejia",	"Chairman-Jahun",
			"Chairman-Kafin-Hausa",	"Chairman-Kazaure",	"Chairman-Kiri-Kasama",	"Chairman-Kiyawa",	"Chairman-Kaugama",	"Chairman-Maigatari",
			"Chairman-Malam-Madori",	"Chairman-Miga",	"Chairman-Ringim",	"Chairman-Roni",	"Chairman-Sule-Tankarkar",	"Chairman-Taura",
			"Chairman-Yankwashi",	"Chairman-Birnin-Gwari",	"Chairman-Chikun",	"Chairman-Giwa",	"Chairman-Igabi",	"Chairman-Ikara",	"Chairman-Jaba",
			"Chairman-Jema-a",	"Chairman-Kachia",	"Chairman-Kaduna-North",	"Chairman-Kaduna-South",	"Chairman-Kagarko",	"Chairman-Kajuru",
			"Chairman-Kaura",	"Chairman-Kauru",	"Chairman-Kubau",	"Chairman-Kudan",	"Chairman-Lere",	"Chairman-Makarfi",	"Chairman-Sabon-Gari",
			"Chairman-Sanga",	"Chairman-Soba",	"Chairman-Zangon-Kataf",	"Chairman-Zaria",	"Chairman-Ajingi",	"Chairman-Albasu",	"Chairman-Bagwai",
			"Chairman-Bebeji",	"Chairman-Bichi",	"Chairman-Bunkure",	"Chairman-Dala",	"Chairman-Dambatta",	"Chairman-Dawakin-Kudu",
			"Chairman-Dawakin-Tofa",	"Chairman-Doguwa",	"Chairman-Fagge",	"Chairman-Gabasawa",	"Chairman-Garko",	"Chairman-Garun-Mallam",
			"Chairman-Gaya",	"Chairman-Gezawa",	"Chairman-Gwale",	"Chairman-Gwarzo",	"Chairman-Kabo",	"Chairman-Kano-Municipal",	"Chairman-Karaye",
			"Chairman-Kibiya",	"Chairman-Kiru",	"Chairman-Kumbotso",	"Chairman-Kunchi",	"Chairman-Kura",	"Chairman-Madobi",	"Chairman-Makoda",
			"Chairman-Minjibir",	"Chairman-Nasarawa",	"Chairman-Rano",	"Chairman-Rimin-Gado",	"Chairman-Rogo",	"Chairman-Shanono",
			"Chairman-Sumaila",	"Chairman-Takai",	"Chairman-Tarauni",	"Chairman-Tofa",	"Chairman-Tsanyawa",	"Chairman-Tudun-Wada",
			"Chairman-Ungogo",	"Chairman-Warawa",	"Chairman-Wudil",	"Chairman-Bakori",	"Chairman-Batagarawa",	"Chairman-Batsari",
			"Chairman-Baure",	"Chairman-Bindawa",	"Chairman-Charanchi",	"Chairman-Dandume",	"Chairman-Danja",	"Chairman-Dan-Musa",
			"Chairman-Daura",	"Chairman-Dutsi",	"Chairman-Dutsin-Ma",	"Chairman-Faskari",	"Chairman-Funtua",	"Chairman-Ingawa",
			"Chairman-Jibia",	"Chairman-Kafur",	"Chairman-Kaita",	"Chairman-Kankara",	"Chairman-Kankia",	"Chairman-Katsina",
			"Chairman-Kurfi",	"Chairman-Kusada",	"Chairman-Mai-Adua",	"Chairman-Malumfashi",	"Chairman-Mani",	"Chairman-Mashi",
			"Chairman-Matazu",	"Chairman-Musawa",	"Chairman-Rimi",	"Chairman-Sabuwa",	"Chairman-Safana",	"Chairman-Sandamu",	"Chairman-Zango",
			"Chairman-Aleiro",	"Chairman-Arewa-Dandi",	"Chairman-Argungu",	"Chairman-Augie",	"Chairman-Bagudo",	"Chairman-Birnin-Kebbi",
			"Chairman-Bunza",	"Chairman-Dandi",	"Chairman-Fakai",	"Chairman-Gwandu",	"Chairman-Jega",	"Chairman-Kalgo",	"Chairman-Koko/Besse",
			"Chairman-Maiyama",	"Chairman-Ngaski",	"Chairman-Sakaba",	"Chairman-Shanga",	"Chairman-Suru",	"Chairman-Wasagu/Danko",
			"Chairman-Yauri",	"Chairman-Zuru",	"Chairman-Adavi",	"Chairman-Ajaokuta",	"Chairman-Ankpa",	"Chairman-Bassa",	"Chairman-Dekina",
			"Chairman-Ibaji",	"Chairman-Idah",	"Chairman-Igalamela-Odolu",	"Chairman-Ijumu",	"Chairman-Kabba/Bunu",	"Chairman-Kogi",
			"Chairman-Lokoja",	"Chairman-Mopa-Muro",	"Chairman-Ofu",	"Chairman-Ogori/Magongo",	"Chairman-Okehi",	"Chairman-Okene",
			"Chairman-Olamaboro",	"Chairman-Omala",	"Chairman-Yagba-East",	"Chairman-Yagba-West",	"Chairman-Asa",	"Chairman-Baruten",	"Chairman-Edu",
			"Chairman-Ekiti",	"Chairman-Ifelodun",	"Chairman-Ilorin-East",	"Chairman-Ilorin-South",	"Chairman-Ilorin-West",	"Chairman-Irepodun",
			"Chairman-Isin",	"Chairman-Kaiama",	"Chairman-Moro",	"Chairman-Offa",	"Chairman-Oke-Ero",	"Chairman-Oyun",	"Chairman-Pategi",
			"Chairman-Agege",	"Chairman-Ajeromi-Ifelodun",	"Chairman-Alimosho",	"Chairman-Amuwo-Odofin",	"Chairman-Apapa",	"Chairman-Badagry",
			"Chairman-Epe",	"Chairman-Eti-Osa",	"Chairman-Ibeju-Lekki",	"Chairman-Ifako-Ijaiye",	"Chairman-Ikeja",	"Chairman-Ikorodu",
			"Chairman-Kosofe",	"Chairman-Lagos-Island",	"Chairman-Lagos-Mainland",	"Chairman-Mushin",	"Chairman-Ojo",	"Chairman-Oshodi-Isolo",
			"Chairman-Shomolu",	"Chairman-Surulere",	"Chairman-Akwanga",	"Chairman-Awe",	"Chairman-Doma",	"Chairman-Karu",	"Chairman-Keana",
			"Chairman-Keffi",	"Chairman-Kokona",	"Chairman-Lafia",	"Chairman-Nasarawa",	"Chairman-Nasarawa-Egon",	"Chairman-Obi",	"Chairman-Toto",
			"Chairman-Wamba",	"Chairman-Agaie",	"Chairman-Agwara",	"Chairman-Bida",	"Chairman-Borgu",	"Chairman-Bosso",	"Chairman-Chanchaga",
			"Chairman-Edati",	"Chairman-Gbako",	"Chairman-Gurara",	"Chairman-Katcha",	"Chairman-Kontagora",	"Chairman-Lapai",	"Chairman-Lavun",
			"Chairman-Magama",	"Chairman-Mariga",	"Chairman-Mashegu",	"Chairman-Mokwa",	"Chairman-Moya",	"Chairman-Paikoro",	"Chairman-Rafi",
			"Chairman-Rijau",	"Chairman-Shiroro",	"Chairman-Suleja",	"Chairman-Tafa",	"Chairman-Wushishi",	"Chairman-Abeokuta-North",
			"Chairman-Abeokuta-South",	"Chairman-Ado-Odo/Ota",	"Chairman-Egbado-North",	"Chairman-Egbado-South",	"Chairman-Ewekoro",	"Chairman-Ifo",
			"Chairman-Ijebu-East",	"Chairman-Ijebu-North",	"Chairman-Ijebu-North-East",	"Chairman-Ijebu-Ode",	"Chairman-Ikenne",
			"Chairman-Imeko-Afon",	"Chairman-Ipokia",	"Chairman-Obafemi-Owode",	"Chairman-Odeda",	"Chairman-Odogbolu",	"Chairman-Ogun-Waterside",
			"Chairman-Remo-North",	"Chairman-Shagamu",	"Chairman-Akoko-North-East",	"Chairman-Akoko-North-West",	"Chairman-Akoko-South-West",
			"Chairman-Akoko-South-East",	"Chairman-Akure-North",	"Chairman-Akure-South",	"Chairman-Ese-Odo",	"Chairman-Idanre",	"Chairman-Ifedore",
			"Chairman-Ilaje",	"Chairman-Ile-Oluji/Okeigbo",	"Chairman-Irele",	"Chairman-Odigbo",	"Chairman-Okitipupa",	"Chairman-Ondo-East",
			"Chairman-Ondo-West",	"Chairman-Ose",	"Chairman-Owo",	"Chairman-Atakunmosa-East",	"Chairman-Atakunmosa-West",	"Chairman-Aiyedaade",
			"Chairman-Aiyedire",	"Chairman-Boluwaduro",	"Chairman-Boripe",	"Chairman-Ede-North",	"Chairman-Ede-South",	"Chairman-Ife-Central",
			"Chairman-Ife-East",	"Chairman-Ife-North",	"Chairman-Ife-South",	"Chairman-Egbedore",	"Chairman-Ejigbo",	"Chairman-Ifedayo",
			"Chairman-Ifelodun",	"Chairman-Ila",	"Chairman-Ilesa-East",	"Chairman-Ilesa-West",	"Chairman-Irepodun",	"Chairman-Irewole",
			"Chairman-Isokan",	"Chairman-Iwo",	"Chairman-Obokun",	"Chairman-Odo-Otin",	"Chairman-Ola-Oluwa",	"Chairman-Olorunda",
			"Chairman-Oriade",	"Chairman-Orolu",	"Chairman-Osogbo",	"Chairman-Afijio",	"Chairman-Akinyele",	"Chairman-Atiba",	"Chairman-Atisbo",
			"Chairman-Egbeda",	"Chairman-Ibadan-North",	"Chairman-Ibadan-North-East",	"Chairman-Ibadan-North-West",	"Chairman-Ibadan-South-East",
			"Chairman-Ibadan-South-West",	"Chairman-Ibarapa-Central",	"Chairman-Ibarapa-East",	"Chairman-Ibarapa-North",	"Chairman-Ido",
			"Chairman-Irepo",	"Chairman-Iseyin",	"Chairman-Itesiwaju",	"Chairman-Iwajowa",	"Chairman-Kajola",	"Chairman-Lagelu",
			"Chairman-Ogbomosho-North",	"Chairman-Ogbomosho-South",	"Chairman-Ogo-Oluwa",	"Chairman-Olorunsogo",	"Chairman-Oluyole",
			"Chairman-Ona-Ara",	"Chairman-Orelope",	"Chairman-Ori-Ire",	"Chairman-Oyo",	"Chairman-Oyo-East",	"Chairman-Saki-East",
			"Chairman-Saki-West",	"Chairman-Surulere",	"Chairman-Bokkos",	"Chairman-Barkin-Ladi",	"Chairman-Bassa",	"Chairman-Jos-East",
			"Chairman-Jos-North",	"Chairman-Jos-South",	"Chairman-Kanam",	"Chairman-Kanke",	"Chairman-Langtang-South",	"Chairman-Langtang-North",
			"Chairman-Mangu",	"Chairman-Mikang",	"Chairman-Pankshin",	"Chairman-Qua-an-Pan",	"Chairman-Riyom",	"Chairman-Shendam",	"Chairman-Wase",
			"Chairman-Abua/Odual",	"Chairman-Ahoada-East",	"Chairman-Ahoada-West",	"Chairman-Akuku-Toru",	"Chairman-Andoni",	"Chairman-Asari-Toru",
			"Chairman-Bonny",	"Chairman-Degema",	"Chairman-Eleme",	"Chairman-Emuoha",	"Chairman-Etche",	"Chairman-Gokana",	"Chairman-Ikwerre",
			"Chairman-Khana",	"Chairman-Obio/Akpor",	"Chairman-Ogba/Egbema/Ndoni",	"Chairman-Ogu/Bolo",	"Chairman-Okrika",	"Chairman-Omuma",
			"Chairman-Opobo/Nkoro",	"Chairman-Oyigbo",	"Chairman-Port-Harcourt",	"Chairman-Tai",	"Chairman-Binji",	"Chairman-Bodinga",
			"Chairman-Dange-Shuni",	"Chairman-Gada",	"Chairman-Goronyo",	"Chairman-Gudu",	"Chairman-Gwadabawa",	"Chairman-Illela",
			"Chairman-Isa",	"Chairman-Kebbe",	"Chairman-Kware",	"Chairman-Rabah",	"Chairman-Sabon-Birni",	"Chairman-Shagari",	"Chairman-Silame",
			"Chairman-Sokoto-North",	"Chairman-Sokoto-South",	"Chairman-Tambuwal",	"Chairman-Tangaza",	"Chairman-Tureta",	"Chairman-Wamako",
			"Chairman-Wurno",	"Chairman-Yabo",	"Chairman-Ardo-Kola",	"Chairman-Bali",	"Chairman-Donga",	"Chairman-Gashaka",	"Chairman-Gassol",
			"Chairman-Ibi",	"Chairman-Jalingo",	"Chairman-Karim-Lamido",	"Chairman-Kumi",	"Chairman-Lau",	"Chairman-Sardauna",	"Chairman-Takum",
			"Chairman-Ussa",	"Chairman-Wukari",	"Chairman-Yorro",	"Chairman-Zing",	"Chairman-Bade",	"Chairman-Bursari",	"Chairman-Damaturu",
			"Chairman-Fika",	"Chairman-Fune",	"Chairman-Geidam",	"Chairman-Gujba",	"Chairman-Gulani",	"Chairman-Jakusko",	"Chairman-Karasuwa",
			"Chairman-Machina",	"Chairman-Nangere",	"Chairman-Nguru",	"Chairman-Potiskum",	"Chairman-Tarmuwa",	"Chairman-Yunusari",
			"Chairman-Yusufari",	"Chairman-Anka",	"Chairman-Bakura",	"Chairman-Birnin-Magaji/Kiyaw",	"Chairman-Bukkuyum",	"Chairman-Bungudu",
			"Chairman-Gummi",	"Chairman-Gusau",	"Chairman-Kaura-Namoda",	"Chairman-Maradun",	"Chairman-Maru",	"Chairman-Shinkafi",
			"Chairman-Talata-Mafara",	"Chairman-Chafe",	"Chairman-Zurmi"
		]
	}
]

const Candidacy =[
  {
    Office:"President-Nigeria",
    Candidates:[
			"-- Select Candidates --","Abiodun Olujimi-PDP","Badaru Abubakar-APC","Adebayo Osinowo-APGA","Lateef Adegbite-SDP","Adedeji Adeleke-LP",
			"Prince Julius Adewale-UDP","Adelusi Adeluyi-KOWA","Solomon Olamilekan Adeola-AP"
		]
  },
	{
    Office:"Governor-Abia",
    Candidates:[
			"-- Select Candidates --","Godwin Ogbaga-PDP","Chigozie Ogbu-APC","Osita Ogbu-APGA","Chris Ogiemwonyi-LP","Ogor Okuweh-UDP","Oluwole Oke-KOWA",
			"Edward Ikem Okeke-AP","Doyin Okupe-APGA","Alhaji Alabi Hassan Olajoku-ADP","Ali Olanusi-UDP","Funmilayo Olayinka-UPP",
			"Folake Olunloyo-PPA","Mike Omotosho-PPN","Emmanuel Onwe-PPC","D. K. Onwenu-PDM","Nkeiruka Onyejeocha-PPN","Stephen Oru-NNPP",
			"Oshodi Tapa-MPPP","Kayode Otitoju-ID","Adegboyega Oyetola-HDP","Asiwaju Yinka Mafe-DPC","Salisu Abubakar Maikasuwa-DPP",
			"Oluwaseyi Makinde-FDP","Louis Mbanefo-AD","Sebastian Okechukwu Mezu-ACPN","Michael Ajegbo-APA","Danladi Mohammed-ACDP",
			"Janet Nwadiogo Mokelu-APDA","Tony Momoh-AP","Patrick Abba Moro-AAP","Najaatu Bala Muhammad-ADC"
		]
	},
	{
    Office:"Senator-Abia-North",
		Candidates:[
			"-- Select Candidates --","Godwin Ogbaga-PDP","Chigozie Ogbu-APC","Osita Ogbu-APGA","Chris Ogiemwonyi-LP","Ogor Okuweh-UDP","Oluwole Oke-KOWA",
			"Edward Ikem Okeke-AP","Doyin Okupe-APGA","Alhaji Alabi Hassan Olajoku-ADP","Ali Olanusi-UDP","Funmilayo Olayinka-UPP",
			"Folake Olunloyo-PPA","Mike Omotosho-PPN","Emmanuel Onwe-PPC","D. K. Onwenu-PDM","Nkeiruka Onyejeocha-PPN","Stephen Oru-NNPP",
			"Oshodi Tapa-MPPP","Kayode Otitoju-ID","Adegboyega Oyetola-HDP","Asiwaju Yinka Mafe-DPC","Salisu Abubakar Maikasuwa-DPP",
			"Oluwaseyi Makinde-FDP","Louis Mbanefo-AD","Sebastian Okechukwu Mezu-ACPN","Michael Ajegbo-APA","Danladi Mohammed-ACDP",
			"Janet Nwadiogo Mokelu-APDA","Tony Momoh-AP","Patrick Abba Moro-AAP","Najaatu Bala Muhammad-ADC"
		]
  },
	{
    Office:"Chairman-Aba-North",
    Candidates:[
			"-- Select Candidates --","Godwin Ogbaga-PDP","Chigozie Ogbu-APC","Osita Ogbu-APGA","Chris Ogiemwonyi-LP","Ogor Okuweh-UDP","Oluwole Oke-KOWA",
			"Edward Ikem Okeke-AP","Doyin Okupe-APGA","Alhaji Alabi Hassan Olajoku-ADP","Ali Olanusi-UDP","Funmilayo Olayinka-UPP",
			"Folake Olunloyo-PPA","Mike Omotosho-PPN","Emmanuel Onwe-PPC","D. K. Onwenu-PDM","Nkeiruka Onyejeocha-PPN","Stephen Oru-NNPP",
			"Oshodi Tapa-MPPP","Kayode Otitoju-ID","Adegboyega Oyetola-HDP","Asiwaju Yinka Mafe-DPC","Salisu Abubakar Maikasuwa-DPP",
			"Oluwaseyi Makinde-FDP","Louis Mbanefo-AD","Sebastian Okechukwu Mezu-ACPN","Michael Ajegbo-APA","Danladi Mohammed-ACDP",
			"Janet Nwadiogo Mokelu-APDA","Tony Momoh-AP","Patrick Abba Moro-AAP","Najaatu Bala Muhammad-ADC"
		]
  }
]
const Parties=[
	"-- Select Party--","Accord Party (AP)"," Action Alliance Party (AA)"," Action Democratic Party (ADP)","	Advanced Congress Of Democrats Party (ACDP)",
	"Advanced Peoples Democratic Alliance (APDA)"," Advanced Democratic Congress (ADC)","	All Progressive Congress (APC)","	All Progressive Grand Alliance (APGA)",
	"Alliance for Democracy (AD)"," Allied Congress Party of Nigeria (ACPN)","African People Alliance (APA) ","Fresh Democratic Party (FDP)","Democratic Peoples Congress (DPC)",
	"Democratic Peoples Party (DPP)"," Hope Democratic Party (HDP)","Indepenedent Democrats (IDP)","	Kowa Party (KOWA)","	Labour Party (LP)",
	"Mega Progressive People Party (MPPP)","	National Conscience Party (NCP)" ,"Progressive People Alliance (PPA)"," 	People Democratic Party (PDP)",
	"New Nigeria Peoples Party (NNPP)","	People for Democratic Change (PDC) "," People Democratic Movement (PDM)","Peoples Party Of Nigeria (PPN)",
	"Social Democratic Party (SDP)","United Progressive Party (UPP)","	United Democratic Party (UDP)","Unity Party of Nigeria (UPN)"
]

// 	Create options for datalsist or select list with the first option disabled, serving as placeholder

let createOptions =(element,values) =>{
	let options=document.createElement("option");
	options.value =values[0];
	options.text = values[0];
	element.add(options);
	options.disabled=true;
	for(let i=1; i<values.length;i++){
		let options=document.createElement("option");
		options.value =values[i];
		options.text = values[i];
		element.add(options);
  }
}
//	Create options of all political offices
let merged = offices[0].Office.concat(offices[1].Office, offices[2].Office, offices[3].Office, offices[4].Office);
createOptions(document.getElementById("searchList"), merged);

//	 Create options of all types of  political offices
let selectType = document.getElementById("selectType");
createOptions(selectType, offices[0].Type.concat(offices[1].Type, offices[2].Type, offices[3].Type,offices[4].Type));

let selectOffice = document.getElementById("selectOffice");
// 	Trigger event when type of office is selected
selectType.onclick =()=>{
	// Remove all previous options
	selectOffice.options.length =0;
	selectCandidate.options.length=0;
	for(let i=0;i<offices.length;i++){
		// 	Check if a type of office is selected
		if(selectType.value===offices[i].Type[0]){
			//	Then create and display name of offices options for that particular type
			for (let j=0;j< offices[i].Office.length;j++){
				let options=document.createElement("option");
				options.value =offices[i].Office[j];
				options.text = offices[i].Office[j];
				selectOffice.add(options);
			}
		}
	}
}

let selectCandidate =document.getElementById("selectCandidate")
selectOffice.onclick =()=>{
		// Remove all previous options
	selectCandidate.options.length=0;
	for(let i=0;i<Candidacy.length;i++){
		//	Check if an office is selected
		if(selectOffice.value === Candidacy[i].Office){
			// 	then create and display candidate options for that office
			selectCandidate.options.length=0
			for(let j=0; j< Candidacy[i].Candidates.length;j++){
				let options=document.createElement("option");
				options.value =Candidacy[i].Candidates[j];
				options.text = Candidacy[i].Candidates[j];
				selectCandidate.add(options);
			}
		}
	}
}


