// window.onload = async ()=>{
    // makeEventListeners();
    // await emailChecker();
// } 

var savedMainEmail = 'sammuel@gmail.com';
async function emailChecker(){
    //checks!
    //does email exist
    //no? make one!
    await pullEmailGetUID(savedMainEmail);
    if(foundMe ==false){
        pushToEmail(2, savedMainEmail);
    }else{
        console.log('savedUIDstr', savedUIDstr);
    }
}


function makeEventListeners(){
    //attach listeners where they are supposed to go
    $('.saveButton').on("click", eventPressSaveButton);


}


function eventPressSaveButton(){
    //event for the front page button
    if($('.inputYouTubeData').val()!=undefined){
        saveLyricData($('.inputYouTubeData').val(), 0, "");
    }else{
        console.log('A valued must be provided!');
    }

    
    addToFirebaseBasedOnUID('list1', myJSONLyricData.stringMe());
    
}

async function maintainArrayListOfNumberTracking(){
    //creating the tracking list
    await pullEmailGetUID(savedMainEmail);
    pullDataBasedOnUID();

    if(wholeDocDataPull[0]['arrayOfListNumbers']==undefined){
        // arrayTrackJSON = new JSON_Instance();
        // arrayTrackJSON.addObj([['listNumbers',[1]]])

    }else{
        var tmpStoreOfArrayList = wholeDocDataPull[0]["arrayOfListNumbers"]['listNumbers']['length'-1]
    }

    

    addToFirebaseBasedOnUID('arrayOfListNumbers', myList)
}