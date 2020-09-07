function character(){
    let urlQueryParameters = new URLSearchParams(window.location.search),
    queryParameterName = urlQueryParameters.get("name"),
    name = document.getElementById("name").value;

    if (queryParameterName !== null && queryParameterName !== "") {
        document.getElementById("name").value= queryParameterName;
        connection();
    } else if (name !== null && name !== "") {
        document
            .getElementById("connectionForm")
            .addEventListener("submit", connection);
    } else {
        document.getElementById("characterSection").innerHTML =
            '<h2 id="characterMainTitle">Digite um nome acima!'
    }
}

function connection() {
    document.getElementById("characterSpinnerSection").innerHTML = "";
    document.getElementById("comicsSpinnerSection").innerHTML = "";

    const xhr = new XMLHttpRequest();
    const name = document.getElementById("name").value;
    const params = "name=" + name;


    xhr.open("GET", "/Marvel/connections/name-search.php?" + params, true);
    xhr.onloadstart = function() {
        document.getElementById("characterSpinnerSection").innerHTML =
        '<strong id="spinnerText" class="text-primary">Procurando personagem...</strong>' +
        '<div class="text-primary spinner-border ml-auto" role="status" ' +
        'aria-hidden="true" id="spinner"></div>';
    }
    xhr.onerror = function() {
        document.getElementById("characterSection").innerHTML = '<h2 id="characterMainTitle"> Aconteceu um erro, veja sua conexão.</h2>';
    }
    xhr.onload = function() {
        if (this.status == 200) {
            var results = JSON.parse(this.responseText);

            if (results["data"].count === 0) {
                document.getElementById("characterSection").innerHTML =
                '<h2 id="characterMainTitle"><span style="font-weight:bold;">Sem resultados...' +
                name +
                "</span>" +
                ". Tente novamente.</h2>";

                document.getElementById("characterSpinnerSection").innerHTML = "";
                document.getElementById("comicsSpinnerSection").innerHTML = "";

            } else if (results === undefined || results.length == 0){
                document.getElementById("characterSection").innerHTML =
                '<h2 id="characterMainTitle">' +
                "Desculpe, aconteceu um erro por aqui. <br>Neste caso, tente novamente mais tarde.</h2>";

                document.getElementById("characterSpinnerSection").innerHTML = "";
                document.getElementById("comicsSpinnerSection").innerHTML = "";
            } else {
              const characterAttributes = results ["data"].results[0],
                characterID = results ["data"].results[0].id;
              
              let output = "";

              output +=
                '<h2 id="characterMainTitle">' +
                "Personagem" +
                "</h2>" +
                '<div class="card flex-md-row mb-4 box-shadow h-md-250" id="characterCard">' +
                '<div id="characterImage">' +
                '<img class="card-img-right flex-auto d-md-block img-fluid"' +
                ' alt="Picture of ' +
                characterAttributes.name +
                '" src="' +
                characterAttributes.thumbnail["path"] +
                "." +
                characterAttributes.thumbnail["extension"] +
                '">' +
                "</div>" +
                '<div class="card-body d-flex flex-column align-items-start">' +
                '<h3 class="mb-0 text-dark" id="characterName">' +
                characterAttributes.name +
                "</h3>" +
                '<p class="card-text mb-3" id="characterDescription">';
                if (characterAttributes.description !== "") {
                output += characterAttributes.description;
                }
                output +=
                "</p>" +
                '<p class="text-muted mb-3" id="comicsAvailable">' +
                "Comics: " +
                characterAttributes.comics.available +
                " | " +
                "Series: " +
                characterAttributes.series.available +
                " | " +
                "Stories: " +
                characterAttributes.stories.available +
                " | " +
                "Events: " +
                characterAttributes.events.available +
                "</p>" +
                '<p class="mb-1 text-muted" id="characterInfoAttribution">' +
                results["attributionText"] +
                "</p>" +
                "</div>" +
                "</div>";
                
                document.getElementById("characterSection").innerHTML = output;
                
                comics(characterID)
            }

            } else {
            document.getElementById("characterSection").innerHTML = '<h2 id="characterMainTitle">Requisição não foi recebida.</h2>';
            }
        }
    xhr.onloadend = function() {
        document.getElementById("characterSpinnerSection").innerHTML = "";
    }
    xhr.send();
}

function comics(characterID) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", './connections/character.php?character-id=' + characterID, true)
    xhr.onloadstart = function() {
        document.getElementById("comicsSpinnerSection").innerHTML =
            '<strong id="spinnerText" class="text-danger">Carregando quadrinhos abaixo...</strong>' +
            '<div class="spinner-border text-danger ml-auto" role="status" ' +
            'aria-hidden="true" id="spinner"></div>';
    }
    xhr.onerror = function() {
        document.getElementById("characterSection").innerHTML = '<h2 id="characterMainTitle"> Aconteceu um erro, veja sua conexão.</h2>';
    }
    xhr.onload = function () {
        if (this.status == 200) {
        const results = JSON.parse(this.responseText),
            comics = results["data"].results,
            comicSection = document.getElementById("comicSection");
          
          if (results["data"] == 0) {
            let output = "";
            comicSection.innerHTML = output;
            comicSection.innerHTML = "<h2>Quadrinhos não disponíveis</h2>";
          } else {
            // quadrinhos
            let output = "",
              creators = "";
            
              output +=
              '<h2 id="comicMainTitle">Quadrinhos</h2>' + '<div class="card-columns">';
    
            for (const i in comics) {
              if (comics.hasOwnProperty(i)) {
                const comic = comics[i];
    
                output +=
                  '<div class="card">' +
                  '<a href="./comic.php?comic-id=' +
                  comic.id +
                  '"><img src="' +
                  comic.thumbnail["path"] +
                  "." +
                  comic.thumbnail["extension"] +
                  '" class="card-img-top" alt="' +
                  comic.title +
                  '"></a>' +
                  '<div class="card-body">' +
                  '<h5 class="card-title">' +
                  comic.title +
                  "</h5>";
    
                if (comic.description != null) {
                  output +=
                    '<p style="font-size: 12px;" class="card-text">' +
                    comic.description +
                    "</p>";
                }
    
                output +=
                  '<p style="font-size: 12px;" class="card-text text-muted">Characters: ';
    
                for (const k in comic.characters.items) {
                  if (comic.characters.items.hasOwnProperty(k)) {
                    const character = comic.characters.items[k];
                    output += character.name.concat(", ");
                  }
                }
    
                output += "</p>";
                output +=
                  '<p style="font-size: 12px;" class="card-text text-muted">Creators: ';
    
                for (const j in comic.creators.items) {
                  if (comic.creators.items.hasOwnProperty(j)) {
                    const creator = comic.creators.items[j];
    
                    output += creator.name.concat(" (" + creator.role + "), ");
                  }
                }
    
                output += "</p>";
                output +=
                  "</div>" +
                  '<div class="card-footer">' +
                  '<small style="line-height: 1;" class="text-muted">' +
                  results["attributionText"] +
                  "</small>" +
                  "</div>" +
                  "</div>";
              }
            }
    
            output += "</div>";
    
            comicSection.innerHTML = output;
            
          }
    
        } else {
          document.getElementById("characterSection").innerHTML =
            '<h2 id="characterMainTitle">Requisição não recebida</h2>';
          document.getElementById("comicSection").innerHTML =
            '<h2 id="characterMainTitle">Requisição não recebida</h2>';
        }
      }
      xhr.onloadend = function() {
        document.getElementById("comicsSpinnerSection").innerHTML =
          '<strong id="spinnerText" class="text-success">Concluído.</strong>';
      }
    xhr.send ();
}