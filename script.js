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
    PaintBrush.moveTo(261, 0);      
    PaintBrush.lineTo(261, Canvas.height);
    PaintBrush.moveTo(531, 0);      
    PaintBrush.lineTo(531, Canvas.height);

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
