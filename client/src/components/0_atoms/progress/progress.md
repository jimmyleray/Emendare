### Import

`import { Progress } from '../../../components';`

### Basic Usage

This will display a progress bar

```jsx
import { Progress } from '../../../components'
;<Progress value={15} max={100}>
  15%
</Progress>
```

### Sizes

You can change the size of the progress bar. By default set to medium

```jsx
import { Progress } from '../../../components'
;<Progress className="is-small" value={25} max={100}>
  25%
</Progress>
```

```jsx
import { Progress } from '../../../components'
;<Progress className="is-medium" value={50} max={100}>
  50%
</Progress>
```

```jsx
import { Progress } from '../../../components'
;<Progress className="is-large" value={75} max={100}>
  75%
</Progress>
```

### Colors

```jsx
import { Progress } from '../../../components'
;<Progress className="is-primary" value={20} max={100}>
  20%
</Progress>
```

```jsx
import { Progress } from '../../../components'
;<Progress className="is-link" value={30} max={100}>
  30%
</Progress>
```

```jsx
import { Progress } from '../../../components'
;<Progress className="is-info" value={50} max={100}>
  50%
</Progress>
```

```jsx
import { Progress } from '../../../components'
;<Progress className="is-success" value={60} max={100}>
  60%
</Progress>
```

```jsx
import { Progress } from '../../../components'
;<Progress className="is-warning" value={70} max={100}>
  70%
</Progress>
```

```jsx
import { Progress } from '../../../components'
;<Progress className="is-danger" value={80} max={100}>
  80%
</Progress>
```
