export default (credentials) => {

  const config = credentials

  const getSearchParams = (params) => {
    params = Object.assign({}, params, config)
    const searchParams = Object.keys(params).map(key => {
      return decodeURIComponent(key) + '=' + decodeURIComponent(params[key])
    }).join('&')
    return searchParams
  }

  return {
    searchVenues: (params) => {
      return fetch(`https://api.foursquare.com/v2/venues/search?${getSearchParams(params)}`)
        .then(res => res.json())
    },
    getVenuePhotos: (params) => {
      return fetch(`https://api.foursquare.com/v2/venues/${params.venue_id}/photos?${getSearchParams(params)}`)
        .then(res => res.json())
    }
  }
}