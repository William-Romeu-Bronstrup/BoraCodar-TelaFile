const mainTag = document.querySelector("main")
const inputFile = document.getElementById("inputFile")
const cardNameOfFile = document.querySelector("article div > p")
const cardSizeOfFile = document.querySelector("article div > span")

const downloadFile = document.getElementById("downloadFile")

const progressBar = document.querySelector(".barLoading")

//change
let file = {}
inputFile.addEventListener("change", (e) => {
  while (downloadFile.hasChildNodes()) {
    downloadFile.removeChild(downloadFile.firstChild)
  }

  if (e.target.files[0] != undefined) {
    file.name = e.target.files[0].name
    file.size = transformSize(e.target.files[0].size)
    file.file = e.target.files[0]

    const leitor = new FileReader()

    cardNameOfFile.textContent = file.name
    cardSizeOfFile.textContent = file.size

    readingFile(leitor)
  } else {
    console.log("Arquivo não identificado")
  }
})

async function readingFile(leitor) {
  try {
    leitor.addEventListener("loadstart", () => {
      console.log("Começou")
      progressBar.value = 5
    })

    leitor.addEventListener("progress", () => {
      console.log("Em progresso")

      mainTag.style.cursor = "not-allowed"
      inputFile.style.display = "none"
    })

    leitor.addEventListener("loadend", () => {
      mainTag.style.cursor = "default"
      inputFile.style.display = "block"
    })

    await leitor.readAsText(file.file)
    await leitor.addEventListener("load", () => {
      let result = leitor.result
      return creatingTagAToDownload(result, file.name)
    })
  } catch (erro) {
    console.log(erro)
  }
}

function creatingTagAToDownload(result, fileName) {
  const url = getFile(result)

  const tagA = document.createElement("a")
  tagA.textContent = "Download"

  tagA.href = url
  tagA.download = fileName
  downloadFile.appendChild(tagA)
}

function getFile(result) {
  const blob = new Blob([result], {
    type: "octet/stream",
  })
  return URL.createObjectURL(blob)
}

function transformSize(size) {
  if (size < Math.pow(10, 3)) {
    return `1 KB`
  }

  if (size < Math.pow(10, 5)) {
    return `${(size / Math.pow(10, 3)).toFixed(2)} KB`
  }

  if (size > Math.pow(10, 6)) {
    return `${(size / Math.pow(10, 6)).toFixed(2)} MB`
  }
}

// Criar lógica para diminuir o tamanho do texto e motrar o início com o final.
// Guardar os arquivos, um objeto ou array com o nome, size, url
