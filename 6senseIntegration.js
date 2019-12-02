function _6senseIntegration(){

    if(window._storagePopulated){

    var _6sense = JSON.parse(window.localStorage._6senseCompanyDetails);
    
    var new_6senseData = Object.keys(_6sense).reduce(function(inTransitObj, currentKey, idx, list){
      var newKey = currentKey[0].toUpperCase() + currentKey.slice(1, currentKey.length);
      inTransitObj['_6sense' + newKey] = _6sense[currentKey];
      return inTransitObj;
    }, {});
    
    var new_6senseDataCompany = Object.keys(new_6senseData['_6senseCompany']).reduce(function(inTransitObj, currentKey, idx, list){
        var newKey = currentKey[0].toUpperCase() + currentKey.slice(1, currentKey.length);
        inTransitObj['_6sense' + newKey] = new_6senseData['_6senseCompany'][currentKey];
        return inTransitObj;
      }, {});
    
    window.optimizely = window.optimizely || [];
    window["optimizely"].push({
        "type": "user",
        "attributes": new_6senseDataCompany    
    });
    }
    else{
        console.log('6sense has not loaded yet');
    }
    }
    
    try{
        _6senseIntegration();
    } catch(error){
        console.log('error');
    }


function pollForObject (pollExpTime,pollInterval){
    var startTime = new Date().getTime();
    var lookForObject = setInterval(function() {
       
    if (new Date().getTime() - startTime > pollExpTime) {
       console.log('poll for object has expired');
        clearInterval(lookForObject);
    } else {
        console.log('looking for object');
        if(window._storagePopulated){
            console.log('_storagePopulated is true');
            _6senseIntegration();
            clearInterval(lookForObject);
            window["optimizely"].push({
              "type": "activate"
            });
            }           
        }
    }, pollInterval);
}    

pollForObject(5000,50);

