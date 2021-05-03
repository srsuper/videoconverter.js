importScripts('../build/ffmpeg.js');

self.addEventListener('message', function(e) {
  postMessage({
    'type' : 'start'
  });

  var results = run("https://scontent-atl3-2.xx.fbcdn.net/v/t66.36281-6/10000000_126971459376749_2927964578258787179_n.mp4?_nc_cat=109&ccb=1-3&_nc_sid=985c63&efg=eyJ2ZW5jb2RlX3RhZyI6Im9lcF9zZCJ9&_nc_eui2=AeFTQU9rBtHKcGfiQe33i7wH_XC1KuA4epj9cLUq4Dh6mOZBBvRJznD5V1y5S4MVXQN_u6K0Yyw9syYHXDvHP0GV&_nc_ohc=riyveyhYEYcAX_UclNF&_nc_ht=scontent-atl3-2.xx&oh=3427bbfdde90b9c771de596527ade60c&oe=60B5E360", e.data,
    ["-i", "big_buck_bunny.webm", "-vf", "showinfo,scale=w=-1:h=-1", "-strict", "experimental", "-v", "verbose", "output.mov"]);

  postMessage({
    'type' : 'end'
  });
});

function run(filename, data, args) {
    var mod = {
      print: function (text) {
        postMessage({
          'type' : 'stdout',
          'data' : text
        });
      },
      printErr: function (text) {
        postMessage({
          'type' : 'stdout',
          'data' : text
        });
      },
      'arguments': args,
      'files': [{
        data: data,
        name: filename
      }]
    };

    var result = ffmpeg_run(mod);
    return result;
}
