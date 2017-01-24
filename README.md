# emailstack

A tech stack that helps to create and test HTML emails

## Installation

emailstack is not currently available on NPM, but you can try it out now using

```
npm install -g reccanti/emailstack
```

## How it Works

### Compiling to HTML

you can inline styles into an HTML document by doing

```
emailstack compile email.html
```

this will produce a file in your current directory called `compiled.html`. To specify an output directory, you can include a second argument

```
emailstack compile email.html dist
```

### Watching a file while compiling

To watch the file and compile on any change, you can specify a watch option

```
emailstack compile email.html dist -w
```

### Specifying compile targets

Emailstack has 2 compile targets, _HTML_ and _eml_. You can specify them like so:

```
emailstack compile email.html -c html eml
```
