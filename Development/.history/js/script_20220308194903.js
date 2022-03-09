// TODO - click lyrics/song title => YouTube.com
// TODO - playlists
// TODO - (possible) - share playlists

// TODO - lyric data, comment box, just 1 comment textarea

// TODO - push song data, pull song data
// TODO - main list as a Record for the lists of data

window.onload = () => {
    // var db = firebase.firestore();
    // run();
    makeJSONLyricDataInstance();

}
// var db = firebase.firestore();

// =============================
// Functions to Run
function run() {
    makeJSONLyricDataInstance();
    saveLyricData('time after time', 0, '...');
    saveLyricData('come back to me', 0, '');
    saveLyricData('breaking the Habit]', 0, '');

    hide();
    show('dynamicURLPage');
    parseData(1);

}
//=============================


var myJSONLyricData;
function makeJSONLyricDataInstance() {
    myJSONLyricData = new JSON_Instance;
}

var arrayOfIndexes = 0;

function saveLyricData(lyricData, commentData, clickNumber, playlistValue) {
    //saveLyricData(['searchText', 'healing begins']);
    if (arrayOfIndexes == 0) {
        // myJSONLyricData.addToObj([[0, ['listName', '1']]]);
        // myJSONLyricData.addToObj([[0, [['lyricData', lyricData], ['clickNumber', clickNumber], ['comments', commentData]]]]);

        myJSONLyricData.addToObj([[[0], ['email', savedMainEmail]]])

        // arrayOfIndexes++
        myJSONLyricData.addToObj([[[0], ['lyricData', lyricData], ['commentData', commentData], ["clickNumber", clickNumber], ['playlistValue', 'main']]]);

        myJSONLyricData.print();
        // console.log('arrayOfIndexes: ', arrayOfIndexes);
    } else {
        // var increase = arrayOfIndexes[arrayOfIndexes.length]++;
        var increase = arrayOfIndexes++;

        // myJSONLyricData.addMoreToIndex(increase);
        // arrayOfIndexes[arrayOfIndexes.length++] = increase;
        console.log('increase', increase);

        myJSONLyricData.addToObj([[0, [['lyricData', lyricData], ['clickNumber', clickNumber], ['comments', commentData]]]]);
    }
    // myJSONLyricData.addToObj([[0, [data]]]);
    myJSONLyricData.print();
}
// =============================



// =============================
var youtubes;
function pushJSONStringToFirebase() {
    //DON'T REALLY USE
    //make sure to run: 
    youtubes = myJSONLyricData.stringMe();

    console.log('youtubes', youtubes);

    // adding('YouTube', {youtubes});    // the variable name becomes the 'key' to the entry
}
var youtubesObj;
function pullData() {
    youtubesObj = myJSONLyricData.parseMe();
    return youtubesObj;
}

// =============================

function parseData(index) {
    var lyricData = myJSONLyricData.JSONobj.innerArray[index][0][0];
    var clickNumber = myJSONLyricData.JSONobj.innerArray[index][0][1];
    var comments = myJSONLyricData.JSONobj.innerArray[index][0][2];
    makeASingleYouTubeCard(index, lyricData, clickNumber, comments);

}


function makeASingleYouTubeCard(index, lyricDataVar, clickNumberVar, commentDataVar) {
    var htmlStr = ["<div class='w3-card'>",
        "<div class='lyricData'>", lyricDataVar, "</div>",
        "<div class='clickNumber'>", clickNumberVar, "</div>",
        "<div class='commentData", index, "'>", commentDataVar, "</div>",
        "</div>"].join('');

    document.getElementsByClassName('fillMeIn')[0].innerHTML += htmlStr;

}

function clickable(index) {
    var savedBefore = '';
    savedBefore = $('.commentData' + index).html();
    $('.commentData' + index).on('click', () => {

        //goes form .commentDataIndex
        //to 
        //.divInputIndex


        // debugger;

        //makes Input
        $('.commentData' + (index).toString()).html(["<div class='divInput", index, "'>", "<input class='commentDataInput", index, "'/>", "</div>"].join(''));

        $('.commentDataInput' + (index).toString()).val(savedBefore);

    });
    //pull data, to put back into DOM
    $('.commentDataInput' + index).off('click', () => { });
    $('.divInput' + (index).toString()).on('blur', () => {
        var toPushBack = $('.commentDataInput' + index).val()
        $('.commentData' + index).html(toPushBack);


        // debugger;
        // console.log('savedBefore', savedBefore);


        //=================
        //events to make text box back into Hard coded HTMLDOM
        // $('.divInput'+(index).toString()).on('blur', ()=>{    
        //     $('.commentData'+index).html($('.commentDataInput'+index).val());
        //     clickable(index);   
        // });

        // $('.commentData'+index).on('click', ()=>{
        //     // console.log('help it');
        //     $('.commentData'+index).html($('.commentDataInput'+index).val());
        //     clickable(index);   
        // });

        // $('.divInput'+index).off();
        // $('.commentData'+index).off();
    });

}

