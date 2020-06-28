ready(function() {
    document.querySelectorAll('.top .input-max-width button[type=button]')[0].addEventListener('click', clickConvert);
    document.querySelectorAll('.top .input-max-width button[type=button]')[1].addEventListener('click', clickReset);
    document.querySelectorAll('.top .copy-reset button[type=button]')[0].addEventListener('click', clickCopy);
    document.querySelectorAll('.top .copy-reset button[type=button]')[1].addEventListener('click', clickReset);
});

var clickConvert = function() {
    var viewPortWidth = document.querySelector('.top .input-max-width input[name=viewPortWidth]').value;
        viewPortWidth = Number(viewPortWidth);
    var pxCss = document.querySelector('.input-px-css textarea').value;
    var vwCss = convertCss(viewPortWidth, pxCss);
    document.querySelector('.input-px-css textarea').classList.remove('active');
    document.querySelector('.input-px-css pre').textContent = vwCss;
    document.querySelector('.input-px-css pre').classList.add('active');
    document.querySelector('.top .input-max-width').classList.remove('active');
    document.querySelector('.top .copy-reset').classList.add('active');
};

var clickCopy = function() {
    var vwCss = document.querySelector('.input-px-css pre').childNodes[0];
    var range = document.createRange();
        range.selectNode(vwCss);
    var selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);

    document.execCommand('copy');
    selection.removeRange(range);

    alert('복사');
};

var clickReset = function() {
    document.querySelector('.top .input-max-width input[name=viewPortWidth]').value = 0;
    document.querySelector('.input-px-css textarea').value = '';
    document.querySelector('.input-px-css pre').textContent = '';
    document.querySelector('.input-px-css textarea').classList.add('active');
    document.querySelector('.input-px-css pre').classList.remove('active');
    document.querySelector('.top .input-max-width').classList.add('active');
    document.querySelector('.top .copy-reset').classList.remove('active');
};

function ready(fn) {
    if (document.readyState != 'loading'){
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}



function convertCss(viewPortWidth, pxCss) {
    var vwCss = pxCss;
    for(var px=2; px<=1000; px++) {
        var regexColon = new RegExp(':' + px + 'px', 'gi');
        var regexSpace = new RegExp(' ' + px + 'px', 'gi');
        vwCss = vwCss.replace(regexColon, ':' + convertPxToVw(viewPortWidth, px) + 'vw');
        vwCss = vwCss.replace(regexSpace, ' ' + convertPxToVw(viewPortWidth, px) + 'vw');
    }

    if(-1 === vwCss.indexOf('@media')) {
        vwCss = '@media (max-width:' + viewPortWidth + 'px) {\n\n' + vwCss + '\n\n}';
    }
    
    return vwCss;
};

function convertPxToVw(viewPortWidth, px) {
    var percent = viewPortWidth / 100;
    var vw = px / percent;
        vw = vw.toFixed(3);
    return vw;
}
