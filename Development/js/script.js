// TODO - make JSON instance
// TODO - add data
// TODO - remove data
// TODO - click lyrics/song title => YouTube.com
// TODO - playlists
// TODO - (possible) - share playlists

// TODO - lyric data, comment box, just 1 comment textarea

// window.onload=()=>{
    // var db = firebase.firestore();
// }
// var db = firebase.firestore();

// =============================
// Functions to Run
function run(){
    makeJSONLyricDataInstance();
    saveLyricData(['lyricData1', 'time after time']);
    saveLyricData(['lyricData2', 'come back to me']);
    saveLyricData(['lyricData3', 'breaking the Habit']);
}
//=============================


var myJSONLyricData;
function makeJSONLyricDataInstance(){
    myJSONLyricData = new JSON_Instance;
}

var arrayOfIndexes = [];

function saveLyricData(data){
    //saveLyricData(['searchText', 'healing begins']);
    if(arrayOfIndexes.length==0){
        myJSONLyricData.addMoreToIndex(0, [[0, [data]]]);
        console.log('arrayOfIndexes: ', arrayOfIndexes.length);
    }else{
        var increase = arrayOfIndexes[arrayOfIndexes.length]++;

        myJSONLyricData.addMoreToIndex(increase);
        arrayOfIndexes[arrayOfIndexes.length++] = increase;
        console.log('increase', increase);
    }
    // myJSONLyricData.addToObj([[0, [data]]]);
    myJSONLyricData.print();
}
// =============================



// =============================
var youtubes;
function pushJSONStringToFirebase(){
    //make sure to run: 
    youtubes = myJSONLyricData.stringMe();

    console.log('youtubes', youtubes);
    
    // adding('YouTube', {youtubes});    // the variable name becomes the 'key' to the entry
}
// =============================













































// =============================