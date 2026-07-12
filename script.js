const Canvas = document.getElementById("GameScreen");
const PaintBrush = Canvas.getContext("2d");

let KeyPress = {};


window.addEventListener("keydown", function(Pressed) {
    KeyPress[Pressed.key] = true;
});

window.addEventListener("keyup", function(Released) {
    KeyPress[Released.key] = false;
});


let Mobs = {};

Mobs.push({
     X: 350,
    Y: 0,
    Width: 50,
    Height: 80,
    Speed: 3
});


function RoadAndMobs(){
    // Road 
    PaintBrush.fillStyle = "gray";
    PaintBrush.fillRect(0, 0, 800, 800);
    
    // Road Lines
    PaintBrush.strokeStyle = "white";
    PaintBrush.lineWidth = 3;
    PaintBrush.setLineDash([25, 20]);

    PaintBrush.beginPath();

    PaintBrush.moveTo(261, 0);      
    PaintBrush.lineTo(261, Canvas.height);

    PaintBrush.moveTo(531, 0);      
    PaintBrush.lineTo(531, Canvas.height);

    PaintBrush.stroke();

    PaintBrush.setLineDash([]);

    // Mobs 
    for (let i=0; i < Mobs.length; i++){
         Mobs[i].Y += Mobs[i].Speed;

    PaintBrush.fillStyle = "red";
    PaintBrush.fillRect(
        Mobs[i].X,
        Mobs[i].Y,
        Mobs[i].Width,
        Mobs[i].Height
    );

}



let Driver = { 
    X: (Canvas.width / 2) - 25,
    Y: Canvas.height - 80,
    Width: 50,
    Height: 50,
    Speed: 5
}


function MainCar(){
    PaintBrush.fillStyle = "blue";
    PaintBrush.fillRect(
        Driver.X,
        Driver.Y,
        Driver.Width,
        Driver.Height
    );
}
function ScreenRefresh(){
    if (KeyPress["ArrowLeft"]) { 

        Driver.X -= Driver.Speed;}

    if (KeyPress["ArrowRight"]) { 

        Driver.X += Driver.Speed;}
}



function Main(){
    ScreenRefresh();
    RoadAndMobs();
    MainCar();

    requestAnimationFrame(Main);
}

Main()
