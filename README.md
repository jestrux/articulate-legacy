# Articulate

Simple library for dynamic content creation.


## The Basics
In the beginning Articulate started as a generator for articles heavily inspired by medium and if you're working on a client website with blog or article content, this would be a nice thing you add to the blog creation page of the CMS.

![Medium Style Text Editor](/screenshots/sample-blog.jpg?raw=true "Medium Style Text Editor")

Like medium, Articulate provides an option to easily add in article elements beyond just text. Things like quotes, images, youtube videos e.t.c. 

Here's an example on how a user can search an image on unsplash and add it to the article.

![Image picker](/screenshots/image-picker.jpg?raw=true "Image picker")


For a basic usage of Articulate, you just include it in your project, and then all that's left is to add this one line.

```javascript
new Articulate("#articleBody");
```

## Custom UI elements

By default articulate ships with five ui elements `Image`, `Alert`, `Quote` and `Youtube Video` which are are all basic javascript classes. Articulate also provides an easy way to add in your own ui elements should you need to. Here's how you do that:

```javascript
import SomeUiElement from './path/to/SomeUiElement';
new Articulate("#articleBody", {
    uiElements: { SomeUiElement }
});
```


## Headless Version

Since articulate was initially intended for articles and blogs, it's default UI and behavior reflects that, but you can turn that off by setting the `lean` option to true. This will remove all of the default article UI leaving only the pick component UI and edit component UI which only show up on trigger. Here's how you'd do something like that.

```html
<button onclick="addScreen()">
    Add Screen
</button>

<script type="module" src="path/to/articulate.js"></script>

<script type="module">
    import * as TriviaTemplates from './trivia-game/components';
    window.addEventListener("load", () => {
        window.articulate = new Articulate("#screens", {
            lean: true,
            editOnFocus: true,
            uiElements: {...TriviaTemplates},
            className: "TriviaCard"
        });
    });
</script>

<script>
    function addScreen(){
        if(articulate)
            articulate.add();
    }
</script>
```

This code was taken from the trivia code game demo found ["here"](/public/demos/trivia-game/index.html) and which looks like this 👇

![Nerd Trivia](/screenshots/nerd-trivia.jpg?raw=true "Nerd Trivia")


## Other Customizations

|Prop|Description|Default|
|--|--|
|`editOnFocus`| Whether to edit on focus or when edit button is clicked | false |

## Contribution

Clone this repository to your machine :

``` bash
git clone https://github.com/jestrux/articulate.git
```

Install dependencies with npm :

``` bash
npm install
```

## Included Commands

|Command|Description|
|--|--|
|`yarn dev`| Run dev server |
|`yarn build`| Build for production |