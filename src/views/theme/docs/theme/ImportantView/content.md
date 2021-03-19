# Important

Here we important things regarding **Theming**

---

#### Import from Material

Because we use [Minimizing Bundle Size](https://next.material-ui.com/guides/minimizing-bundle-size/) to optimize load performance

So we need to strictly adhere to the following when importing

🟢 OK

```js
import { alpha, makeStyles } from '@material-ui/core/styles';
import { capitalize } from '@material-ui/core/utils';
import { Button, AppBar, Hidden, Toolbar, IconButton } from '@material-ui/core';
```

🔴 NOT OK (Do not should include all in `@material-ui/core`)

```js
import {
  alpha,
  Button,
  AppBar,
  Hidden,
  Toolbar,
  capitalize
  makeStyles,
  IconButton,
} from '@material-ui/core';
```
