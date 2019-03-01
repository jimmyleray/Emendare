### Import

`import { Columns, Column } from '../../../components';`

### Basic Usage

```jsx
import { Columns, Column } from '../../../components'
;<Columns>
  <Column>First column</Column>
  <Column>Second column</Column>
  <Column>Third column</Column>
</Columns>
```

### Gap

You can set a gap between each column between 0 to 8

- `is-0` is equivalent to gapless
- `is-3` is the gap by default
- `is-8` is the maximum gap

```jsx
import { Columns, Column } from '../../../components'
;<Columns className="is-6">
  <Column className="has-background-primary">Column one</Column>
  <Column className="has-background-light">Column two</Column>
  <Column className="has-background-light">Column three</Column>
</Columns>
```

Without a gap

```jsx
import { Columns, Column } from '../../../components'
;<Columns className="is-gapless">
  <Column className="has-background-primary">Column one</Column>
  <Column className="has-background-primary">Column two</Column>
  <Column className="has-background-primary">Column three</Column>
</Columns>
```
