gameTileImages=['A','B','C','D'];
var text;

function shuffler(gametileimages) {
    'use strict'
    var d;
    var skalBytte;
    var byttesMed;
    var temp
    for(d=0;d=gametileimages.length;d=d+2) {
        gametileimages.splice(d+1,0,gametileimages[d]);
    }
    return gametileimages;
}

text=shuffler(gameTileImages);

document.write(text);
