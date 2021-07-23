export function __canvasWM({
    container = document.body,
    width = '250px',
    height = '200px',
    textAlign = 'center',
    textBaseline = 'middle',
    font = '15px microsoft yahei',
    fillStyle = 'rgba(184, 184, 184, 0.8)',
    content = '请勿外传',
    rotate = '30',
}) {
    const canvas = document.createElement('canvas');

    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);
    const ctx = canvas.getContext('2d');
    ctx.textAlign = textAlign;
    ctx.textBaseline = textBaseline;
    ctx.font = font;
    ctx.fillStyle = fillStyle;
    ctx.rotate((Math.PI / 180) * rotate);
    ctx.fillText(content, parseFloat(width) / 2, parseFloat(height) / 2);
    const base = canvas.toDataURL();
    const watermarkDiv = document.createElement('div');
    watermarkDiv.setAttribute(
        'style',
        `
          position:fixed;
          top:0;
          left:0;
          width:100%;
          height:100%;
          z-index:${9999999999};
          pointer-events:none;
          background-repeat:repeat;
          background-image:url('${base}');
          color:grey;
          opacity: 0.5`
    );

    container.style.position = 'relative';
    container.insertBefore(watermarkDiv, container.firstChild);
}
