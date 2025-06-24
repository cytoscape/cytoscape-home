import EventEmitter from 'eventemitter3'
import MiniSearch from 'minisearch'


export class SearchEngine {

  constructor(bus) {
    console.log('Initializing SearchEngine...')
    this.bus = bus || new EventEmitter()
    this.tutorialsReady = false

    Promise.all([
      this._indexTutorials(),
    ]).then(() => {
      this.tutorialsReady = true
      this.bus.emit('tutorialsIndexed')
    })
  }

  isTutorialsIndexed() {
    return this.tutorialsReady;
  }

  searchTutorials(query) {
    if (!this.isTutorialsIndexed()) {
      throw "The tutorials haven't been fetched yet!";
    }
    if (query && query.length > 0) {
      return this.tutorialsSearch.search(query, { fields: ['title', 'text'], prefix: true });
    }
    return [];
  }

  async _indexTutorials() {
    console.log('Indexing tutorials...')

    const tutorials = await fetch('/tutorials/protocols/enrichmentmap-pipeline.json')
      .then(response => response.json())
      .then(data => {
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
    
    console.log('Loaded tutorials:', tutorials)

    if (!tutorials || tutorials.length === 0) {
      return
    }

    // Common stop words to ignore in search
    const stopWords = new Set([
      'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from',
      'has', 'have', 'if', 'in', 'is', 'it', 'of', 'on', 'or', 'that',
      'the', 'this', 'to', 'with'
    ])
console.log('-------- Creating MiniSearch instance...')
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
}