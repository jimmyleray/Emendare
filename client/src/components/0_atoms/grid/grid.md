### Import

`import { Grid } from '../../../components';`

### Basic Usage

This will create a container with a display `grid` to use CSS Grid inside

```jsx
import { Grid } from '../../../components'
;<Grid style={{ 'grid-template-columns': 'auto auto auto' }}>
  <p className="has-background-light">One</p>
  <p className="has-background-light">Two</p>
  <p className="has-background-light">Three</p>
</Grid>
```
