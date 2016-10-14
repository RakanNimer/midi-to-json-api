## Synopsis

Parsing midi accurately is hard. Thankfully some smart people developed [Midifile](http://midifile.sapp.org/), a C++ library that's very good at doing that ! This is a wrapper node api to its functionalities.

## Code Example
```html
<html>
    <body>
        <form ref='uploadForm'
            id='uploadForm'
            action='myapi.com/upload'
            method='post'
            encType="multipart/form-data">
                <input type="file" name="sampleFile" />
                <input type='submit' value='Upload!' />
        </form>
    </body>
</html>
```

That's it, it will return midiFile nicely formatted in JSON

## Installation

```
npm install rakannimer/midifile-parser
cd midifile-parser
npm build && npm install && npm start
```

## Credits
The great work at https://github.com/craigsapp/midifile
