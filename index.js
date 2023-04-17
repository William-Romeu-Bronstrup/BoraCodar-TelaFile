const inputFile = document.getElementById("inputFile")

//change
let file = {}
inputFile.addEventListener("change", (e) => {
  file.name = e.target.files[0].name
  file.size = transformSize(e.target.files[0].size)
  file.file = e.target.files[0]

  const leitor = new FileReader()

  console.log(file)
  leitor.addEventListener("load", function () {
    console.log(leitor)
  })

  if (file.file) {
    leitor.readAsText(file.file)
  }
})

function transformSize(size) {
  return `${(size / Math.floor(Math.pow(10, 6))).toFixed(2)} MB`
}
