### Import

`import { StopWatch } from '../../../components';`

### Basic Usage

This will display the time between now and a given data.

```jsx
import { StopWatch } from '../../../components'
import { Time } from '../../../services'
;<StopWatch date={Time.addTimeToDate(new Date(), -10000)} />
```
