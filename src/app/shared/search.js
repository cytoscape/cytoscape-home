import EventEmitter from 'eventemitter3'
import MiniSearch from 'minisearch'


/* Common stop words to ignore in search */
const stopWords = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from',
  'has', 'have', 'if', 'in', 'is', 'it', 'of', 'on', 'or', 'that',
  'the', 'this', 'to', 'with'
])


export class SearchEngine {

  constructor(bus) {
    console.log('Initializing SearchEngine...')
    this.bus = bus || new EventEmitter()
    this.searchReady = false

    Promise.all([
      this._indexTutorials(),
      this._indexPathways(),
    ]).then(() => {
      this.searchReady = true
      this.bus.emit('searchReady')
    })
  }

  isSearchReady() {
    return this.searchReady
  }

  searchTutorials(query) {
    if (!this.isSearchReady()) {
      throw "The tutorials haven't been fetched yet!"
    }
    if (query && query.length > 0) {
      return this.tutorialsSearch.search(query, { fields: ['title', 'text'], prefix: true })
    }
    return []
  }

  searchPathways(query) {
    if (!this.isSearchReady()) {
      throw "The pathways haven't been fetched yet!"
    }
    if (query && query.length > 0) {
      return this.pathwaysSearch.search(query, { fields: ['name', 'description', 'datanodes', 'annotations'], prefix: true })
    }
    return []
  }

  async _indexTutorials() {
    console.log('Indexing tutorials...')

    const tutorials = await fetch('/tutorials/protocols/enrichmentmap-pipeline.json')
      .then(response => response.json())
      .then(data => {
        console.log('Loaded tutorials:', data.length)
        // Convert the data to the format expected by MiniSearch
        return data.map((item, index) => ({
          id: index,
          section: item.id,
          parent: item.parentId || null,
          title: item.title || '',
          text: item.text || '',
        }))
      })
      .catch(error => {
        console.error('Error loading tutorials:', error)
        return []
      })
    
    if (!tutorials || tutorials.length === 0) {
      return
    }

    this.tutorialsSearch = new MiniSearch({
      fields: ['title', 'text'],
      storeFields: ['section', 'parent', 'title', 'text'],
      searchOptions: {
        boost: { title: 2, text: 1 },
        fuzzy: 0.0,
        prefix: true,
        processTerm: (term) => stopWords.has(term.toLowerCase()) ? null : term.toLowerCase()
      },
    })

    this.tutorialsSearch.addAll(tutorials)
    this.bus.emit('tutorialsIndexed')
  }

  async _indexPathways() {
    console.log('Indexing pathways...')

    /*
      Example pathway data from the WikiPathways API:
      {
        "id": "WP1",
        "url": "https://www.wikipathways.org/instance/WP1",
        "name": "Statin pathway",
        "species": "Mus musculus",
        "revision": "2025-05-22",
        "authors": "Nsalomonis, MaintBot, Khanspers, BruceConklin, TestUser, AlexanderPico, Thomas, Mkutmon, Andra, Egonw, Ddigles, Eweitz",
        "description": "Statins inhibit endogenous cholesterol production by competitive inhibition of HMG-CoA reductase (HMGCR), the enzyme that catalyzes conversion of HMG-CoA to mevalonate, an early rate-limiting step ...",
        "datanodes"     : "Abca1, Acetyl-CoA, Apoa1, Apoa4, Apoc1, Apoc2, Apoc3, Apoe, Cetp, Cholesterol, Cholesterol ester, Cholic acid, Cyp7a1, Dgat1, Fatty acid, Hmgcr, Lcat, Ldlr, Lipc, Lpl, Lrp1, Mttp, Phospholipid, Pltp, Scarb1, Soat1, Statin, Triglycerides",
        "annotations"     : "hepatocyte, cardiovascular system disease, statin drug pathway, hypercholesterolemia pathway",
        "citedIn": ""
        }
    */
    const pathways = await fetch('https://www.wikipathways.org/json/findPathwaysByText.json')
      .then(response => response.json())
      .then(data => {
        console.log('Loaded pathways:', data['pathwayInfo'])
        return data['pathwayInfo']
      })
      .catch(error => {
        console.error('Error loading pathways:', error)
        return []
      })

    if (!pathways || pathways.length === 0) {
      return
    }

    this.pathwaysSearch = new MiniSearch({
      fields: ['id', 'name', 'species', 'description', 'datanodes', 'annotations'],
      storeFields: ['id', 'url', 'name', 'species', 'description', 'datanodes', 'annotations'],
      searchOptions: {
        boost: { name: 2, annotations: 2 },
        fuzzy: 0.0,
        prefix: true,
        processTerm: (term) => stopWords.has(term.toLowerCase()) ? null : term.toLowerCase()
      },
    })

    this.pathwaysSearch.addAll(pathways)
  }
}