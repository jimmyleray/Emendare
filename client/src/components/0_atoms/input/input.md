### Import

`import { Input } from '../../../components';`

### Basic Usage

This will display an input of any type

```jsx
import { Input } from '../../../components'
;<Input type="text" value="Hello" ariaLabel="This is an text input" />
```

### With an icon

Possibility to add an icon to the right or the left or both

```jsx
import { Input } from '../../../components'
;<Input
  type="text"
  placeholder="Some text here"
  ariaLabel="This is an text input"
  iconRight="fas fa-envelope"
/>
```

```jsx
import { Input } from '../../../components'
;<Input
  type="text"
  placeholder="Some text here"
  ariaLabel="This is an text input"
  iconLeft="fas fa-check"
/>
```

```jsx
import { Input } from '../../../components'
;<Input
  type="text"
  placeholder="Some text here"
  ariaLabel="This is an text input"
  iconLeft="fas fa-check"
  iconRight="fas fa-envelope"
/>
```

### Colors

```jsx
import { Input } from '../../../components'
;<Input
  className="is-primary"
  type="text"
  placeholder="primary"
  ariaLabel="This is an text input"
  iconRight="fas fa-envelope"
/>
```

```jsx
import { Input } from '../../../components'
;<Input
  className="is-info"
  type="text"
  placeholder="info"
  ariaLabel="This is an text input"
  iconRight="fas fa-envelope"
/>
```

```jsx
import { Input } from '../../../components'
;<Input
  className="is-success"
  type="text"
  placeholder="success"
  ariaLabel="This is an text input"
  iconRight="fas fa-envelope"
/>
```

```jsx
import { Input } from '../../../components'
;<Input
  className="is-danger"
  type="text"
  placeholder="danger"
  ariaLabel="This is an text input"
  iconRight="fas fa-envelope"
/>
```

```jsx
import { Input } from '../../../components'
;<Input
  className="is-warning"
  type="text"
  placeholder="warning"
  ariaLabel="This is an text input"
  iconRight="fas fa-envelope"
/>
```
