const Canvas = document.getElementById("GameScreen");
const PaintBrush = Canvas.getContext("2d");

let KeyPress = {};

window.addEventListener("keydown", function(Pressed) {
    KeyPress[Pressed.key] = true;
});

window.addEventListener("keyup", function(Released) {
    KeyPress[Released.key] = false;
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


}



let Driver = { 
    X: (Canvas.width / 2) - 25,
    Y: Canvas.height - 80,
    Width: 50,
    Height: 50,
    Speed: 5
}

function ScreenRefresh(){
    if Keys["ArrowLeft"](){ Driver.X -= Driver.Speed; }
    if Keys["ArrowRight"](){ Driver.X += Driver.Speed; }
    if Keys["ArrowUp"](){ Driver.Y -= Driver.Speed; }
    if Keys["ArrowDown"](){ Driver.Y += Driver.Speed; }

}



function Main(){
    RoadAndMobs();

}


