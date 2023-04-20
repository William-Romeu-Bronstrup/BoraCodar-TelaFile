const mainTag = document.querySelector("main")
const asideTag = document.querySelector("aside")

const inputFile = document.getElementById("inputFile")

const downloadFile = document.getElementById("downloadFile")

let file = []

/*!(function () {
  let getData = localStorage.getItem("file")

  if (getData) {
    console.log("entrou")
    getLocalData(getData)
  }
})()

function getLocalData(getData) {
  file.push(...JSON.parse(getData))
  file.map((item) => {
    asideTag.innerHTML += buildCards(item)
  })
}*/

inputFile.addEventListener("change", (e) => {
  if (e.target.files[0] != undefined) {
    let fileList = e.target.files

    let obj = {
      name: "",
      size: "",
      files: ""
    }

    for (let i of fileList) {
      obj.name = fileList.item().name,
      obj.size = transformSize(i.size),
      obj.files = i


      file.push(obj)

    }
    const leitor = new FileReader()

    readingFile(leitor, file)
  }
})

 function readingFile(leitor, file) {
  console.log(file)
  
    reading(file)
    //await leitor.readAsText(file.file)

    leitor.addEventListener("loadend", () => {
      localStorage.setItem("file", JSON.stringify(file))

      while (asideTag.hasChildNodes()) {
        asideTag.removeChild(asideTag.firstChild)
      }

      file.map((item) => {
        asideTag.innerHTML += buildCards(item)
      })
    })
  } 


function reading(file) {
  file.map((item) => {
    console.log(item)
  })
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
