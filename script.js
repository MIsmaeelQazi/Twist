const Canvas = document.getElementById("GameScreen");
const PaintBrush = Canvas.getContext("2d");

function RoadAndMobs(){
    // Road 
    PaintBrush.fillStyle = "gray";
    PaintBrush.fillRect(0, 0, 800, 800);
    
    // Road Lines
    PaintBrush.strokeStyle = "white";
    PaintBrush.lineWidth = 3;
    PaintBrush.setLineDash([25, 20]);

    PaintBrush.beginPath();

    PaintBrush.moveTo(397, 0);      // Middle of the road
    PaintBrush.lineTo(397, Canvas.height);

    PaintBrush.stroke();

    PaintBrush.setLineDash([]);



}



function Car(){
    // Draw Main Car 
    PaintBrush.fillStyle = "blue";
    PaintBrush.fillRect(100, 100, 50, 50);



}

RoadAndMobs();
Car();
