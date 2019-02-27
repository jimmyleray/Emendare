### Import

`import { PwdForm } from '../../../components';`

### Basic usage

This will display a form with two input one to enter a new password and the other one to validate the password by re writing it. You can also set somes rules about the strenght of the password

```jsx
import { PwdForm } from '../../../components'
;<PwdForm
  change={event => console.log(event.target.value)}
  password={'abcd'}
  checkPassword={'abcd'}
  pwdValid={false}
  pwdSame={true}
/>
```
