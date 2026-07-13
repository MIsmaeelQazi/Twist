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
// top Wheels
    // Left Wheel
    PaintBrush.fillStyle = "black";
    PaintBrush.fillRect(
    X - 8,
    Y + 20,
    16,
    32 );

    // Right Wheel
    PaintBrush.fillRect(
    X + Width - 8,
    Y + 20,
    16,
    32
);
// Bottom Wheels
    // Left Wheel
    PaintBrush.fillRect(
    X - 8,
    Y + 85,
    16,
    32
);
// Right Wheel
    PaintBrush.fillRect(
    X + Width - 8,
    Y + 85,
    16,
    32
);
    // car body
    PaintBrush.fillStyle = Color;
    PaintBrush.fillRect(
    X,
    Y,
    Width,
    Height
    );
    // WindScreen
    PaintBrush.fillStyle = "#8FD3FF";   
    PaintBrush.fillRect(
    X + 10,
    Y + 15,
    55,
    30
);

    //Rear Window
    PaintBrush.fillRect(
    X + 10,
    Y + 75,
    55,
    25
);

}

let colors = ["red", "green", "yellow", "orange", "purple", "pink", "brown", "black"];
let Mobs = [];

Mobs.push({
     X: 350,
    Y: 0,
    Width: 75,
    Height: 140,
    Speed: 3
});


function RoadAndMobs(){
    // Road 
    PaintBrush.fillStyle = "gray";
    PaintBrush.fillRect(0, 0, 800, 800);
    
    // Road Lines
    let LineX = 150;

    for (let _ = 0; _ <= 4; _++) {

        PaintBrush.beginPath();
        PaintBrush.moveTo(LineX, 0);
        PaintBrush.lineTo(LineX, Canvas.height);
        PaintBrush.stroke();

        LineX += 125;
    }

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
    Y: Canvas.height - 220,
    Width: 75,
    Height: 140,
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
    PaintBrush.clearRect(0, 0, Canvas.width, Canvas.height);
    ScreenRefresh();
    RoadAndMobs();
    MainCar();

    requestAnimationFrame(Main);
}

Main()
