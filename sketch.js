let offsetHora1 = 0;
let diferenciasHorarias = [-3, 3, 4];
let horaIngresada = { hora: 0, minuto: 0 };

function setup() {
  createCanvas(800, 400);
  let entradaHora = createInput('');
  entradaHora.position(20, 30);
  entradaHora.input(actualizarOffset);
  let texto = createP('Coloca una hora (HH:MM):');
  texto.position(20, 0);
}

function draw() {
  background(255);
  dibujarReloj(width / 4, height / 2, offsetHora1, "Madrid");
  dibujarReloj(width / 2, height / 2, offsetHora1 + diferenciasHorarias[1], "Nueva York");
  dibujarReloj(3 * width / 4, height / 2, offsetHora1 + diferenciasHorarias[2], "Buenos Aires");
}

function dibujarReloj(x, y, offsetHora, ciudad) {
  let ahora = new Date();
  let horaLocal = (horaIngresada.hora + offsetHora) % 24;
  if (horaLocal < 0) {
    horaLocal += 24;
  }
  let minutos = horaIngresada.minuto;
  let segundos = ahora.getSeconds();
  
  stroke(0);
  noFill();
  ellipse(x, y, 200);
  dibujarManecilla(x, y, map(horaLocal % 12, 0, 12, 0, 360), 70);
  dibujarManecillaDDA(x, y, map(minutos, 0, 60, 0, 360), 90);
  dibujarManecillaBresenham(x, y, map(segundos, 0, 60, 0, 360), 100);
  
  textSize(24);
  textAlign(CENTER, CENTER);
  let horaFormatoRelojInteligente = nf(horaLocal, 2) + ':' + nf(minutos, 2) + ':' + nf(segundos, 2);
  text(horaFormatoRelojInteligente, x, y + 30);
  
  textSize(14);
  textAlign(CENTER, TOP);
  text(ciudad, x, y + 100);
}

function dibujarManecilla(x, y, angulo, longitud) {
  let finX = x + longitud * cos(radians(angulo - 90));
  let finY = y + longitud * sin(radians(angulo - 90));
  line(x, y, finX, finY);
}

function dibujarManecillaDDA(x, y, angulo, longitud) {
  let endX = x + longitud * cos(radians(angulo - 90));
  let endY = y + longitud * sin(radians(angulo - 90));
  line(x, y, endX, endY);
}

function dibujarManecillaBresenham(x, y, angulo, longitud) {
  let endX = x + longitud * cos(radians(angulo - 90));
  let endY = y + longitud * sin(radians(angulo - 90));
  let dx = endX - x;
  let dy = endY - y;
  let steps = max(abs(dx), abs(dy));
  let incrementX = dx / steps;
  let incrementY = dy / steps;
  let currentX = x;
  let currentY = y;
  
  for (let i = 0; i < steps; i++) {
    point(currentX, currentY);
    currentX += incrementX;
    currentY += incrementY;
  }
}

function actualizarOffset() {
  let valorInput = this.value();
  let partes = valorInput.split(':');
  if (partes.length == 2) {
    horaIngresada.hora = int(partes[0]);
    horaIngresada.minuto = int(partes[1]);
    let ahora = new Date();
    offsetHora1 = (horaIngresada.hora - ahora.getHours()) % 24;
    if (offsetHora1 < 0) {
      offsetHora1 += 24;
    }
  }
}
