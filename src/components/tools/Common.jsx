export const geneManiaOrganisms = [
  {
    id: 'arabidopsis-thaliana',
    name: 'Arabidopsis thaliana',
    image: '/images/organisms/plant-32.svg',
  },
  {
    id: 'caenorhabditis-elegans',
    name: 'Caenorhabditis elegans',
    image: '/images/organisms/worm-32.svg',
  },
  {
    id: 'danio-rerio',
    name: 'Danio rerio',
    image: '/images/organisms/fish-32.svg',
  },
  {
    id: 'drosophila-melanogaster',
    name: 'Drosophila melanogaster',
    image: '/images/organisms/fly-32.svg',
  },
  {
    id: 'escherichia-coli',
    name: 'Escherichia coli',
    image: '/images/organisms/bacteria-32.svg',
  },
  {
    id: 'homo-sapiens',
    name: 'Homo sapiens',
    image: '/images/organisms/human-32.svg',
  },
  {
    id: 'mus-musculus',
    name: 'Mus musculus',
    image: '/images/organisms/mouse-32.svg',
  },
  {
    id: 'rattus-norvegicus',
    name: 'Rattus norvegicus',
    image: '/images/organisms/rat-32.svg',
  },
  {
    id: 'saccharomyces-cerevisiae',
    name: 'Saccharomyces cerevisiae',
    image: '/images/organisms/yeast-32.svg',
  },
]

export const parseGeneList = (text) => {
  if (text.length > 0) {
    let parts = text.split(/[\s,]+/);
    return parts.filter(el => el.length > 0);
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

