import ReactResource from 'react-resource';









const sharePointService = {
  getTasks: function(){
    const promise = new ReactResource('https://devstreamlined.sharepoint.com/sites/ToDoList/_vti_bin/listdata.svc/Tasks').get()
    
    return promise
  }
}

export default sharePointService
