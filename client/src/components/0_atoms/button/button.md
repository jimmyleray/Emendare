### Import

`import { Button } from '../../../components';`

### Colors

```jsx
import { Button } from './button'
;<div>
  <Button>Button</Button>
  <Button className="is-white">White</Button>
  <Button className="is-light">Light</Button>
  <Button className="is-dark">Dark</Button>
  <Button className="is-black">Black</Button>
  <Button className="is-link">Link</Button>
  <Button className="is-primary">Primary</Button>
  <Button className="is-info">Info</Button>
  <Button className="is-success">Success</Button>
  <Button className="is-warning">Warning</Button>
  <Button className="is-danger">Danger</Button>
</div>
```

### Sizes

```jsx
import { Button } from './button'
;<div>
  <Button className="is-small">Small</Button>
  <Button>Normal</Button>
  <Button className="is-medium">Medium</Button>
  <Button className="is-large">Large</Button>
</div>
```

### Styles

#### Outlined

```jsx
import { Button } from './button'
;<div>
  <Button className=" is-primary is-outlined">Outlined</Button>
</div>
```

#### Inverted

```jsx
import { Button } from './button'
;<div>
  <Button className="is-primary is-inverted">Inveted</Button>
</div>
```

### Disabled

```jsx
import { Button } from './button'
;<div>
  <Button disabled={true}>Disabled</Button>
  <Button disabled={false}>NotDisabled</Button>
</div>
```

### Link

Use this button when you want to go to an other page

```jsx
import { Button } from './button'
import { Router } from 'react-router-dom'
;<div>
  <Router>
    <Button to={'path/you/want'}>Link</Button>
  </Router>
</div>
```
