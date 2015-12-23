# jQuery UI Sortable Animation

Just follow these simple steps to enable sort animation in your jQuery UI app:

* Include jQuery and jQuery UI on your page.

```html
<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.2/jquery-ui.js"></script>
```

* Include `jQuery UI Sortable Animation` script after jQuery UI and before its first use.

```html
<script src="jquery.ui.sortable-animation.js"></script>
```
* Just use jQuery UI as usual or with special `animation` parameter
```html
<script>
  $('#sortable').sortable({
    animation: 150, // animation duration (ms), 0 - no animation
  });
</script>
```
