# emailstack

A stack that helps to create and test HTML emails

## Installation

emailstack is not currently available on NPM, but you can try it out now using

```
npm install -g reccanti/emailstack
```

## How it Works

### Compile HTML

you can inline styles into an HTML document by doing

```
emailstack compile email.html
```

this will produce a file in your current directory called `compiled.html`. To specify an output directory, you can include a second argument

```
emailstack compile email.html dist
```

To watch the file and compile on any change, you can specify a watch option

```
emailstack compile email.html dist -w
```

### Send an email - TODO

```
emailstack send dist/email.html you@example.com
```
