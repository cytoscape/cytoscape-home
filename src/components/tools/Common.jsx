export const geneManiaOrganisms = [
  {
    id: 1,
    name: 'Arabidopsis thaliana',
    image: '/images/organisms/plant-32.svg',
    taxon: 3702,
  },
  {
    id: 2,
    name: 'Caenorhabditis elegans',
    image: '/images/organisms/worm-32.svg',
    taxon: 6239,
  },
  {
    id: 8,
    name: 'Danio rerio',
    image: '/images/organisms/fish-32.svg',
    taxon: 7955,
  },
  {
    id: 3,
    name: 'Drosophila melanogaster',
    image: '/images/organisms/fly-32.svg',
    taxon: 7227,
  },
  {
    id: 9,
    name: 'Escherichia coli',
    image: '/images/organisms/bacteria-32.svg',
    taxon: 511145, //83333
  },
  {
    id: 4,
    name: 'Homo sapiens',
    image: '/images/organisms/human-32.svg',
    taxon: 9606,
  },
  {
    id: 5,
    name: 'Mus musculus',
    image: '/images/organisms/mouse-32.svg',
    taxon: 10090,
  },
  {
    id: 7,
    name: 'Rattus norvegicus',
    image: '/images/organisms/rat-32.svg',
    taxon: 10116,
  },
  {
    id: 6,
    name: 'Saccharomyces cerevisiae',
    image: '/images/organisms/yeast-32.svg',
    taxon: 559292, //4932
  },
]

export const parseGeneList = (text) => {
  if (text.length > 0) {
    let parts = text.split(/[\s,]+/);
    parts = parts.filter(el => el.length > 0);
    return [...new Set(parts)]
  }
  return [];
}

export const searchNDEx = (evt) =>  {
  const val = evt.target.elements.search.value.trim();
  if (val.length > 0) {
    const parts = parseGeneList(val);
    if (parts.length > 0) {
      const genes = parts.join('%2C');
      const url = `https://www.ndexbio.org/iquery/?genes=${genes}`;
      window.open(url, '_blank').focus();
    }
  }
  evt.preventDefault();
}

export const searchGeneMania = (orgId, searchText) =>  {
  if (orgId && searchText && searchText.length > 0) {
    const parts = parseGeneList(searchText);
    if (parts.length > 0) {
      const genes = parts.join('/');
      const url = `https://genemania.org/search/${orgId}/${genes}`;
      window.open(url, '_blank').focus();
    }
  }
}

export const searchWikiPathways = (evt) =>  {
  const val = evt.target.elements.search.value.trim();
  if (val.length > 0) {
    const parts = parseGeneList(val);
    if (parts.length > 0) {
      const genes = parts.join('%20');
      const url = `https://www.wikipathways.org/search.html?query=${genes}`;
      window.open(url, '_blank').focus();
    }
  }
  evt.preventDefault();
}

