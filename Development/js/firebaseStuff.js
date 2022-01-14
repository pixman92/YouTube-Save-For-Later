window.onload = ()=>{
  init();
};
var db;
function init(){
  var firebaseApp = firebase.initializeApp(firebaseConfig);

    db = firebaseApp.firestore();
}

function pullData(){
  db.collection("YouTube").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
    });
});
}

function pushData(data){
  //data should be JSONstring
  db.collection("YouTube").add(data)
  .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
  })
  .catch((error) => {
      console.error("Error adding document: ", error);
  });
}

// =================
