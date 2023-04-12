const inputFile = document.getElementById("inputFile");

console.log(inputFile)

//change
let files = [];
inputFile.addEventListener("change", (e) => {
  /*console.log(e.target.files)
  console.log(e.target.files[0])
  console.log(e.target.files[0].name)*/

  files.push(e.target.files)

  
  for (let i = 0; i < files.length; i++) {
    console.log(files[i][i].name)
  }
 
  /*files.map((e) => {
    console.log(e.name)
  })

  for (let name in files) {
    console.log(name)
  }*/
    
})