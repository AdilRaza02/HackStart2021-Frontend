# Form Helper

This is a tool to assist when working with formik (form),
used to track states changes.

---

```js
import Helper from '~/utils/helperFormik';

// ----------------------------------------------------------------------

const formik = useFormik({
  initialValues: {
    title: '',
    description: '',
    content: '',
    cover: null
  },
  validationSchema: ///,
  onSubmit: ///
});

<Helper formik={formik} />;
```

#### Result

![img](https://www.dropbox.com/s/q3rzxse05bvh4s8/form_helper.jpg?dl=1)
