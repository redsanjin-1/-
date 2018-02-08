function convertToStarsArray(stars){
  var arr = [];
  var num = stars.toString().substring(0,1);
  for(let i=0;i<5;i++){
    if(i<num){
      arr.push(1)
    }else{
      arr.push(0)
    }
  }
  return arr
}

function _normalize(data){
  var movie = [];
  var self = this;
  data.map(function (item, index) {
    movie.push({
      movieId: item.id,
      title: item.title,
      average: item.rating.average,
      stars: self.convertToStarsArray(item.rating.stars),
      images: item.images.large
    })
  });
  return movie
}
module.exports={
  convertToStarsArray: convertToStarsArray,
  _normalize: _normalize
}