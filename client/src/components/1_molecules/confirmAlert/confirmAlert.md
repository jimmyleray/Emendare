### Import

`import { ConfirmAlert } from '../../../components';`

### Basic usage

This will display a message with two buttons. One to decline and the other one to accept. It's possible to add some customs functions when the user accept/decline.

```jsx
import { ConfirmAlert } from '../../../components'
;<ConfirmAlert
  message="This is a message !"
  onCancel={() => console.log('cancel')}
  onConfirm={() => console.log('confirm')}
/>
```
