/***************************************************************************/
/* Paso 1: Se definen los codigos shaders.                                 */
/***************************************************************************/
var codigoShaderFragmento = [
    'precision mediump float;',
    '',
    'varying vec4 vColor;',
    '',
    'void main()' ,
    '{',
      'gl_FragColor = vColor;',
    '}'
].join('\n');

codigoShaderVertice = [
    'attribute vec2 aVertices;',
    '',
    'attribute vec4 aColores;',
    '',
    'varying vec4 vColor;',
    '',
    'void main()',
    '{',
    'gl_Position = vec4(aVertices, 0, 1);',
    'vColor = aColores;',
    '}',
].join('\n');
/***************************************************************************/
/* Paso 2: Se prepara el lienzo y se obtiene el contexto del WebGL.        */
/***************************************************************************/

var iniciarDemo = function() {
    console.log("Esto esta tabajando");

    var canvas = document.getElementById('superficie-juego');
    var gl = canvas.getContext('webgl');

    /* hacemos sentencias para navegadores que no soportan WebGL */
    if (!gl) {
        console.log('No soporta WebGL, retrocediendo en experimental-webgl');
        gl = canvas.getContext('experimental-webgl');
    }
    if (!gl) {
        alert('Tu navegador no soporta WebGL');
    }

    /* COLOR DE FONDO - gl.clearColor(R,G,B,A);¨*/
    gl.clearColor(0.74, 0.85, 0.8, 1.0);

    /* INICIALIZA EL BUFFER DE COLOR o PROFUNDIDAD */
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // ajustamos el canvas
    /*
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl.viewport(0, 0, window.innerWidth, window.innerHeight); //Se define la ventana de despliegue
    */

     /***************************************************************************/
    /* Paso 3: Se crean, compilan y enlazan los programas Shader               */
    /***************************************************************************/
    
    /* Se compila el shader de vertice */
    var shaderDeVertice = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(shaderDeVertice, codigoShaderVertice);
    gl.compileShader(shaderDeVertice);
    if (!gl.getShaderParameter(shaderDeVertice, gl.COMPILE_STATUS)) {
        console.error('ERROR en compilar Shader de Vertice!', gl.getShaderInfoLog(shaderDeVertice));
        return;
    }

    /* Se compila el shader de fragmento */
    var shaderDeFragmento = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(shaderDeFragmento, codigoShaderFragmento);
    gl.compileShader(shaderDeFragmento);
    if (!gl.getShaderParameter(shaderDeFragmento, gl.COMPILE_STATUS)) {
        console.error('ERROR en compilar Shader de Fragmento!', gl.getShaderInfoLog(shaderDeFragmento));
        return;
    }
    
    /* Se enlaza ambos shader */
    var programaID = gl.createProgram();
    gl.attachShader(programaID, shaderDeVertice); 
    gl.attachShader(programaID, shaderDeFragmento);
    gl.linkProgram(programaID);
    if (!gl.getProgramParameter(programaID, gl.LINK_STATUS)) {
        console.error('ERROR enlazando el programa!', gl.getProgramInfoLog(programaID));
        return;
    }
    
    /* Validamos el programa*/
    gl.validateProgram(programaID);
    if (!gl.getProgramParameter(programaID, gl.LINK_STATUS)) {
        console.error('ERROR validando el programa!', gl.getProgramInfoLog(programaID));
        return;
    }

    /***************************************************************************/
    /* Paso 4: Se define la geometr�a y se almacenan en los buffers de memoria.*/
    /***************************************************************************/

    /* Las coordenadas cartesianas (x, y) */
    var vertices = 
    [   // X, Y
        -0.9, -0.5,     // 0
        0.9, -0.5,      // 1
        -0.9,  0.5,     // 2
        0.9, -0.5,      // 3
        -0.9,  0.5,     // 4
        0.9,  0.5       // 5
    ];
    /* Obtiene los ID de las variables atributos */
    var aVertices = gl.getAttribLocation(programaID, "aVertices");
    var aColores = gl.getAttribLocation(programaID, "aColores");

    /* Create a buffer for the colors. */
    var colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    // Set the colors.
    setColors(gl);

    /* Create a buffer for the vertices. */
    var verticeBuffer = gl.createBuffer();
    /* Se asigna un nombre (codigo) al buffer */
    gl.bindBuffer(gl.ARRAY_BUFFER, verticeBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    /* Se habilita el ID para el arreglo de colores */
    gl.enableVertexAttribArray(aColores);
    // Unir el color buffer.
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    /* Se especifica el arreglo de colores */
    gl.vertexAttribPointer(
        aColores,    // ubicación del atributo
        4,            // numero de elementos por atributo
        gl.FLOAT,     // tipo de elementos 
        false,                   
        0, // tamaño de un vértice individual
        0             // desplazamiento desde el principio de un vértice simple a este atributo
    );

    /* Se habilita el ID para el arreglo de vertices */
    gl.enableVertexAttribArray(aVertices);
    // unir el vertice buffer.
    gl.bindBuffer(gl.ARRAY_BUFFER, verticeBuffer);
    /* Se especifica el arreglo de vertices */
    gl.vertexAttribPointer(
        aVertices,    // ubicación del atributo
        2,            // numero de elementos por atributo
        gl.FLOAT,     // tipo de elementos 
        false,                   
        0, // tamaño de un vértice individual
        0             // desplazamiento desde el principio de un vértice simple a este atributo
    );
    
    /***************************************************************************/
    /* Paso 5: Se define el bucle de render principal.*/
    /***************************************************************************/

    /* Se instala el programa de shaders para utilizarlo */
     gl.useProgram(programaID);
                                                                                                                                                                                                                                                                                                                                                                                                       
    /* Se renderiza las primitivas desde los datos del arreglo */
    gl.drawArrays(gl.TRIANGLES, 0, 6);  // aqui es cuando queremos cambiar el numero de vertices
};
function setColors(gl) {
    // Pick 2 random colors.
    var r1 = Math.random();
    var b1 = Math.random();
    var g1 = Math.random();
    
    var r2 = Math.random();
    var b2 = Math.random();
    var g2 = Math.random();
  
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(
          [ r1, b1, g1, 1,
            r1, b1, g1, 1,
            r1, b1, g1, 1,
            r2, b2, g2, 1,
            r2, b2, g2, 1,
            r2, b2, g2, 1]),
        gl.STATIC_DRAW);
}