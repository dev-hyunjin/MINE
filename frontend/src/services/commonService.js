export const titleCheck = (type) => {
    console.log("type ::: ", type)
    const recommendTile = ["당신을 위한 추천 경매!", "방금 등록된 상품! ", "실시간 인기상품!"]
    if(type == "recommend"){
      return recommendTile[0]
    }else if(type == "recent"){
      return recommendTile[1]
    }else{
      return recommendTile[2]
    }
  }
  export const getTimeAgo = (time) => {
    const now = new Date().getTime();
    const diff = now - new Date(time).getTime();
    const year = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
    const month = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
    const day = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hour = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minute = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (year > 0) {
      return `${year}년 전`;
    } else if (month > 0) {
      return `${month}개월 전`;
    } else if (day > 0) {
      return `${day}일 전`;
    } else if (hour > 0) {
      return `${hour}시간 전`;
    } else if (minute > 0) {
      return `${minute}분 전`;
    } else {
      return "지금";
    }
  };