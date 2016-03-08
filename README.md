Px-Alert-Message
-----------------------------------------------

## Overview

Px-Alert-Message is a Predix Experience ('Px') component that appears in a queue within the message container.

## Usage

### Prerequisites
1. node.js
2. npm
3. bower
4. [webcomponents-lite.js polyfill](https://github.com/webcomponents/webcomponentsjs)

Node, npm and bower are necessary to install the component and dependencies. webcomponents.js adds support for web components and custom elements to your application.

### Getting Started

First, install the component via bower on the command line.

```
bower install https://github.com/PredixDev/px-alert-message.git --save
```

Second, import the component to your application with the following tag in your head.

```
<link rel="import" href="/bower_components/px-alert-message/px-alert-message.html"/>
```

Finally, use the component in your application:

```
<px-alert-message
    type="information"
    message-title="Heads up!"
    message="This definitely needs our attention."
    action="https://www.predix.io/"
    auto-dismiss="5000">
</px-alert-message>
```

<br />
<hr />

## Attributes

#### type

*Type:* **String** - (*Optional*) - *Default:* "information"

Type defines the alert level; this is reflected in the icon.
```
'important' - red triangle labeled 1
'warning'- orange diamond labeled 2
'error' - yellow square labeled 3
'information' - blue circle labeled 4
'custom' - allows a developer to specify HTML incluing images in place of the icon.
'more' - allows for a message that shows that there are more messages.
```
```
<px-alert-message
	...
	type="information">
</px-alert-message>
```
#### message-title

*Type:* **String** - (*Optional*) - *Default:* ""

The title that is displayed bold in the message area of the alert box.

```
<px-alert-message
	...
	message-title="Heads up!">
</px-alert-message>
```

#### message

*Type:* **String** - (*Optional*) - *Default:* ""

The message body that is displayed after the message-title in the message area of the alert box.

```
<px-alert-message
	...
  message="This definitely needs our attention.">
</px-alert-message>
```

#### action

*Type:* **String** - (*Optional*) - *Default:* null

User interaction on the right hand side of the message box.  
```
'dismiss' - displays the (x) control to dismiss  
'acknowledge' - displays the (OK) button to dismiss  
'URL' - string containing http url to be opened, displays the (Open) button.
```
```
<px-alert-message
	...
	action="https://www.predix.io/">
</px-alert-message>
```

#### auto-dismiss

*Type:* **Number** - (*Optional*) - *Default:* null

A delay in milliseconds before an alert message is dismissed automatically.

```
<px-alert-message
	...
  auto-dismiss="5000">
</px-alert-message>
```


<br />
<hr />


## Local Development


From the component's directory...

```
$ npm install
$ bower install
$ grunt sass
```

From the component's directory

```
$ grunt depserve
```

Navigate to the root of that server (e.g. http://localhost:8080/) in a browser to open the API documentation page, with link to the "Demo" / working examples.

### LiveReload

By default grunt depserve is configured to enable LiveReload and will be watching for modifications in your root directory as well as `/css`.

Your browser will also need to have the LiveReload extension installed and enabled. For instructions on how to do this please refer to [livereload.com/extensions/](http://livereload.com/extensions/).

Disable LiveReload by removing the livereload key from the configuration object or explicitly setting it to false.

Add, remove, modify file system patterns specified in the `depserve.options.livereload` array in your `Gruntfile.js`

This is an example depserve configuration:

```
depserve: {
    options: {
        open: '&lt;%= depserveOpenUrl %&gt;,
        livereload: [__dirname + "/js", __dirname + "/css", __dirname]
    }
}
```

Disable LiveReload by removing the `livereload` key from the configuration object.

### DevMode

From the component's directory run:

```
$ grunt devmode
```

Starts a local server exactly the same as if you had run `grunt depserve` however in addition it also runs `grunt watch` concurrently which will execute commands on file change according to the specified matching patterns.

This is an example `grunt watch` configuration which watches for changes to SASS files, then on changes executes SASS compilation and automatic prefixing:

```
watch: {
    sass: {
        files: ['sass/**/*.scss'],
        tasks: ['sass', 'autoprefixer'],
        options: {
            interrupt: true
        }
    }
}
```

### Extending behavior

See Polymer composition patterns

GE Coding Style Guide
---------------------

[GE JS Developer's Guide](https://github.com/GeneralElectric/javascript)


### Known Issues
