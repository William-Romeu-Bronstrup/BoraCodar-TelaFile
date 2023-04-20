const mainTag = document.querySelector("main")
const inputFile = document.getElementById("inputFile")
// Mudar a forma de como buscar os elementos para não atrapalhar os que virão
const cardNameOfFile = document.querySelector("article div > p")
const cardSizeOfFile = document.querySelector("article div > span")

const cardImg = document.getElementById("imgFile")
const bgOfcardImg = document.querySelector(".bgLoading")
const porcentageOfcardFile = document.getElementById("msgLoading")
const downloadFile = document.getElementById("downloadFile")
const progressBar = document.querySelector(".barLoading")

let file = []

!(function () {
  let getData = localStorage.getItem("file")

  if (getData) {
    file.push(...JSON.parse(getData))
  }
})()

function buildCards() {}

inputFile.addEventListener("change", (e) => {
  while (downloadFile.hasChildNodes()) {
    downloadFile.removeChild(downloadFile.firstChild)
  }

  if (e.target.files[0] != undefined) {
    let obj = {
      name: e.target.files[0].name,
      size: transformSize(e.target.files[0].size),
      file: e.target.files[0],
    }

    cardNameOfFile.textContent = obj.name
    cardSizeOfFile.textContent = obj.size

    file.push(obj)

    const leitor = new FileReader()

    readingFile(leitor, obj)

    localStorage.setItem("file", JSON.stringify(file))
  } else {
    addStylesWhenFileIsError()
  }
})

async function readingFile(leitor, obj) {
  try {
    await leitor.readAsText(obj.file)
    await leitor.addEventListener("load", () => {
      return creatingTagAToDownload(leitor.result, obj.name)
    })

    leitor.addEventListener("loadstart", () => {
      setStylesToDefault()
    })

    leitor.addEventListener("progress", () => {
      console.log("Em progresso")
      //função para troca de img

      mainTag.style.cursor = "not-allowed"
      inputFile.style.display = "none"
    })

    leitor.addEventListener("error", () => {
      addStylesWhenFileIsError()
    })

    leitor.addEventListener("loadend", () => {
      addStylesWhenFileIsLoaded()
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

/*Estilos do card */
function setStylesToDefault() {
  progressBar.value = 0
  cardImg.setAttribute("src", "assets/loadFile.svg")
  cardImg.setAttribute("alt", "Imagem que representa um arquivo carregando")
  bgOfcardImg.classList.remove("bgLoaded")
  porcentageOfcardFile.setAttribute("id", "msgLoading")
  porcentageOfcardFile.textContent = "0%"
  progressBar.classList.remove("barLoaded")
  progressBar.classList.add("barLoading")
}

function addStylesWhenFileIsError() {
  progressBar.value = 0
  cardImg.setAttribute("src", "assets/errorFile.svg")
  cardImg.setAttribute("alt", "Imagem que representa um arquivo não lido")
  bgOfcardImg.classList.remove("bgLoaded")
  bgOfcardImg.classList.add("bgError")
  porcentageOfcardFile.setAttribute("id", "msgError")
  porcentageOfcardFile.textContent = "Erro"
  progressBar.classList.remove("barLoaded")
  progressBar.classList.add("barError")
}

function addStylesWhenFileIsLoaded() {
  mainTag.style.cursor = "default"
  inputFile.style.display = "block"
  progressBar.value = 100
  cardImg.setAttribute("src", "assets/loadedFile.svg")
  cardImg.setAttribute("alt", "Imagem que representa o arquivo carregado")
  bgOfcardImg.classList.remove("bgError")
  bgOfcardImg.classList.add("bgLoaded")
  porcentageOfcardFile.setAttribute("id", "msgLoaded")
  porcentageOfcardFile.textContent = "100%"
  progressBar.classList.remove("barLoading")
  progressBar.classList.remove("barError")
  progressBar.classList.add("barLoaded")
}

// Criar lógica para diminuir o tamanho do texto e motrar o início com o final.
// Guardar os arquivos, um objeto ou array com o nome, size, url
// Adicionar uma lixeira para excluir o file
// Fazer o multiply funcionar
