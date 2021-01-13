function Game(){
    //Variablen
    var VerfügbareIDs = ["a", "b", "c" , "d", "e", "f", "g", "h"];
    var genommeneIDs1 = [];
    var genommeneIDs2 = [];

    var umgedrehteKarten = [];
    var ZeitSek = 0;
    var Score = 0;

    //Auf clicks reagieren
    function Hochdrehen(event){
        //Deckt maximal 2 Karten auf 
        if(umgedrehteKarten.length != 2 && event.target.className != "card flipped"){
            //Karten hinzufügem
            event.target.classList.toggle("flipped"); 
            umgedrehteKarten.unshift(event.target);

            //Prüft die Karten
            Control();
        }
    }


    function Control(){
        //Prüft ob zwei aufgedeckt
        if(umgedrehteKarten.length.valueOf() == 2){
            //Auf gleiche Farbe prüfen
            if(umgedrehteKarten[0].id == umgedrehteKarten[1].id){
                
                //Score + 1 & in html anpassen
                Score += 1
                document.querySelector('#Überschrift').textContent = `Score: ${Score}`;

                //Cleared das Array
                while(umgedrehteKarten.length > 0){
                    umgedrehteKarten.pop();
                }
            }
            else{
                setTimeout(function(){
                    //Entfernt die "flipped"-Klasse
                    umgedrehteKarten.forEach(element => {
                        element.classList.toggle("flipped");

                    });
                    
                    //Cleared das Array
                    while(umgedrehteKarten.length > 0){
                        umgedrehteKarten.pop();
                    }

                }, 500);
            }
        }

        //Wenn das Spiel fertig ist
        if(Score == 8){
            setTimeout(() => {
                window.alert(`Du hast es geschafft (Innerhalb von ${ZeitSek} Sekunden)!`);
                location.reload();
            }, 1000);
        }

    }


    //Erstellt beim Aufruf der Webseite die Karten
    function CardErstellen(){
        //Holt sich den Container
        var Container = document.querySelector('#card-deck');

        for (let index = 1; index < 17; index++) {
            //Div erstellen
            var nCard = document.createElement("div");
            nCard.classList.add("card");
            //Verteilt jeder Karte eine ID
            nCard.setAttribute("id", VerfügbareIDs[GetRightID()-1]);
            //Hinzufügen 
            Container.appendChild(nCard);
        }
    }


    function GetRightID(){
        //Schleife um viele Indizes zu erstellen
        for (let index = 0; index < 300; index++) {
            var idIndexGef = Math.round((Math.random() * (8 - 1) + 1));

            if(genommeneIDs1.indexOf(VerfügbareIDs[idIndexGef]) == -1 && idIndexGef != 0){
                genommeneIDs1.push(VerfügbareIDs[idIndexGef]);
                return idIndexGef;
            }
            else if(genommeneIDs2.indexOf(VerfügbareIDs[idIndexGef]) == -1 && idIndexGef != 0){
                genommeneIDs2.push(VerfügbareIDs[idIndexGef]);
                return idIndexGef;
            }
            else{
                continue;
            }
        }
    }

    function CardEventsErstellen(){
        let CardList = document.querySelectorAll('.card');
        CardList.forEach(element => {
            element.addEventListener('click', Hochdrehen);
        });
    }

    
    //--------Normaler Aufruf beim Ausführen der Funktion
    //Erstellt die Karten über JS
    CardErstellen();
    //Gib den jeweiligen Karten ein Klick-Event
    CardEventsErstellen();
    //Starten den Timer
    var Timer = setInterval(function(){
        ZeitSek += 1;            
    }, 1000);
}

//--------Wird beim Öffnen der Webseite ausgeführt
Game();