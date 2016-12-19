# emailstack

A stack that helps to create and test HTML emails

## How it Works

### Generate an inlined HTML email

```
emailstack compile email.html
```

### Continuously compile an HTML email and preview it in the browser

```
emailstack compile email.html --watch
```

### Send an email

```
emailstack send dist/email.html you@example.com
```
