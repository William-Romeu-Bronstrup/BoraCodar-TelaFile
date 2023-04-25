const mainTag = document.querySelector("main")
const asideTag = document.querySelector("aside")

const inputFile = document.getElementById("inputFile")
const downloadFile = document.getElementById("downloadFile")

let file = []
let obj = {}

!(function () {
  let getData = localStorage.getItem("file")

  if (getData) {
    getLocalData(getData)
  }
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
    let fileList = e.target.files

    for (let i = 0; i < fileList.length; i++) {
      obj = {
        name: fileList.item(i).name,
        size: transformSize(fileList.item(i).size),
        files: fileList.item(i),
        id: Number((Math.random() * 10).toFixed(2).replace(".", "")),
      }

      file.unshift(obj)
    }

    readingFile(leitor, file)
  }
})



function readingFile(leitor, file) {
  leitor.readAsText(file[0].files)

  leitor.addEventListener("loadend", () => {
    localStorage.setItem("file", JSON.stringify(file))

    while (asideTag.hasChildNodes()) {
      asideTag.removeChild(asideTag.firstChild)
    }

    const blob = new Blob([leitor.result], {
      type: "octet/stream",
    })

    const tagA = document.createElement("a")
    tagA.textContent = "Download"

    tagA.href = URL.createObjectURL(blob)
    tagA.download = file[0].name

    file.map((item) => {
      asideTag.innerHTML += buildCards(item)
      asideTag.appendChild(tagA) 
    })
  })
}

function diviseName(name) {
  let firstPart = name.slice(0, 18)
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

  if (size > Math.pow(10, 6)) {
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
  return `
    <article>
      <div class="bgLoading bgLoaded">
        <img
          src="assets/loadedFile.svg"
          alt="Imagem que representa um arquivo carregando"
          id="imgFile"
        />
      </div>
      <div>
        <p>${item.name.length > 36 ? diviseName(item.name) : item.name}</p>
        <span>${item.size}</span>

        <footer>
          <progress class="barLoaded" max="100" value="100"></progress>
          <span id="msgLoaded">100%</span>
          <img
            src="assets/delete.svg"
            alt="Imagem de uma lixeira para excluir um arquivo"
            id="imgTrash"
            onclick="removeFile(${item.id})"
          />
        </footer>
      </div>
    </article>
  `
}
