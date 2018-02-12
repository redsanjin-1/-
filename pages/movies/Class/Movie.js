var utils = require("../../../utils/utils.js"); 

class Movie{
  constructor(url) {
    this.url = url
  }
  requestData(calllback){
    this.callback = calllback;
    utils.http(this.url, this._normalize.bind(this))
  }
  _normalize(data) {    
    let movie ={
      title: data.title,
      country: data.countries.join(','),
      year: data.year,
      ratings_count: data.ratings_count || data.wish_count,
      comments_count: data.comments_count,
      image_post: data.images ? data.images.large : "",
      originalTitle: data.originalTitle,
      stars: {
        stars: utils.convertToStarsArray(data.rating.stars),
        average: data.rating.average
      },
      directors: data.directors,
      casts: utils.convertToCastsStr(data.casts),
      castsArr: utils.convertToCastsArr(data.casts),
      genres: data.genres.join('、'),
      summary: data.summary || '空'
    };
    this.callback(movie)
  }
}
export { Movie }