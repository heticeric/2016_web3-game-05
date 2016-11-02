var Personne = function (vitesse, x, y, nom) {
    this.vitesse = vitesse;
    this.x = x;
    this.y = y;
    this.nom = nom;
    this.color = "#000";
}


Personne.prototype.move = function(x,y){
    this.x += x * this.vitesse;
    this.y += y * this.vitesse;
}


//voyou

var Voyou = function (vitesse, x, y, nom) {
    this.vitesse = vitesse;
    this.x = x;
    this.y = y;
    this.nom = nom;
    this.color = "blue";
}

//Policier

var Policier = function (vitesse, x, y, nom) {
    this.vitesse = vitesse;
    this.x = x;
    this.y = y;
    this.nom = nom;
    this.color = "red";
}

Policier.prototype.move = function () {
   /* this.x += x/2 * this.vitesse;
    this.y += y/2 * this.vitesse;*/

    Personne.prototype.move.call(x/2, y/2); // on recupere le proto de la superclass pour en faire une surpermethode
}

//Policier

var Pieton = function (vitesse, x, y, nom) {
    this.vitesse = vitesse * 1.2;
    this.x = x;
    this.y = y;
    this.nom = nom;
    this.color = "green";
}

Voyou.prototype = Object.create(Personne.prototype); //faire un héritage ne pas utiliser de new Personne() !
Policier.prototype = Object.create(Personne.prototype); //faire un héritage ne pas utiliser de new Personne() !
Pieton.prototype = Object.create(Personne.prototype); //faire un héritage ne pas utiliser de new Personne() !


var Jeu = function () {
    this.persos = [
        new Policier(.8,100,200,"gerard"),
        new Policier(.8,200,100,"geraldine"),
        new Pieton(.8,300,300,"lisa"),
        new Pieton(.8,270,200,"medrick"),
        new Pieton(.8,360,140,"tatiana"),
        new Voyou(.8,180,200,"erik")
    ];

    this.c = document.getElementById("game");
    this.canvas = this.c.getContext("2d");
}


Jeu.prototype.next = function () {
    var self = this;
    self.c = document.getElementById("game");
    self.canvas = self.c.getContext("2d");

    self.canvas.save();
    self.canvas.clearRect(0, 0, self.c.width, self.c.height);
    self.canvas.globalAlpha=1;

    this.persos.forEach(
        function (perso) {
         /*   var x1 = Math.round(Math.random()*800);
            var x2 = Math.round(Math.random()*800);*/

            var x1 = perso.x + 1;
            var x2 = perso.y + 1;

            console.log(Math.round(Math.random() -25))
            perso.move(x1,x2); // polymorphisme

            self.draw(x1,x2,perso.color);
        }
    )
}


Jeu.prototype.start = function () {
    var self = this;

    //closure
    var interval = setInterval(function () {
        self.next();
    }, 1000)

    setTimeout(function () {
        clearInterval(interval);
    }, 5000)

}

Jeu.prototype.draw = function (x, y, color) {

    this.canvas.beginPath();
    this.canvas.arc(x, y, 40, 0, 2 * Math.PI);
    this.canvas.strokeStyle = color;
    this.canvas.stroke();
}


var monjeu = new Jeu();

monjeu.start();


