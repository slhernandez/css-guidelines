# css-guidelines
List of guidelines for writing good CSS.  This reference will hopefully lead to better CSS markup.

##Writing Good CSS is hard

Why? CSS is global, and every rule you write has the potential to affect entirely
unreleated parts of the site.  The unpredictability makes writing scalable CSS a
difficult task.  Architectural problems can cripple development.  Or it can facilitate 
developers to produce bad CSS.  Understanding the nuances of predictable and maintable 
CSS should be a top priority.

The main goal to creating maintainable CSS is to avoid side effects.  A side effect 
can occur when modifying a style property appears to only affect things in a very
limited scope, then in reality affects a much broader range of things, and does so
in a way that may not be obvious to the person performing the action.

Since CSS rules live in the global scope, side effects are extremely common. Your 
average stylesheet usually consists of an extremely fragile collection of coupled 
rules, dependent on the presence, order, and specificity of other rules, making 
unassuming changes to have unforeseen consequences.

## Why CSS Frameworks can be dangerous
CSS frameworks litter the global namespace with base styles, they choose class names
so common they're almost guaranteed to conflict with your existing code, and they make
no effort to encapsulate their components.

## CSS Code Smells  

## Magic Numbers
Magic numbers are hacks.  They are usually values that are used because it just works.
Get the layout fixed at all costs.  Forget about whether it's the correct 
solution and go with the hack.

```css
/* bad */
.site-nav > li:hover .dropdown {
  position: absolute;
  top: 19px;
  left: 0;
}

/* good */
.site-nav > li:hover .dropdown {
  position: absolute;
  top: 100%;
  left: 0;
}
```

```top: 19px;``` is considered a magic number.  The reason it's used in this case
is due to the height of the list item.  The ```<li>``` height is ```19px``` and the dropdown
dialog needs to be flushed at the bottom.  The problem with using a hard coded value
like ```19px``` is that anyone can change the font-size of the list item and all of the 
sudden the height is no longer ```19px``` but ```21px```.  The developer that made that one
property change now needs to go digging for a solution to get the dialog properly
placed again. They may not be aware that a hard-coded number exists to align the dialoge.
 The correct solution is to use ```top: 100%;```.

When you encounter a magic number, ask yourself if you can achieve the same result without
that  arbitrary number.

## Undoing style
Any CSS that unsets styles is considered sloppy. Property values should be applied to take 
advantage of cascading. CSS values should be set to initial or inherit if you want to unset a
certain style. They should never undo a ruleset.

```css
/* bad */
.side-bar .mobile {
  border-bottom: none;
  padding: 0;
  float: none;
  margin-left: 0;
}

/* good */
.side-bar .mobile {
  border-bottom: initial;
  padding: 0;
  float: inital;
  margin-left: 0;
}
```

The use of the ```initial``` CSS keyword would be beneficial in this scenario. The 
value ```initial``` will ignore cascaded styles or inherited values and will "reset"
to its default initial value.  All CSS properties have initial values.  Feel free 
to use this keyword with any CSS property. 

```css
/* override font-style for heading */
h6 {
  font-style: italic;
}

/* Undo the style for the sidebar region */
.sidebar h6 {
  font-style: initial;
}
``` 

## Overriding

Overriding styles makes selectors and debugging harder. Avoid it when possible.

```css
/* bad */
li {
  visibility: hidden;
}
li:first-child {
  visibility: visible;
}

/* good */
li + li {
  visibility: hidden;
}
```

## Animations

Favor transitions over animations for hover states, or when information
 on a page is added or removed. It's best to avoid animating other properties than
`opacity` and `transform`.

```css
/* bad */
div:hover {
  animation: move 1s forwards;
}
@keyframes move {
  100% {
    margin-left: 100px;
  }
}

/* good */
div:hover {
  transition: 1s;
  transform: translateX(100px);
}
```

A ```transition``` occurs when an element changes from one state to another, and 
the browser fills in that state change with a sequence of in-between frames.
There is always a beginning and an end state.

An ```animation``` is a more powerful alternative to transitions.  Rather than rely
on a change from one beginning state to an end state, animations can be made up of 
as many in-between states as you like and offer more control over how the states 
are animated.

## Over qualified selectors
Tag selectors that are prepended by the an element.

```css
/* bad */
ul.nav-menu {}
a.btn {}
div.content {}
div.footer {}

/* good */
.nav-menu {}
.btn {}
.content {}
.footer {}
```
These CSS selectors prohibit reusability on another element.  They also increase 
specificity. The browser workload will increase which will decrease performance.  Why 
would you have the browser look for a class called ```.btn``` on an ```a``` when you 
could just ask it to look for ```.btn``` and be done with it?  Don't qualify selectors.

Here are more extreme cases of overqualified selectors.

```css
/* bad */
ul.nav li.active a {}
div.header a.logo img {}
.content ul.feature a.button {}

/* good */
.nav .active a {}
.logo img {}
.features-button {}
```
Reducing specificity saves code and increases performance and portability.