var savedBefore = ''; var inputMe;
function events(index) {
    // savedBefore = $('.commentData' + index).html();

    inputMe = document.getElementsByClassName('commentData' + index)[0];
    // Gator(inputMe).on('click', (e) => {
    //     e.preventDefault();
    //     console.log('clicked', e.target);
    document.getElementsByClassName('commentData' + index)[0].addEventListener('click', () => {

        // var saved = $('.commentData'+index).val();
        //make input with text
        // $('.commentData' + (index).toString()).html(["<div class='divInput", index, "'>", "<input class='commentDataInput", index, "'/>", "</div>"].join(''));

        // $('.commentData'+index).val(savedBefore);    
        // var divMe = $('.commentDataInput').html();
        // var divMe = $('.commentDataInput' + index).val();
        var divMe = document.getElementsByClassName('commentData' + index)[0].innerHTML;
        // var editText = '<input class="divInput'+index+'"/>');
        editText.val(divMe);
        $(this).replaceWith(editText);

    });

}
var newInput;
function make(index){
    var data = $('.commentData'+index).text();

    newInput  = document.createElement('textarea')
    // newInput.classList.add('inputDiv1');

    newInput.innerText=  data;

    // $('.commentData1').html(newInput.innerHTML);
    $('.commentData1').html("<textarea class='textarea"+index+"'>"+newInput.innerHTML+"</textarea>");
}

function make2(index){
    $('.commentData'+index).html("<div>"+$('.textarea'+1).val()+"</div>");
}


function toPushBack(index){
    document.getElementsByClassName('divInput'+index)[0].addEventListener('blur', ()=>{
        var html = $(this).val();
        var text = $('<div>');
        text.html = html;
        $(this).replaceWith(text);
    });
}


// =================
// function clickNumber


// ==================================
// making an Email JSON 
// to then push and pull,
// finding the UID to that email
var emailJSON;
function initJSONEmail(email){
    //run: initJSONEmail(<email>)
    //pushtToEmail()
    //pullEmailGetUID()
    emailJSON = new JSON_Instance();
    emailJSON.addToObj([['email', email]]);
    console.log('emailJSON ', emailJSON.stringMe());
}

function pushToEmail(decision, newEmail){
    //use this function to push new Email to Firebase 
    if(decision==1){
        pushData({'email': emailJSON.stringMe()});

    }else{
        pushData({'email': newEmail});
    }
}


var userUID = "";
var savedUIDstr ="";
async function pullEmailGetUID(emailSearch){
    //pull - that uses ALL method
    // async function pull(_callback){
    var savedArrayUID = []; var savedArrayEmails = [];
    await db.collection("YouTube").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            savedArrayUID.push(doc.id);
            savedArrayEmails.push(doc.data());
            // console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
        });
    }).then(()=>{
        runningThroughSavedArrays(savedArrayEmails, savedArrayUID, emailSearch)
    });
}

function pullEmailGetUIDWhere(emailSearch){
    //pull that uses "WHERE" method
    var savedArrayUID = []; var savedArrayEmails = [];  
    db.collection('YouTube').where('email', '==', emailSearch).get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            savedArrayUID.push(doc.id);
            savedArrayEmails.push(doc.data());
            // doc.data() is never undefined for query doc snapshots

            console.log(doc.id, " => ", doc.data());
        });
    }).then(()=>{
        runningThroughSavedArrays(savedArrayEmails, savedArrayUID, emailSearch)
    }).catch((error) => {
        console.log("Error getting documents: ", error);
    });
}

var foundMe = false;
function runningThroughSavedArrays(savedArrayEmails, savedArrayUID, emailSearch){
    //function that takes the arrays, and runs through them
    //to find the corresponding email
    savedArrayEmails.forEach((item, index)=>{
        // console.log(item) 
        // console.log(item.email)
        // console.log('index', index);
        
        if(item.email==emailSearch){
            console.log('Found at ', index, ' index');
            console.log( '=====\n', savedArrayUID[index]);

            savedUIDstr = savedArrayUID[index];
            foundMe = true;
        }
        if(index>=savedArrayEmails.length-1 && foundMe==false){
            console.log('not found');
        }
    });
}


//=================
var wholeDocDataPull = [];
function pullDataBasedOnUID(){
    //pulls based on a found 'savedUIDstr'
    try{
        db.collection('YouTube').doc(savedUIDstr).get().then(doc =>{
            console.log(doc.data());
            wholeDocDataPull.push(doc.data());
            console.log('...saved to wholeDocDataPull...');
        });
    }catch(err){
        console.log('Errored out at, ', err);
    }
}

function addToFirebaseBasedOnUID(objName, dataString){
    //pushes custom obj - using <objName> & <dataString>
    // to make custom obj, that is pushed to a record - found by UID
    // using previous <pullEmailGetUID()> function
    var obj = {};
    // obj[0] = objName;
    obj[objName.toString()] = dataString;
    
    // obj['test'] = JSON.stringify(obj['test']);
    try{
        db.collection('YouTube').doc(savedUIDstr).set(obj, {merge: true});

    }catch(err){
        console.log('Errored out, ', err);
    }

}

// ==================================
var arrayMe = ["mainHomePage", "dynamicURLPage"];
function hide() {
    for (var i = 0; i < arrayMe.length; i++) {
        document.querySelector('.' + arrayMe[i]).style.display = 'none';
    }

}

function show(classIt) {
    document.querySelector("." + classIt).style.display = 'block';
}










































// =============================