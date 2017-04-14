import axios from 'axios'

function getDigestValue(){
  return axios({
    method: 'post',
    url: 'https://devstreamlined.sharepoint.com/_api/contextinfo',
    headers: {
      "authorization": "Bearer",
      "accept": "application/json;odata=verbose"
    }
    }).then(data => {
      return JSON.parse(data.request.response).FormDigestValue.split(',')[0];

  });
}

function post(formDigestValue, title, completed){
  const item = {
    '__metadata': { 'type': 'SP.Data.To_x0020_DoListItem' },
    'Title': title,
    'Completed': 'false'
  }
  return axios({
    url: "https://devstreamlined.sharepoint.com/Kurt%20Test%20Site/_api/lists/getbytitle('To%20Do')/items",
    method: "POST",
    data: JSON.stringify(item),
    headers: {
        "accept": "application/json;odata=verbose",
        "content-type": "application/json;odata=verbose",
        "Authorization": "Bearer",
        "X-RequestDigest": formDigestValue
    }
  })
  .then(function(response) {
     return response.data
   });
}

function get(formDigestValue){
  return axios({
    url: "https://devstreamlined.sharepoint.com/Kurt%20Test%20Site/_api/lists/getbytitle('To%20Do')/items",
    method: "GET",
    headers: {
        "accept": "application/json;odata=verbose",
        "content-type": "application/json;odata=verbose",
        "Authorization": "Bearer",
        "X-RequestDigest": formDigestValue
    }
  }).then(data => {

    const formattedData = data.data.value.map(item => {
      return {
        completed: item.Completed == 'true' ? true : false ,
        date: item.Created,
        title: item.Title,
        id: item.Id
      }
    })

    return formattedData
  });
}


function complete(formDigestValue, id){
  const item = {
    '__metadata': { 'type': 'SP.Data.To_x0020_DoListItem' },
    'Completed': 'true'
  }
  axios({
    url: `https://devstreamlined.sharepoint.com/Kurt%20Test%20Site/_api/lists/getbytitle('To%20Do')/items(${id})`,
    method: "POST",
    data: JSON.stringify(item),
    headers: {
        "accept": "application/json;odata=verbose",
        "content-type": "application/json;odata=verbose",
        "Authorization": "Bearer",
        "X-RequestDigest": formDigestValue,
        "IF-MATCH": "*",
        "X-HTTP-Method":"MERGE"
    }
  });
}

function deleteItem(formDigestValue, id){
  const item = {
    '__metadata': { 'type': 'SP.Data.To_x0020_DoListItem' },
    'Completed': 'true'
  }
  axios({
    url: `https://devstreamlined.sharepoint.com/Kurt%20Test%20Site/_api/lists/getbytitle('To%20Do')/items(${id})`,
    method: "POST",
    data: JSON.stringify(item),
    headers: {
        "Authorization": "Bearer",
        "X-RequestDigest": formDigestValue,
        "IF-MATCH": "*",
        "X-HTTP-Method":"DELETE"
    }
  });
}


const sharePointService = {
  postTask: function(title){
    return getDigestValue().then(digestValue => {
      return post(digestValue, title)
    })
  },
  getTasks: function(){
    return getDigestValue().then(digestValue => {
      return get(digestValue)
    })
  },
  completeTask: function(id){
    return getDigestValue().then(digestValue => {
      return complete(digestValue, id)
    })
  },
  deleteTask: function(id){
    return getDigestValue().then(digestValue => {
      return deleteItem(digestValue, id)
    })
  }
}

export default sharePointService
