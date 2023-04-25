const mainTag = document.querySelector("main")
const asideTag = document.querySelector("aside")

const inputFile = document.getElementById("inputFile")
const downloadFile = document.getElementById("downloadFile")

let file = []
let obj = {}

!(function () {
  let getData = localStorage.getItem("file")

  if (getData == null || getData.length <= 2) {
    return
  }

  getLocalData(getData)
})()

function getLocalData(getData) {
  file.push(...JSON.parse(getData))
  file.map((item) => {
    asideTag.innerHTML += buildCards(item)
  })
}

inputFile.addEventListener("change", (e) => {
  if (e.target.files[0] != undefined) {
    const leitor = new FileReader()
    const fileList = e.target.files

    obj = {
      name: fileList.item(0).name,
      size: transformSize(fileList.item(0).size),
      id: Number((Math.random() * 10).toFixed(2).replace(".", "")),
    }

    readingFile(leitor, fileList.item(0))
  }
})

function readingFile(leitor, fileSelecionado) {
  leitor.readAsText(fileSelecionado)

  leitor.addEventListener("loadend", () => {
    while (asideTag.hasChildNodes()) {
      asideTag.removeChild(asideTag.firstChild)
    }

    obj = {
      ...obj,
      result: leitor.result,
    }

    file.unshift(obj)

    localStorage.setItem("file", JSON.stringify(file))

    file.map((item) => {
      asideTag.innerHTML += buildCards(item)
    })
  })
}

function diviseName(name) {
  let firstPart = name.slice(0, 12)
  let secondPart = name.slice(-8)

  return firstPart.concat("...").concat(secondPart)
}

function transformSize(size) {
  if (size < Math.pow(10, 3)) {
    return `1 KB`
  }

  if (size < Math.pow(10, 5) || size > Math.pow(10, 5)) {
    return `${(size / Math.pow(10, 3)).toFixed(2)} KB`
  }

  if (size > Math.pow(10, 5)) {
    return `${(size / Math.pow(10, 6)).toFixed(2)} MB`
  }

  return "0"
}

function removeFile(id) {
  let deleteFile = file.filter((item) => {
    if (item.id !== id) {
      return file.unshift()
    }
  })

  localStorage.setItem("file", JSON.stringify(deleteFile))

  while (asideTag.hasChildNodes()) {
    asideTag.removeChild(asideTag.firstChild)
  }

  let getData = localStorage.getItem("file")

  file = []

  file.push(...JSON.parse(getData))
  file.map((item) => {
    asideTag.innerHTML += buildCards(item)
  })
}

function buildCards(item) {
  // Precisa criar um novo blob cada vez a página é recarregada
  const blob = new Blob([item.result], {
    type: "octet/stream",
  })

  let url = URL.createObjectURL(blob)

  return `
    <article>
      <div class="bgLoading bgLoaded">
        <img
          src="assets/loadedFile.svg"
          alt="Imagem que representa um arquivo carregando"
          id="imgFile"
        />
      </div>
      <div id="cardFile">
        <p>${item.name.length > 25 ? diviseName(item.name) : item.name}</p>
        <span>${item.size}</span>

        <footer>
          <progress class="barLoaded" max="100" value="100"></progress>
          <span id="msgLoaded">100%</span>
          <img
            src="assets/delete.svg"
            alt="Imagem de uma lixeira vermelha para excluir um arquivo"
            class="imgFeatures"
            title="Deletar Arquivo"
            onclick="removeFile(${item.id})"
          />
          <a href=${url} download=${item.name}>
            <img
              class="imgFeatures"
              src="assets/downloadFiles.png"
              alt="Imagem de uma seta para baixo roxa para fazer o download de um arquivo"
              title="Baixar Arquivo"
            />
          </a>
          
        </footer>
      </div>
    </article>
  `
}
