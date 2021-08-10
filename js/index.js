var colors = ["#d9ca00", "#f3e401", "#d9ca00", "#f3e401", "#d9ca00", "#f3e401", "#d9ca00", "#f3e401", "#d9ca00", "#f3e401"];
var quienes = ["ничего", "скидка на все 300руб", "скидка на все 10%", "увы, в другой раз", "скидка на все 5%",
    "секретная акция", "подарок сюрприз", "скидка на все 1000 руб", "увы, в другой раз", "бесплатная", "доставка"
];


var startAngle = 0;
var arc = Math.PI / 5;
var spinTimeout = null;
var spinArcStart = 10;
var spinTime = 10;
var spinTimeTotal = 10;
var ctx;

function drawRouletteWheel() {
    let canvas = document.getElementById("wheelcanvas");
    if (canvas.getContext) {
        let outsideRadius = 240;
        let textRadius = 140;
        let insideRadius = 0;
        ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, 700, 700);
        ctx.strokeStyle = "#ffef06"; // Цвет границ

        ctx.save();

        //Обводка 2 круга
        ctx.fillStyle = '#ffef06'; //цвет 2 внутреннего круга обводки
        ctx.beginPath();
        ctx.arc(250, 250, outsideRadius + 9, 0, 2 * Math.PI);
        ctx.strokeStyle = "#000"; // Цвет границ
        ctx.fill();
        ctx.stroke();
        ctx.restore();

        for (let i = 0; i < 10; i++) {

            let angle = startAngle + i * arc;
            ctx.fillStyle = colors[i];
            ctx.beginPath(); //контур
            ctx.arc(250, 250, outsideRadius, angle, angle + arc, false); //дуга
            ctx.arc(250, 250, insideRadius, angle + arc, angle, true); //дуга
            ctx.stroke(); //фигура
            ctx.fill();
            ctx.save();
            
            ctx.fillStyle = "#000";//ЦВЕТ ТЕКСТА 
            ctx.font = "14px Arial";
            ctx.translate(250 + Math.cos(angle + arc / 2) * textRadius, 250 + Math.sin(angle + arc / 2) * textRadius);
            ctx.rotate(angle + arc / 3 + Math.PI / 150); //Поворачиваем текст
            let text = quienes[i];
            ctx.fillText(text, -ctx.measureText(text).width / 2.3, 0)
            //ctx.stroke();
            ctx.restore(); //Возвращает ранее сохраненное состояние и атрибуты
        }
        //Arrow  на канвасе
        ctx.strokeStyle = 'gray'; // Set line colour.
        ctx.fillStyle = 'gray'; // Set fill colour.
        ctx.lineWidth = 1;
        ctx.beginPath(); // Begin path.
        ctx.moveTo(250 - 6, 250 - (265 + 15));
        ctx.lineTo(250 + 6, 250 - (265 + 15));
        ctx.lineTo(250 + 6, 250 - (265 - 15));
        ctx.lineTo(250 + 15, 250 - (265 - 15));
        ctx.lineTo(250 + 0, 250 - (265 - 33));
        ctx.lineTo(250 - 15, 250 - (265 - 15));
        ctx.lineTo(250 - 6, 250 - (265 - 15));
        ctx.lineTo(250 - 6, 250 - (265 + 15));
        ctx.stroke();
        ctx.fill();
    }
}

function rotateWheel() {
    clearTimeout(spinTimeout);
    spinTime += 9; //Как долго будет крутиться

    if (spinTime >= spinTimeTotal) {
        stopRotateWheel();
        return;
    }
    let spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal); //метод easeout - анимация в обратном порядке
    startAngle += (spinAngle * Math.PI / 180);
    drawRouletteWheel();
    spinTimeout = setInterval('rotateWheel()'); // вызываем круг один раз, через определенный интервал времени
}

// При остановке прокрутки, будет показывать число по середине круга.
function stopRotateWheel() {
    let degrees = startAngle * 180 / Math.PI + 90;
    console.log(degrees);
    let arcd = arc * 180 / Math.PI;
    let index = Math.floor((360 - degrees % 360) / arcd);
    console.log(index);
    ctx.save();
    let text = quienes[index]
    ctx.restore();
    //убираем 1 часть
    document.querySelector('.first-part').classList.add("no-active");
    document.querySelector('.second-part').classList.remove("no-active");
    console.log(text);
    //document.querySelector('.win-text').innerHTML = text;  
}

function easeOut(t, b, c, d) {
    let ts = (t /= d) * t;
    let tc = ts * t;
    return b + c * (tc + -3 * ts + 3 * t);
}

function spin() {
    spinAngleStart = Math.floor(Math.random() * 16 + 16); //random - Возвращает случайное число между 0 и 1 * 100
    spinTime = 0;
    spinTimeTotal = Math.random() * 3 + 4 * 1500;
    rotateWheel();
}
drawRouletteWheel();
