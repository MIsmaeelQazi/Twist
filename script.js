const Canvas = document.getElementById("GameScreen");
const PaintBrush = Canvas.getContext("2d", { willReadFrequently: true });

let KeyPress = {};
let GameOver = false;
let Score = 0;
let HighScore = localStorage.getItem("HighScore") || 0;
let Spawn = 1;
let RateSpawn = 120;

let GrassWidth = 60;
let RoadLeft = GrassWidth;
let RoadRight = Canvas.width - GrassWidth;
let LaneCount = 6;
let LaneWidth = (RoadRight - RoadLeft) / LaneCount;
let CarWidth = 75;

let RoadPositions = [];
for (let i = 0; i < LaneCount; i++) {
    RoadPositions.push(RoadLeft + i * LaneWidth + (LaneWidth - CarWidth) / 2);
}

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
    PaintBrush.fillStyle = "#9eb7c7";   
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

let colors = ["red", "green", "yellow", "orange", "purple", "pink", "brown"];
let Mobs = [];

Mobs.push({
    X: RoadPositions[Math.floor(Math.random() * RoadPositions.length)],
    Y: -140,
    Width: CarWidth,
    Height: 140,
    Speed: 3,
    Color : colors[Math.floor(Math.random() * colors.length)]
});


function RoadAndMobs(){
    // Grass
    PaintBrush.fillStyle = "green";
    PaintBrush.fillRect(0, 0, GrassWidth, Canvas.height);
    PaintBrush.fillRect(RoadRight, 0, GrassWidth, Canvas.height);

    // Road
    PaintBrush.fillStyle = "gray";
    PaintBrush.fillRect(RoadLeft, 0, RoadRight - RoadLeft, Canvas.height);

    // Road Lines
    for (let i = 1; i < LaneCount; i++) {

        let X = RoadLeft + i * LaneWidth;

        PaintBrush.beginPath();
        PaintBrush.moveTo(X, 0);
        PaintBrush.lineTo(X, Canvas.height);
        PaintBrush.stroke();
    }
}
function Mob(){
    Spawn++;
    if (Spawn >= RateSpawn) {
        Spawn = 0;

        let Amount = Math.floor(Math.random() * 3) + 1;
        let ShuffledLanes = [...RoadPositions].sort(() => Math.random() - 0.5);

        for (let _ = 0; _ < Amount; _++) {

            Mobs.push({
                X: ShuffledLanes[_],
                Y: -140,
                Width: CarWidth,
                Height: 140,
                Speed: 3,
                Color : colors[Math.floor(Math.random() * colors.length)]
            });

        }

    }

    for (let _ = 0; _ < Mobs.length; _++) {

            Mobs[_].Y += Mobs[_].Speed;

            Car(
                Mobs[_].X,
                Mobs[_].Y,
                Mobs[_].Width,
                Mobs[_].Height,
                Mobs[_].Color
            );

        if (Mobs[_].Y > Canvas.height) {
            Score++;
            Mobs.splice(_, 1);
            _--;
            }
            
        }
    }



let Driver = { 
    X: RoadPositions[Math.floor(LaneCount / 2)],
    Y: Canvas.height - 220,
    Width: CarWidth,
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

    Driver.X = Math.max(RoadLeft, Math.min(RoadRight - Driver.Width, Driver.X));
}



function Main(){
    if(!GameOver){
        PaintBrush.clearRect(0, 0, Canvas.width, Canvas.height);
        ScreenRefresh();
        RoadAndMobs();
        MainCar();
        Mob();

        // collision check - look at 4 corners of the driver's body,
        // if any of them isn't pure blue anymore, something got painted on top of it
        let Corners = [
            [Driver.X + 2, Driver.Y + 2],
            [Driver.X + Driver.Width - 2, Driver.Y + 2],
            [Driver.X + 2, Driver.Y + Driver.Height - 2],
            [Driver.X + Driver.Width - 2, Driver.Y + Driver.Height - 2]
        ];

        for (let i = 0; i < Corners.length; i++) {
            let Pixel = PaintBrush.getImageData(Corners[i][0], Corners[i][1], 1, 1).data;
            if (!(Pixel[0] === 0 && Pixel[1] === 0 && Pixel[2] === 255)) {
                GameOver = true;
            }
        }

        if (GameOver) {
            if (Score > HighScore) {
                HighScore = Score;
                localStorage.setItem("HighScore", HighScore);
            }
        }

        PaintBrush.fillStyle = "white";
        PaintBrush.font = "20px sans-serif";
        PaintBrush.fillText("Score: " + Score, 10, 30);
        PaintBrush.fillText("High Score: " + HighScore, 10, 55);

        requestAnimationFrame(Main);
};
}

Main()