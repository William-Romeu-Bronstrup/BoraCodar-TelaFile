const mainTag = document.querySelector("main")
const asideTag = document.querySelector("aside")

const inputFile = document.getElementById("inputFile")

const downloadFile = document.getElementById("downloadFile")

let file = []

while (downloadFile.hasChildNodes()) {
  downloadFile.removeChild(downloadFile.firstChild)
}

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
    let obj = {
      name: e.target.files.name,
      size: transformSize(e.target.files.size),
      file: e.target.files,
    }

    file.push(obj)
    console.log(obj)

    const leitor = new FileReader()

    readingFile(leitor, obj)
  }
})

async function readingFile(leitor, obj) {
  try {
    await leitor.readAsText(obj.file)

    leitor.addEventListener("loadend", () => {
      localStorage.setItem("file", JSON.stringify(file))
    })
  } catch (erro) {
    console.log(erro)
  }
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
        <p>${item.name}</p>
        <span>${item.size}</span>

        <footer>
          <progress class="barLoaded" max="100" value="100"></progress>
          <span id="msgLoaded">100%</span>
        </footer>
      </div>
    </article>
  `
}

// Criar lógica para diminuir o tamanho do texto e motrar o início com o final.
// Adicionar uma lixeira para excluir o file
// Fazer o multiply funcionar
