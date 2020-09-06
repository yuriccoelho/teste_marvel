<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <!-- Bootstrap CSS -->
    <!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" integrity="sha384-HSMxcRTRxnN+Bdg0JdbxYKrThecOKuH5zCYotlSAcp1+c8xmyTe9GYg1l9a69psu" crossorigin="anonymous">
    
    <title>Site de Busca de Herói</title>

    <link rel="stylesheet" href="style.css">

</head>

<body onload="character()">
    <div class="jumbotron">
        <div class="container">
            <h1 class="header-main-title" style="color: white;">Personagens Marvel</h1>
            <form id="connectionForm">
            
                <div class="form-group">
                    <input required type="text" name="name" id="name" class="form-control character-search-box"
                        placeholder="(Thor, Gamora, Viúva-Negra, etc...)">
                </div>
                <input type="submit" value="Search!" class="btn btn-danger mb-2 search-character-button" style="float: right;">

            </form>
        </div>
    </div>

    <div class="container" id="contentContainer">
    
        <div class="d-flex align-items-center" id="characterSpinnerSection"></div>
        <div class="d-flex align-items-center" id="comicsSpinnerSection"></div>

        <section id="characterSection"></section>

        <section id="comicSection"></section>

    </div>
    
    <script src="main.js"></script>
    <!-- Javascript Opcional -->


    <script src="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js" integrity="sha384-aJ21OjlMXNL5UyIl/XNwTMqvzeRMZH2w8c5cRVpzpU8Y5bApTppSuUkhZXN0VxHd" crossorigin="anonymous"></script>
</body>
</html>