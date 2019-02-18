import React from 'react'
import { Hero, Page, Button, Box, Column, Columns } from '../../../components'

export const CreatePage = () => (
  <Page title="Création de texte">
    <Hero
      title="Création de texte"
      subtitle="Formulaire d'ajout d'un nouveau texte"
    />
  </Page>
)

// this.onChange = (name: string) => (event: any) => {
//   this.setState({ [name]: event.target.value } as any)
// }

// this.confirm = async () => {
//   await Socket.fetch('postText', {
//     name: this.state.textName,
//     description: this.state.textDescription
//   })
//   this.setState({ displayAddTextForm: false, ...this.initialState })
// }

// this.initialState = {
//   textName: '',
//   textDescription: ''
// }

// {
//   false && isConnected() && (
//     <React.Fragment>
//       <br />
//       <Button
//         className="is-fullwidth"
//         onClick={() => {
//           this.setState(prevState => ({
//             ...prevState,
//             displayAddTextForm: !prevState.displayAddTextForm
//           }))
//         }}
//       >
//         <span>
//           {this.state.displayAddTextForm
//             ? 'Annuler la création du texte'
//             : 'Créer un nouveau texte'}
//         </span>
//       </Button>
//     </React.Fragment>
//   )
// }
//
// {isConnected() && this.state.displayAddTextForm && (
//   <React.Fragment>
//     <Box style={{ marginBottom: 0 }}>
//       <Columns>
//         <Column>
//           <div className="field">
//             <label htmlFor="name" className="label">
//               Nom du texte
//               <div className="control">
//                 <input
//                   required
//                   name="name"
//                   className="input"
//                   type="text"
//                   value={this.state.textName}
//                   onChange={this.onChange('textName')}
//                   placeholder="Nom du nouveau texte"
//                 />
//               </div>
//             </label>
//           </div>
//         </Column>
//         <Column>
//           <div className="field">
//             <label htmlFor="description" className="label">
//               Description du texte
//               <div className="control">
//                 <input
//                   required
//                   name="description"
//                   className="input"
//                   type="text"
//                   value={this.state.textDescription}
//                   onChange={this.onChange('textDescription')}
//                   placeholder="Description du nouveau texte"
//                 />
//               </div>
//             </label>
//           </div>
//         </Column>
//       </Columns>
//     </Box>
//     <Button
//       className="is-fullwidth is-success"
//       disabled={!this.state.textName || !this.state.textDescription}
//       onClick={this.confirm}
//     >
//       Confirmer la création du texte
//     </Button>
//   </React.Fragment>
// )}