## Hard-coded CSS values 
This concept is similar to magic numbers but a little different in scope.

```css
/* bad */
h1 {
  font-size: 24px;
  line-height: 32px; 
}

/* good */
h1 {
  font-size: 1.4em;
  line-height: 1.33;
}
```

Line height should be set relatively to make them more flexible.  So line-height 
property of ```line-height: 32px``` should be expressed as ```line-height: 1.333```.  

Expressing the line-height as a relative number will allow you to change the font-size
without incident.

## Forced CSS 
Forced CSS occurs when you take multiple CSS properties and hard-code magic numbers
to force a layout to work.

```css
/* bad */
.foo {
  margin-left: -3px;
  position: relative;
  z-index: 9999;
  height: 59px;
  float: left; 
}
```
This is really bad CSS.  All the declarations go to the extreme to force
your foo item into submission on the page.  This type of code shows a lack of understanding
in the box-model or layout.  More specifically, this code is a result of poorly constructed
layout that was written at the beginning of the project.

## Broad selectors
Carpet bombing every div or tag on the page is the definition of broad selectors.

```css

/* bad */
section {
  background-color: #FFF;
  padding: 20px;
}

/* good */
ul {
  font-weight: 200;
  font-size: 1.2em;
}

section .media {
  display: table;
  width: 100%;
}
```

Please avoid this type of selector.  Otherwise known as dangerous selector.  If you create
selectors that are over reaching, you'll have to undo CSS styling.  Undoing CSS styles
is not cool.  You really don't want your styles to leak to other areas of the layout.  Make
sure your CSS selectors have good selector intent.

## !important 
I have no problem using ```!important```.  It can be a valuble tool at your disposal. 
It should be used proactively.  I understand there will come a time when you require 
a style to take precedence over everything that is in context.

```css
/* bad  use is reactive */
h1 {
  font-size: 40px !important
}

/* good use is proactive */
.error-message {
    color: #dd463e !important;
}

/* Even better use of specificity */
.text-display.error-message {
  color: #dd463e;
}
```

Error text should be colored red.  To make sure that the red color property takes precedence
you can use ```!important``` because you know ahead of time that red text should remain constant.

In the case of the header tag, you are forcefully setting the font-size to 40px to override the
known default set in the base-layout.  Bad CSS probably forced you to use ```!important```.  But 
it doesn't fix the underlying problem and now you have just made it worse with another layer of 
super-specificity.

__Honest TIP__: Don't make values and selectors hard to override. 

```css
/* really bad */
.bar {
  color: green !important;
}
.foo {
  color: red;
}

/* super good */
.foo.bar {
  color: green;
}
.foo {
  color: red;
}
```

##  On the use of IDs
Use IDs in HTML for fragment identifiers and JavaScript hooks.  Never use it for CSS.

Here are reasons why not to use IDs
* IDs can never be used more than once in a page
* Classes can exist only once, or multiple times.
* IDs can often have their traits abstracted  into reusable classes.
* An ID is a ton more specific that a class.
* No amount of chained classes can override an ID.

__Need Increased Specificity?__  

Don't use IDs or ```!important```
Here is a trick...

```css
/* Chaining selector with itself to increase specificity. */
.btn.btn {}

/* this selector will override the previous .btn.btn selector */
.btn.btn.btn.btn {}
```

Use chained selectors instead of ```!important```.  

Highly recommend the talk [3.14 Things I Didn't Know About CSS](https://speakerdeck.com/mathiasbynens/3-dot-14-things-i-didnt-know-about-css-at-css-day-2014)

## Non-descriptive class names

I believe in using descriptive class names that can properly describe the function of the 
item that will be styled.  I will not attempt to blanket parent containers with tag selectors
because you'll always have multiple tags on the same page. There will always be more than 
one ```ul``` tag.  Might as well provide a descriptive class name for code readability 
and maintainability.

```css
/* bad */
.card {
  padding: 10px;
  margin: 5px;
  text-align: center; 
}

/* good */
.profile-card {
  padding: 10px;
  margin: 5px;
  text-align: center; 
}

.credit-card {
  padding: 5px;
  text-align: right; 
}

/* bad */
ul > li {}

/* good */
/* ul -> .bookmarks */
/* li -> .bookmark-item */
.bookmarks .bookmark-item {}
```

# CSS Code Smells DEMO

If you've never used Node or npm before, you'll need to install Node.
If you use homebrew, do:

```
brew install node
```
Otherwise, you can download and install from [here](http://nodejs.org/download/).

### Install Gulp Globally

Gulp must be installed globally in order to use the command line tools. *You may need to use `sudo`*

```
npm install -g gulp
```

# Building the project

###Install npm dependencies:
This runs through all dependencies listed in `package.json` and downloads them
to a `node_modules` folder in your project directory.
```
npm install
```

###Build project
This will run gulp.  Gulp will generate the project and store it in the build folder.
```
npm start
```

Alternatively, you can run...
```
gulp build
```

## DEMO is located in BUILD folder
Go to the build folder and open ```index.html``` from your favorite browser.




