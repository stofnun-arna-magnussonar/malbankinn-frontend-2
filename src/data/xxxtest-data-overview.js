const testData = {
    'malheildirOgProfunargogn': {
        'name': 'Málheildir og prófunargögn',
        'categories': ['trjabankar', 'markadarEinmalaMalheildir']
    },
    'hugbunadurOgLikon': {
        'name': 'Hugbúnaður og líkön',
        'categories': ['tilreidararMarkararLemmoldThattarar']
    }
}

const categories = {
    'trjabankar': {
        'name': 'Trjábankar',
        'description': 'Trjábanki er textasafn sem er þáttað og hefur upplýsingar um setningargerðir og setningarliði. Íslensku trjábankarnir eru greindur samkvæmt þáttunarskema sögulegu ensku Penn-trjábankanna (Penn Parsed Corpora of Historical English; PPCHE) en sumt hefur þó verið aðlagað að íslenskri setningargerð. Bæði Sögulegi íslenski trjábankinn og Sögulegi færeyski trjábankinn voru handleiðréttir en Samtímalegi íslenski trjábankinn og Taugavélþáttaði IcePaHC-trjábankinn voru hins vegar vélþáttaðir með íslensku taugaþáttunarpípunni IceNeuralParsingPipeline. GreynirCorpus inniheldur 10 milljónir málsgreina, að mestu úr fréttatextum frá 2015- 2021, og var markaður með Greyni frá Miðeind og nýtir sambærilegt mörkunarskema og fyrrnefndu trjábankarnir. Hluti hans, gullstaðallinn, hefur verið handleiðréttur. Þeim hluta var varpað yfir í venslatrébankann UD GreynirCorpus með UD-varpara fyrir GreyniCorpus. Nánar má lesa um venslatrébanka á https://universaldependencies.org.',
        'subcategories': [
            {
                'name': 'Sögulegir trjábankar',
                'items': ['IcePaHC']
            },
            {
                'name': 'Samtímalegir trjábankar',
                'items': ['IceConTree']
            }
        ]
    },
    'markadarEinmalaMalheildir': {
        'name': 'Markaðar einmálamálheildir',
        'description': 'Markaðar málheildir geta verið af ýmsu tagi. Oft er um að ræða að textasafn hefur verið tilreitt (skipt upp í setningar og tóka), markað málfræðilega (hver tóki er markaður með textastreng sem segir til um t.d. orðflokk, kyn, fall o.s.frv.) og lemmað (uppflettimynd orðs fundin, t.d. \'hestur\' fyrir \'hests\').',
        'subcategories': {
            'malheildir': {
                'name': 'Málheildir',
                'items': ['risamalheildin', 'risamalheildin-json']
            },
            'gullstadlarOgProfunarsett': {
                'name': 'Gullstaðlar og prófunarsett',
                'items': ['rmh-profunarsett']
            }
        }
    },
    'tilreidararMarkararLemmoldThattarar': {
        'name': 'Tilreiðarar, markarar, lemmöld og þáttarar',
        'description': 'Málfræðilegu markararnir ABL-tagger og CombiTagger lesa inn texta og marka hvern tóka með textatreng sem segir til um orðflokk og t.d. fall, kyn og tíð, eftir því sem við á.',
        'subcategories': {
            'tilreidarar': {
                'name': 'Tilreiðarar',
                'items': ['tokenizer']
            },
            'markarar': {
                'name': 'Markarar',
                'items': ['ABL-tagger', 'CombiTagger']
            },
            'lemmold': {
                'name': 'Lemmöld',
                'items': ['ABL-lemmatizer']
            },
            'thattarar': {
                'name': 'Þáttarar',
                'items': ['IceParser']
            }
        }

    }
}

const items = {
    'IceConTree': {
        'name': 'IceConTree',
        'isTool': false,
        'isData': true,
        'links': [],
        'infoUrl': 'https://linguist.is/wiki/index.php',
        'searchUrl': null,
    },
    'IcePaHC': {
        'name': 'Sögulegi íslenski trjábankinn (IcePaHC)',
        'links': [],
        'infoUrl': 'https://linguist.is/wiki/index.php',
        'searchUrl': null

    },
    'risamalheildin': {
        'name': 'Risamálheildin',
        'isTool': false,
        'isData': true,
        'links': [
            {
                'name': '2022',
                'url': 'http://hdl.handle.net/20.500.12537/254',
            },
            {
                'name': '2021',
                'url': 'http://hdl.handle.net/20.500.12537/192',
            },
            {
                'name': 'HuggingFace',
                'url': 'https://huggingface.co/datasets/arnastofnun/IGC-2022-1'
            }
            
        ],
        'infoUrl': 'http://igc.arnastofnun.is/is/index.html',
        'searchUrl': 'https://malheildir.arnastofnun.is/'
    },
    'risamalheildin-json': {
        'name': 'Risamálheildin á JSON-sniði',
        'isTool': false,
        'isData': true,
        'links': [
            {
                'name': '2022',
                'url': 'http://hdl.handle.net/20.500.12537/334'
            }
        ],
        'infoUrl': null,
        'searchUrl': null
    },
    'rmh-profunarsett': {
        'name': 'RMH - prófunarsett',
        'isTool': false,
        'isData': true,
        'links': [ {
            'name': '20.09',
            'url': 'http://hdl.handle.net/20.500.12537/51'
        }
        ],
        'infoUrl': null,
        'searchUrl': null
    },
    'tokenizer': {
        'name': 'Tokenizer',
        'isTool': true,
        'isData': false,
        'links': [],
        'infoUrl': 'https://linguist.is/wiki/index.php',
        'searchUrl': null
    },
    'ABL-tagger': {
        'name': 'ABL-tagger',
        'isTool': true,
        'isData': false,
        'links': [],
        'infoUrl': 'https://linguist.is/wiki/index.php',
        'searchUrl': null
    },
    'CombiTagger': {
        'name': 'CombiTagger',
        'isTool': true,
        'isData': false,
        'links': [],
        'infoUrl': 'https://linguist.is/wiki/index.php',
        'searchUrl': null
    },
    'ABL-lemmatizer': {
        'name': 'ABL-lemmatizer',
        'isTool': true,
        'isData': false,
        'links': [],
        'infoUrl': 'https://linguist.is/wiki/index.php',
        'searchUrl': null
    },
    'IceParser': {
        'name': 'IceParser',
        'isTool': true,
        'isData': false,
        'links': [],
        'infoUrl': 'https://linguist.is/wiki/index.php',
        'searchUrl': null
    }

}

export { testData, categories, items }