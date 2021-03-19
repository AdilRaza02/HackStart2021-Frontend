# Components

#### [Overview](/app/components)

---

Custom components inside `src/theme/overrides`

```sh
overrides/
  ├── Accordion
  ├── Alert
  ├── Autocomplete
  ├── Avatar
  ├── Backdrop
  ├── ...
...
```

Custom components based [https://material-ui.com/customization/globals/#default-props](https://material-ui.com/customization/globals/#default-props)

if you custom in file `overrides/Accordion`
you can match with [/app/components/theme/accordion](/app/components/theme/accordion) to see the change.

if you custom in file `overrides/Alert`
you can match with [/app/components/theme/alert](/app/components/theme/alert) to see the change.

> The change will apply to Global

> The purpose used here helps you to deeply customize your style, to suit your file design

---

### Extending components

**Components extend based on Material UI.**

```jsx
<Button variant="contained" color="inherit">Default</Button>
<Button variant="contained">Primary</Button>
<MButton variant="contained" color="info">Info</MButton>
<MButton variant="contained" color="success">Success</MButton>
<MButton variant="contained" color="warning">Warning </MButton>
<MButton variant="contained" color="error">Error </MButton>
```

![img](https://www.dropbox.com/s/4ysv6gnfz7f4qil/button.png?dl=1)

**Currently support for the following components:**

- [Avatar](/app/components/theme/avatars)
- [Badge](/app/components/theme/badges)
- [Breadcrumbs](/app/components/theme/breadcrumbs)
- [Buttons](/app/components/theme/buttons)
- [Chip](/app/components/theme/chips)
- [Icon](/app/foundations/icons)
- [Label](/app/components/theme/labels)
- [Progress](/app/components/theme/progress)
- [Selection Controls](/app/components/theme/selection-controls)
- [Timeline](/app/components/theme/timeline)

All have check with **PropTypes** you can compare it to use

```jsx
<MButton variant="contained" color="info">
  Info
</MButton>;

MButton.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object,
  className: PropTypes.string,
  color: PropTypes.oneOf([
    'inherit',
    'primary',
    'secondary',
    'info',
    'success',
    'warning',
    'error',
    'white'
  ]),
  variant: PropTypes.oneOfType([
    PropTypes.oneOf(['contained', 'outlined', 'text']),
    PropTypes.string
  ])
};
```
