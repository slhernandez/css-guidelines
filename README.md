![CSS Comic](images/css-comic.jpg "Steve's Website")

# css-guidelines
List of guidelines for writing good CSS.  This reference will hopefully lead me to writing better CSS markup.

### CSS Code Smells  

#### Magic Numbers
Magic numbers are hacks.  They are usually values that are used because it just works.
Get the layout fixed at all costs.  Forget about whether it's the correct 
solution and go with the hack.

```css
.site-nav > li:hover .dropdown {
  position: absolute;
  top: 19px;
  left: 0;
}
```

```top: 19px;``` is considered a magic number.  The reason it's used in this case
is due to the height of the list item.  The ```<li>``` height is ```19px``` and the dropdown
dialog needs to be flushed at the bottom.  The problem with using a hard coded value
like ```19px``` is that anyone can change the font-size of the list item and all of the 
sudden the height is no longer ```19px``` but ```21px```.  The developer that made that one
property change now needs to go digging for solution to get the dialog properly
placed again.  The correct solution is to use ```top: 100%;```.

When you encounter a magic number, ask yourself how you can achieve the same result without
that arbitrary number.

#### Undoing style
Any CSS that unsets styles.  CSS should be applied to take advantage of cascading.
CSS properties should inherit and add to previouse ones.
They should never undo a ruleset.

```css
  /* Undoing CSS Styles can be bad news */
  border-bottom: none;
  padding: 0;
  float: none;
  margin-left: 0;
```
### Overriding

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

### Animations

Favor transitions over animations. Avoid animating other properties than
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

#### Qualified selectors
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

#### Hard-coded & absolute values
This concept is similar to magic numbers but a little different in scope.

```css
h1 {
  font-size: 24px;
  line-height: 32px; 
}
```

Line height should be set relatively to make them more flexible.  So line-height 
property of ```line-height: 32px``` should be expressed as ```line-height: 1.333```.  

Expressing the line-height as a relative number will allow you to change the font-size
without incident.

#### Brute forcing
Brute forcing occurs when you take multiple CSS properties and hard-code magic numbers
to force a layout to work.

```css
.foo {
  margin-left: -3px;
  position: relative;
  z-index: 9999;
  height: 59px;
  float: left; 
}
```
This is really bad CSS.  Terrible.  All the declarations go to the extreme to force
your foo item into submission on the page.  This type of code show a lack of understanding
in the box-model or layout.  More typically, this code is a result of poorly constructed
layout that was written at the beginning of the project.

#### Broad selectors
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

#### !important 
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
```

Error text should be colored red.  To make sure that the red color property takes precedence
you can use ```!important``` because you know ahead of time that red text should remain constant.

In the case of the header tag, you are forcefully setting the font-size to 40px to override the
known default set in the base-layout.  Bad CSS probably forced you to use ```!important```.  But 
it doesn't fix the underlying problem and now you have just made it worse with another layer of 
super-specificity.

#### IDs
Use IDs in HTML for fragment identifiers and JavaScript hooks.  Never use it for CSS.

Here are reasons why not to use IDs
* IDs can never be used more than once in a page
* Classes can exist only once, or multiple times.
* IDs can often have their traits abstracted  into reusable classes.
* An ID is a ton more specific that a class.
* No amount of chained classes can override an ID.

#### Non-descriptive class names

#### Specificity

Don't make values and selectors hard to override. Minimize the use of `id`'s
and avoid `!important`.

```css
/* bad */
.bar {
  color: green !important;
}
.foo {
  color: red;
}

/* good */
.foo.bar {
  color: green;
}
.foo {
  color: red;
}
```

