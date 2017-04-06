const days = {
  0: "Mon",
  1: "Tue",
  2: "Wed",
  3: "Thu",
  4: "Fri",
  5: "Sat",
  6: "Sun"
}

const months = {
  0: "Jan",
  1: "Feb",
  2: "Mar",
  3: "Apr",
  4: "May",
  5: "June",
  6: "July",
  7: "Aug",
  8: "Sep",
  9: "Oct",
  10: "Nov",
  11: "Dec"
}


const utils = {
  getCurrentDate: function(){

    const date = new Date();

    const AMPM = date.getHours() < 12 ? 'AM' : 'PM';
    return `${months[date.getMonth()]} ${date.getDay()} ${date.getHours()}:${date.getMinutes()} ${AMPM}`
  },
  createdDate: function(timestamp){
    const formattedTS = timestamp.replace(/\D/g, '')    
    const date = new Date(Number(formattedTS));
    const AMPM = date.getHours() < 12 ? 'AM' : 'PM';
    return `${months[date.getMonth()]} ${date.getDay()} ${date.getHours()}:${date.getMinutes()} ${AMPM}`
  }
}
export default utils
