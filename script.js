const Canvas = document.getElementById("GameScreen");
const PaintBrush = Canvas.getContext("2d");

let KeyPress = {};
let GameOver = false;
let Score = 0;
let HighScore = localStorage.getItem("HighScore") || 0;
let Spawn = 1;
let RateSpawn = 60;
let RoadPositions = [38, 175, 300, 425, 550, 688];

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
    Y + 95,
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
    let X = 150;

    for (let _ = 0; _ <= 4; _++) {

        PaintBrush.beginPath();
        PaintBrush.moveTo(X, 0);
        PaintBrush.lineTo(X, Canvas.height);
        PaintBrush.stroke();

        X += 125;
    }

    // Mobs 
    Spawn++;
    if (Spawn >= RateSpawn) {
        Spawn = 0;
        
        let Amount = Math.floor(Math.random() * 3) + 1;

        for (let i = 0; i < Amount; i++) {

            let Lane = Math.floor(Math.random() * RoadPositions.length);

            Mobs.push({
                X: RoadPositions[Lane],
                Y: -140,
                Width: 75,
                Height: 140,
                Speed: 3
            });

        }

        for (let i = 0; i < Mobs.length; i++) {

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
    if(!GameOver){
        PaintBrush.clearRect(0, 0, Canvas.width, Canvas.height);
        ScreenRefresh();
        RoadAndMobs();
        MainCar();
        
        requestAnimationFrame(Main);
};
}

Main()
