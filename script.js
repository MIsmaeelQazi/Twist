const Canvas = document.getElementById("GameScreen");
const PaintBrush = Canvas.getContext("2d");

let KeyPress = {};


window.addEventListener("keydown", function(Pressed) {
    KeyPress[Pressed.key] = true;
});

window.addEventListener("keyup", function(Released) {
    KeyPress[Released.key] = false;
});

function Car(X, Y, Width, Height, Color){
    PaintBrush.fillStyle = Color;
    PaintBrush.fillRect(
    X,
    Y,
    Width,
    Height
    );
    // top Wheels
    // Left Wheel
    PaintBrush.fillStyle = "black";
    PaintBrush.fillRect(
    X - 4,
    Y + 8,
    6,
    12
);
// Right Wheel
    PaintBrush.fillStyle = "black";
    PaintBrush.fillRect(
    X + 44,
    Y + 8,
    6,
    12
);
// Bottom Wheels
    // Left Wheel
    PaintBrush.fillStyle = "black";
    PaintBrush.fillRect(
    X - 4,
    Y + 44,
    6,
    12
);
// Right Wheel
    PaintBrush.fillStyle = "black";
    PaintBrush.fillRect(
    X + 44,
    Y + 44,
    6,
    12
);



}

let colors = ["red", "green", "yellow", "orange", "purple", "pink", "brown", "black"];
let Mobs = [];

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

        Car(
            Mobs[i].X,
            Mobs[i].Y,
            Mobs[i].Width,
            Mobs[i].Height,
        "red"
        );
    }
}



let Driver = { 
    X: (Canvas.width / 2) - 25,
    Y: Canvas.height - 80,
    Width: 50,
    Height: 50,
    Speed: 5
}


function MainCar(){
    Car(
        Driver.X,
        Driver.Y,
        Driver.Width,
        Driver.Height,
        "blue"
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
