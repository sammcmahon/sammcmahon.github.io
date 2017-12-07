# Final Project User Manual

## CS 464, Fall 2017
## Author: Sam McMahon

### User Guide

To run the project, from the folder containing the source code, start a sever to
host the page on localhost. I like running the command from Bash:
```
( python2 -m SimpleHTTPServer 8000 &> /dev/null ) &
```

Next, navigate to the page in your browser: `http://127.0.0.1:8000/index.html`.
This starts the visualizer with the default audio playing on loop.

You can also specify which audio files to play by adding a path in the query
string. For example, `http://127.0.0.1:8000/index.html?audio=replace_with_path`.

Audio and the visualizer will run on a loop until the user leaves the page.
