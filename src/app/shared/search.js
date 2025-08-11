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
      return this.pathwaysSearch.search(query, { fields: ['title', 'description', 'keywords', 'annotations'], prefix: true })
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
        "title"      : "FAS pathway and stress induction of HSP regulation",
        "wpid"       : "WP511",
        "description": "This pathway describes the Fas induced apoptosis and interplay with Hsp27 in response to stress.  More info: [BioCarta](http://www.biocarta.com/pathfiles/h_hsp27Pathway.asp).",
        "organisms"  : "Danio rerio",
        "common"     : "Zebrafish",
        "keywords"   : "Ceramide, Glutathione, LOC100334486, Phosphate, apaf1, arhgdig, casp6, casp7, casp8, casp8l2, casp9, cflar, cycsb, daxx, dffa, dffb, fadd, faf1, fas, faslg, hspb1, jun, lmna, lmnb1, lmnb2, map2k4a, map3k7, mapk8a, mapkapk2a, mapkapk3, pak1, pak2a, parp1, rb1, ripk2, spna2, wu:fa96e12",
        "annotations": "stress response pathway, FasL mediated signaling pathway",
        "url"        : "/pathways/WP511.html",
        "last-edited": "2025-08-10"
        }
    */
    const pathways = await fetch('https://www.wikipathways.org/search.json')
      .then(response => response.json())
      .then(data => {
        console.log('Loaded pathways:', data)
        // Convert the data to the format expected by MiniSearch
        return data.map((item) => ({
          id: item.wpid,
          title: item.title || '',
          description: item.description || '',
          organisms: item.organisms ? item.organisms.split(',').map(o => o.trim()) : [],
          keywords: item.keywords ? item.keywords.split(',').map(k => k.trim()) : [],
          annotations: item.annotations ? item.annotations.split(',').map(a => a.trim()) : [],
          url: item.url || '',
        }))
      })
      .catch(error => {
        console.error('Error loading pathways:', error)
        return []
      })

    if (!pathways || pathways.length === 0) {
      return
    }

    this.pathwaysSearch = new MiniSearch({
      fields: ['title', 'description', 'keywords', 'annotations'],
      storeFields: ['id', 'url', 'title', 'organisms', 'description', 'keywords', 'annotations'],
      searchOptions: {
        boost: { title: 2, keywords: 2, annotations: 2 },
        fuzzy: 0.0,
        prefix: true,
        processTerm: (term) => stopWords.has(term.toLowerCase()) ? null : term.toLowerCase()
      },
    })

    this.pathwaysSearch.addAll(pathways)
  }
}