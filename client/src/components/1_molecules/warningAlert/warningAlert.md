### Import

`import { WarningAlert } from '../../../components';`

### Basic usage

This will display an alert for the user. You can pass any message you want and you can close it by clicking on it or with the delete button.

```jsx
import { WarningAlert } from '../../../components'
;<WarningAlert
  className="is-warning"
  message="This is a warning message !"
  onClick={() => console.log('close')}
/>
```
