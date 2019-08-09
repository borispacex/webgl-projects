/***************************************************************************/
/* Paso 1: Se definen los codigos shaders.                                 */
/***************************************************************************/
var codigoShaderFragmento = [
    'precision mediump float;',
    '',
    'varying vec3 vColor;',
    'void main()',
    '{',
    '   gl_FragColor = vec4(vColor, 1.0);',
    '}'
].join('\n');

codigoShaderVertice = [
    'precision mediump float;',
    '',
    'attribute vec2 aVertices;',
    'attribute vec3 aColores;',
    'varying vec3 vColor;',
    'uniform vec4 translation;',
    '',
    'void main()',
    '{',
    '  vColor = aColores;',
    '  gl_Position = vec4(aVertices, 0.0, 1.0)+translation;',
    '}'
].join('\n');

/***************************************************************************/
/* Paso 2: Se prepara el lienzo y se obtiene el contexto del WebGL.        */
/***************************************************************************/

var iniciarDemo = function() {
    
    function inicia() {
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
            return null;
        }
    
        /* COLOR DE FONDO - gl.clearColor(R,G,B,A);¨*/
        gl.clearColor(0.95, 0.99, 0.90, 1.0);
    
        /* INICIALIZA EL BUFFER DE COLOR o PROFUNDIDAD */
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        return gl;
    }
    var programaID;
     /***************************************************************************/
    /* Paso 3: Se crean, compilan y enlazan los programas Shader               */
    /***************************************************************************/
    function compilaEnlazaLosShaders(gl) {
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
        programaID = gl.createProgram();
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
    }
    /***************************************************************************/
    /* Paso 4: Se define la geometria y se almacenan en los buffers de memoria.*/
    /***************************************************************************/
    var vertices = [];
    var a1 = 
    [
        // X, Y         R , G , B
        -0.4, 0.9,      47/255, 70/255, 78/255,
        -0.63, 0.97,    47/255, 70/255, 78/255,
        -0.71, 0.49,    47/255, 70/255, 78/255
    ];
    var a2 = 
    [
        // X, Y         R , G , B
        0.37, 0.9,      47/255, 70/255, 78/255,
        0.6, 0.97,      47/255, 70/255, 78/255,
        0.69, 0.49,     47/255, 70/255, 78/255
    ];
    var a3 = 
    [
        // X, Y         R , G , B
        -0.33, 0.46,      185/255, 185/255, 177/255,
        -0.49, 0.77,      185/255, 185/255, 177/255,
        -0.395, 0.9,     185/255, 185/255, 177/255
    ];
    var a4 = 
    [
        // X, Y         R , G , B
        0.3, 0.46,      185/255, 185/255, 177/255,
        0.37, 0.89,      185/255, 185/255, 177/255,
        0.47, 0.765,     185/255, 185/255, 177/255
    ];




    var a27 = 
    [
        // X, Y         R , G , B
        -0.34, -0.03,      0.0, 0.0, 0.0,
        -0.4, 0.061,          0.0, 0.0, 0.0,
        -0.21, 0.072,      0.0, 0.0, 0.0,
        -0.12, 0.0,     0.0, 0.0, 0.0
    ];
    var a28 = 
    [
        // X, Y         R , G , B
        0.1, 0.0,      0.0, 0.0, 0.0,
        0.18, 0.085,      0.0, 0.0, 0.0,
        0.37, 0.089,      0.0, 0.0, 0.0,
        0.3, -0.01,     0.0, 0.0, 0.0
    ];












    /*
    var a60 = 
    [
        // X, Y         R , G , B
        -0.45, -0.77,      1.0, 0.0, 0.0,
        -0.47, -0.62,      1.0, 0.0, 0.0,
        -0.33, -0.47,     1.0, 0.0, 0.0
    ];
    var a61 = 
    [
        // X, Y         R , G , B
        0.3, 0.46,      1.0, 0.0, 0.0,
        0.37, 0.89,      1.0, 0.0, 0.0,
        0.47, 0.765,     1.0, 0.0, 0.0
    ];
    var a62 = 
    [
        // X, Y         R , G , B
        -0.3, -0.46,      1.0, 0.0, 0.0,
        -0.37, -0.89,      1.0, 0.0, 0.0,
        -0.47, -0.765,     1.0, 0.0, 0.0
    ];
    var a63 = 
    [
        // X, Y         R , G , B
        0.3, -0.46,      1.0, 0.0, 0.0,
        0.37, -0.89,      1.0, 0.0, 0.0,
        0.47, -0.765,     1.0, 0.0, 0.0
    ];
    var a64 = 
    [
        // X, Y         R , G , B
        -0.3, -0.46,      1.0, 0.0, 0.0,
        -0.37, -0.89,      1.0, 0.0, 0.0,
        -0.47, -0.765,     1.0, 0.0, 0.0
    ];
    var a65 = 
    [
        // X, Y         R , G , B
        0.3, -0.46,      1.0, 0.0, 0.0,
        0.37, -0.89,      1.0, 0.0, 0.0,
        0.47, -0.765,     1.0, 0.0, 0.0
    ];
    var a66 = 
    [
        // X, Y         R , G , B
        -0.3, -0.46,      1.0, 0.0, 0.0,
        -0.37, -0.89,      1.0, 0.0, 0.0,
        -0.47, -0.765,     1.0, 0.0, 0.0
    ];
    var a67 = 
    [
        // X, Y         R , G , B
        0.3, -0.46,      1.0, 0.0, 0.0,
        0.37, -0.89,      1.0, 0.0, 0.0,
        0.47, -0.765,     1.0, 0.0, 0.0
    ];
    var a68 = 
    [
        // X, Y         R , G , B
        -0.3, -0.46,      1.0, 0.0, 0.0,
        -0.37, -0.89,      1.0, 0.0, 0.0,
        -0.47, -0.765,     1.0, 0.0, 0.0
    ];
    var a69 = 
    [
        // X, Y         R , G , B
        0.3, -0.46,      1.0, 0.0, 0.0,
        0.37, -0.89,      1.0, 0.0, 0.0,
        0.47, -0.765,     1.0, 0.0, 0.0
    ];
    */
    function inicializaLosBuffers(gl) {
        /* Se genera un nombre (codigo) para el buffer */ 
        var verticeBuffer = gl.createBuffer();
        /* Se asigna un nombre (codigo) al buffer */
        gl.bindBuffer(gl.ARRAY_BUFFER, verticeBuffer);
        /* Obtiene los ID de las variables atributos */
        var aVertices = gl.getAttribLocation(programaID, 'aVertices'); 
        var aColores = gl.getAttribLocation(programaID, "aColores"); 
        /* Se especifica el arreglo de vertices */
        gl.vertexAttribPointer(
            aVertices,    // ubicación del atributo
            2,            // numero de elementos por atributo
            gl.FLOAT,     // tipo de elementos 
            gl.FALSE,                   
            5 * Float32Array.BYTES_PER_ELEMENT, // tamaño de un vértice individual
            0             // desplazamiento desde el principio de un vértice simple a este atributo
        );
        /* Se especifica el arreglo de colores */
        gl.vertexAttribPointer(
            aColores,       // ubicación del atributo
            3,              // numero de elementos por atributo
            gl.FLOAT,       // tipo de elementos
            gl.FALSE,
            5 * Float32Array.BYTES_PER_ELEMENT,     // tamaño de un vértice individual
            2 * Float32Array.BYTES_PER_ELEMENT // desplazamiento desde el principio de un vértice simple a este atributo
        );
        /* Se habilita el ID para el arreglo de vertices */
        gl.enableVertexAttribArray(aVertices);
        /* Se habilita el ID para el arreglo de colores */
        gl.enableVertexAttribArray(aColores);
    }

    function darPuntos(gl,r,g,b,radio) {
        vertices = [];
        for (var i = 0; i < 360; i++) {
            vertices.push(radio * Math.cos(i * Math.PI / 180));
            vertices.push(radio * Math.sin(i * Math.PI / 180));

            vertices.push(r);     // R
            vertices.push(g);     // G
            vertices.push(b);     // B
         }
    }

    /***************************************************************************/
    /* Paso 5: Se define el bucle de render principal.*/
    /***************************************************************************/
    function dibuja(gl, llenado) {
        /* Se instala el programa de shaders para utilizarlo */

        gl.useProgram(programaID);
        /************************** BUFFER 1 *******************/
        /* Se transfiere los datos desde la memoria nativa al buffer de la GPU */
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);                                                                                                                                                                                                                                                                                                                                                                             
        /* Se renderiza las primitivas desde los datos del arreglo */
        if(llenado){
            gl.drawArrays(gl.TRIANGLE_FAN, 0, 360);  // aqui es cuando queremos cambiar el numero de vertices
        }else {
            gl.drawArrays(gl.LINE_LOOP, 0, 360);  // aqui es cuando queremos cambiar el numero de vertices
        }
    }

    var gl = inicia();
    compilaEnlazaLosShaders(gl);
    gl.useProgram(programaID);
    inicializaLosBuffers(gl);
    
    // 1
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(a1), gl.STATIC_DRAW);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    // 2
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(a2), gl.STATIC_DRAW);
    gl.drawArrays(gl.TRIANGLES, 0, 3); 
    // 3
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(a3), gl.STATIC_DRAW);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    // 4
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(a4), gl.STATIC_DRAW);
    gl.drawArrays(gl.TRIANGLES, 0, 3);



    // 27
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(a27), gl.STATIC_DRAW);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
    // 28
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(a28), gl.STATIC_DRAW);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);




    // mover
    var translation = gl.getUniformLocation(programaID, 'translation');
    var radio = 0.039;
    var llenado = true;
    // ojo 1
    gl.uniform4f(translation, -0.25, 0.025, 0.0, 0.0);
    darPuntos(gl, 1.0, 1.0, 0.0, radio) // YELLOW
    dibuja(gl, llenado);
    // ojo 2
    gl.uniform4f(translation, 0.22, 0.039, 0.0, 0.0);
    darPuntos(gl, 1.0, 1.0, 0.0, radio) // YELLOW
    dibuja(gl, llenado);
};