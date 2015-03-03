![CSS Comic](images/css-comic.jpg "Steve's Website")

# css-guidelines
List of guidelines for writing good CSS.  This reference will hopefully lead me to writing better CSS markup.

### CSS Code Smells  

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

#### Hard-coded & absolute values

#### Brute forcing

#### Broad selectors

#### !important 

#### IDs

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
