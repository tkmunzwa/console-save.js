//console.save from http://bgrins.github.io/devtools-snippets/#console-save
(function(console){

    console.save = function(data, filename){

        if(!data) {
            console.error('Console.save: No data');
            return;
        }

        if(!filename) filename = 'console.json';

        if(typeof data === "object"){
            data = JSON.stringify(data, undefined, 4);
        }

        var blob = new Blob([data], {type: 'text/json'}),
            e    = document.createEvent('MouseEvents'),
            a    = document.createElement('a');

        a.download = filename
        a.href = window.URL.createObjectURL(blob);
        a.dataset.downloadurl =  ['text/json', a.download, a.href].join(':');
        e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        a.dispatchEvent(e);
    }

    var og_log, og_warn, og_error, buffer = [];
    console.capture = function() {
        og_log = console.log;
        og_warn = console.warn;
        og_error = console.error;

        console.log = function () {
            buffer[buffer.length] = arguments[0];
            og_log('Trapping console output to buffer. call console.dump() to save, console.release() to stop');
            return 'Trapping console output to buffer. call console.dump() to save, console.release() to stop';
        }.bind(this);
        console.warn = console.log;
        console.error = console.log;
    };

    console.dump = function(filename){
        console.save(buffer, filename);
    };

    console.release = function(){
        buffer = [];
        console.log = og_log;
        console.warn = og_warn;
        console.err = og_error;
    };
})(console);