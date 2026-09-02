// productos.js — Catálogo de álbumes de SoundWave.
// Fuente única de datos: la usan carrito.html (precio/imagen/formato)
// y catalogo.html (etiquetas, resumen, pistas, reseñas).

const PRODUCTOS_SOUNDWAVE = [
    {
        id: "1",
        titulo: "Demon Days SM64 Soundfont Cover",
        precio: 4990,
        imagen: "assets/img/Screenshot_1.png",
        detalle: "detalle_1.html",
        formato: "MP3, WAV, Soundfont · Descarga digital",
        artista: "More Tsua",
        etiquetas: ["Soundfont", "SM64", "Cover", "N64", "Gorillaz", "Remix"],
        resumen: "El clásico Demon Days de Gorillaz reinterpretado con el soundfont de Super Mario 64. Un álbum completo con el punch de Feel Good Inc. y el brillo pixelado de N64.",
        reseña: { texto: "Muy positivas", porcentaje: 94, cantidad: 128 },
        pistas: [
            { titulo: "Intro", duracion: "1:04" },
            { titulo: "Last Living Souls", duracion: "3:11" },
            { titulo: "Kids With Guns", duracion: "3:46" },
            { titulo: "O Green World", duracion: "4:32" },
            { titulo: "Dirty Harry", duracion: "3:44" },
            { titulo: "Feel Good Inc.", duracion: "3:41", destacada: true },
            { titulo: "El Mañana", duracion: "3:50" },
            { titulo: "Every Planet We Reach Is Dead", duracion: "4:53" },
            { titulo: "November Has Come", duracion: "2:41" },
            { titulo: "All Alone", duracion: "3:30" },
            { titulo: "White Light", duracion: "2:09" },
            { titulo: "DARE", duracion: "4:05" },
            { titulo: "Fire Coming Out of the Monkey's Head", duracion: "3:17" },
            { titulo: "Don't Get Lost in Heaven", duracion: "2:01" },
            { titulo: "Demon Days", duracion: "4:29" }
        ]
    },
    {
        id: "2",
        titulo: "In Utero SM64 Soundfont Cover",
        precio: 4990,
        imagen: "assets/img/Screenshot_2.png",
        detalle: "detalle_2.html",
        formato: "MP3, WAV, Soundfont · Descarga digital",
        artista: "More Tsua",
        etiquetas: ["Soundfont", "SM64", "Cover", "N64", "Nirvana", "In Utero"],
        resumen: "El clásico In Utero de Nirvana, reconstruido con el soundfont de Super Mario 64. Peach alza las alas sobre un pergamino N64 y el álbum entero suena a cartucho de 1996.",
        reseña: { texto: "Muy positivas", porcentaje: 91, cantidad: 86 },
        pistas: [
            { titulo: "Serve the Servants", duracion: "3:36" },
            { titulo: "Scentless Apprentice", duracion: "3:48" },
            { titulo: "Heart-Shaped Box", duracion: "4:41", destacada: true },
            { titulo: "Rape Me", duracion: "2:50" },
            { titulo: "Frances Farmer Will Have Her Revenge on Seattle", duracion: "4:09" },
            { titulo: "Dumb", duracion: "2:32" },
            { titulo: "Very Ape", duracion: "1:56" },
            { titulo: "Milk It", duracion: "3:55" },
            { titulo: "Pennyroyal Tea", duracion: "3:37" },
            { titulo: "Radio Friendly Unit Shifter", duracion: "4:51" },
            { titulo: "tourette's", duracion: "1:35" },
            { titulo: "All Apologies", duracion: "3:51" }
        ]
    },
    {
        id: "3",
        titulo: "Nevermind SM64 Soundfont Cover",
        precio: 4990,
        imagen: "assets/img/Screenshot_3.png",
        detalle: "detalle_3.html",
        formato: "MP3, WAV, Soundfont · Descarga digital",
        artista: "More Tsua",
        etiquetas: ["Soundfont", "SM64", "Cover", "N64", "Nirvana", "Nevermind"],
        resumen: "El clásico Nevermind de Nirvana, reconstruido con el soundfont de Super Mario 64. Un pingüino N64 persigue una Super Star en lugar del billete, y Smells Like Teen Spirit suena a cubo de hielo.",
        reseña: { texto: "Extremadamente positivas", porcentaje: 96, cantidad: 203 },
        pistas: [
            { titulo: "Smells Like Teen Spirit", duracion: "5:01", destacada: true },
            { titulo: "In Bloom", duracion: "4:14" },
            { titulo: "Come as You Are", duracion: "3:39" },
            { titulo: "Breed", duracion: "3:03" },
            { titulo: "Lithium", duracion: "4:17" },
            { titulo: "Polly", duracion: "2:57" },
            { titulo: "Territorial Pissings", duracion: "2:23" },
            { titulo: "Drain You", duracion: "3:43" },
            { titulo: "Lounge Act", duracion: "2:36" },
            { titulo: "Stay Away", duracion: "3:32" },
            { titulo: "On a Plain", duracion: "3:16" },
            { titulo: "Something in the Way", duracion: "3:52" }
        ]
    },
    {
        id: "4",
        titulo: "Facelift SM64 Soundfont Cover",
        precio: 4990,
        imagen: "assets/img/Screenshot_4.png",
        detalle: "detalle_4.html",
        formato: "MP3, WAV, Soundfont · Descarga digital",
        artista: "Peach in Chains",
        etiquetas: ["Soundfont", "SM64", "Cover", "N64", "Grunge", "Facelift"],
        resumen: "El debut Facelift reinterpretado por Peach in Chains con el soundfont de Super Mario 64. La cara elástica de Mario ocupa el lugar del artwork original y Man in the Box suena a cartucho sucio de 1996.",
        reseña: { texto: "Muy positivas", porcentaje: 89, cantidad: 74 },
        pistas: [
            { titulo: "We Die Young", duracion: "2:32" },
            { titulo: "Man in the Box", duracion: "4:46", destacada: true },
            { titulo: "Sea of Sorrow", duracion: "5:49" },
            { titulo: "Bleed the Freak", duracion: "4:01" },
            { titulo: "I Can't Remember", duracion: "3:42" },
            { titulo: "Love, Hate, Love", duracion: "6:26" },
            { titulo: "It Ain't Like That", duracion: "4:37" },
            { titulo: "Sunshine", duracion: "4:44" },
            { titulo: "Put You Down", duracion: "3:16" },
            { titulo: "Confusion", duracion: "5:44" },
            { titulo: "I Know Somethin (Bout You)", duracion: "4:22" },
            { titulo: "Real Thing", duracion: "4:03" }
        ]
    },
    {
        id: "5",
        titulo: "Super Black Parade 64 Soundfont Cover",
        precio: 4990,
        imagen: "assets/img/Screenshot_5.png",
        detalle: "detalle_5.html",
        formato: "MP3, WAV, Soundfont · Descarga digital",
        artista: "More Tsua",
        etiquetas: ["Soundfont", "SM64", "Cover", "N64", "Emo", "MCR"],
        resumen: "The Black Parade de My Chemical Romance, reconstruido con el soundfont de Super Mario 64. Un Shy Guy dirige la banda y Welcome to the Black Parade suena a desfile dentro de un cartucho.",
        reseña: { texto: "Muy positivas", porcentaje: 93, cantidad: 156 },
        pistas: [
            { titulo: "The End.", duracion: "1:52" },
            { titulo: "Dead!", duracion: "3:15" },
            { titulo: "This Is How I Disappear", duracion: "3:59" },
            { titulo: "The Sharpest Lives", duracion: "3:28" },
            { titulo: "Welcome to the Black Parade", duracion: "5:11", destacada: true },
            { titulo: "I Don't Love You", duracion: "3:58" },
            { titulo: "House of Wolves", duracion: "3:04" },
            { titulo: "Cancer", duracion: "2:22" },
            { titulo: "Mama", duracion: "4:39" },
            { titulo: "Sleep", duracion: "4:43" },
            { titulo: "Teenagers", duracion: "2:41" },
            { titulo: "Disenchanted", duracion: "4:55" },
            { titulo: "Famous Last Words", duracion: "4:59" }
        ]
    },
    {
        id: "6",
        titulo: "...And Justice for All SM64 Soundfont Cover",
        precio: 4990,
        imagen: "assets/img/Screenshot_6.png",
        detalle: "detalle_6.html",
        formato: "MP3, WAV, Soundfont · Descarga digital",
        artista: "More Tsua",
        etiquetas: ["Soundfont", "SM64", "Cover", "N64", "Metallica", "Thrash"],
        resumen: "El clásico ...And Justice for All de Metallica, reconstruido con el soundfont de Super Mario 64. Peach sostiene un hongo y una espada mientras One suena a thrash de cartucho.",
        reseña: { texto: "Muy positivas", porcentaje: 92, cantidad: 118 },
        pistas: [
            { titulo: "Blackened", duracion: "6:41" },
            { titulo: "...And Justice for All", duracion: "9:46" },
            { titulo: "Eye of the Beholder", duracion: "6:25" },
            { titulo: "One", duracion: "7:26", destacada: true },
            { titulo: "The Shortest Straw", duracion: "6:35" },
            { titulo: "Harvester of Sorrow", duracion: "5:45" },
            { titulo: "The Frayed Ends of Sanity", duracion: "7:44" },
            { titulo: "To Live Is to Die", duracion: "9:49" },
            { titulo: "Dyers Eve", duracion: "5:13" }
        ]
    }
];

function buscarProductoSW(idProducto) {
    return PRODUCTOS_SOUNDWAVE.find((producto) => producto.id === idProducto);
}
